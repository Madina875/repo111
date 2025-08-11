import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { VerifyOtp } from "./dto/verify-otp.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  // @HttpCode(200)
  // @Post("new-otp")
  // newOtp(@Body() phoneUserDto: PhoneUserDto) {
  //   return this.userService.newOtp(phoneUserDto);
  // }

  // @HttpCode(200)
  // @Post("verify-otp")
  // verifyOtp(@Body() verifyOtpDto: VerifyOtp) {
  //   return this.userService.verifyOtp(verifyOtpDto);
  // }
}
