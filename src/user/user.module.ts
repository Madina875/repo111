import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./model/user.entity";
import { BotModule } from "../bot/bot.module";
import { SmsModule } from "../sms/sms.module";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    BotModule,
    BotModule,
    SmsModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
