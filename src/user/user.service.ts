import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { BotService } from "../bot/bot.service";
import * as otpGenerator from "otp-generator";
// import { timestamp } from 'rxjs';
import { decode, encode } from "../common/helpers/crypto";
import { VerifyOtp } from "./dto/verify-otp.dto";
import { SmsService } from "../sms/sms.service";
import { AddMinutesToDate } from "../common/helpers/addMinutes";
import { User } from "./model/user.entity";
import { Otp } from "./model/otp.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly smsService: SmsService,
    private readonly botService: BotService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashed_password,
    });

    return newUser;
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return user[1][0];
  }

  async remove(id: number) {
    const user = await this.userModel.destroy({ where: { id } });
    if (!this.userModel.findByPk(id)) {
      return { message: "user not found" };
    }
    return { message: "user deleted successfully" };
  }

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const isSend = await this.botService.sendOtp(phone_number, otp);
    if (!isSend) {
      throw new BadRequestException("Avval botdan ro'yhatdan o'ting!");
    }

    // --------------------------------------------------------------------------
    const response = await this.smsService.sendSms(phone_number, otp);

    if (response.status !== 200) {
      throw new ServiceUnavailableException("OTP yuborishda xatolik");
    }
    const smsMessage =
      `OTP code has been send to ****` +
      phone_number.slice(phone_number.length - 4);

    // ---------------------------------------------------------------------------

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });
    const dbOtp = await this.otpModel.create({
      otp,
      expiration_time,
      phone_number,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: dbOtp.id,
    };
    // calling encode from helpers
    const encodedData = await encode(JSON.stringify(details)); //shifrlash

    return {
      message: "OTP botga yuborildi",
      verificationCode: encodedData,
    };
  }

  async verifyOtp(verifyOtp: VerifyOtp) {
    const { phone, verification_code, otp } = verifyOtp;
    //decode from helpers
    const decodedData = await decode(verification_code);
    const details = JSON.parse(decodedData);

    if (details.phone_number != phone) {
      throw new BadRequestException("Otp bu telefon raqamiga yuborilmagan.");
    }
    const resultOtp = await this.otpModel.findOne({
      where: { id: details.otp_id },
    });

    if (resultOtp == null) {
      new BadRequestException("Bunday otp mavjud emas");
    }
    if (resultOtp?.verified) {
      new BadRequestException("Bu otp avval tekshirilgan.");
    }
    if (resultOtp!.expiration_time < new Date()) {
      new BadRequestException("Bu otp ning vaqti o'tib ketgan");
    }
    if (otp != resultOtp?.otp) {
      new BadRequestException("Otp mos emas");
    }

    const user = await this.userModel.update(
      { is_premium: true },
      { where: { phone }, returning: true }
    );

    if (!user[1][0]) {
      new BadRequestException("Bunday foydalanuvchi yoq");
    }

    resultOtp!.verified = true;
    await resultOtp?.save();

    console.log(user);
    return { message: "siz premium user bo'ldingiz!🎉", user: user[1][0] };
  }
}
