import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bot } from "./model/bot.entity";
import { BotUpdate } from "./bot.update";

@Module({
  imports: [SequelizeModule.forFeature([Bot])],
  controllers: [],
  providers: [BotService, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
