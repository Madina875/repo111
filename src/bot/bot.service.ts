import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./model/bot.entity";
import { BOT_NAME } from "../app.constant";
import { InjectBot } from "nestjs-telegraf";
import { Context, Markup, Telegraf } from "telegraf";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    // @InjectModel(Library) private readonly libraryModel: typeof Library,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    try {
      await ctx.reply(
        "✅ Bot ishga tushdi! Siz muvaffaqiyatli /start buyrug'ini yubordingiz."
      );
    } catch (error) {
      console.log("❌ Xatolik yuz berdi:", error);
    }
  }

  async sendOtp(
    phone_number: string,
    OTP: string
  ): Promise<boolean | undefined> {
    try {
      const user = await this.botModel.findOne({ where: { phone_number } });
      if (!user || !user.status) {
        return false;
      }
      await this.bot.telegram.sendChatAction(user.user_id!, "typing"); //bot action
      await this.bot.telegram.sendMessage(
        user.user_id!,
        `veriify code: ${OTP}`
      );

      return true;
    } catch (error) {
      console.log(`Error on Send Otp: `, error);
    }
  }
}
