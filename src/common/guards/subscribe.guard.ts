// import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
// import { InjectModel } from "@nestjs/sequelize";
// import { Telegraf, Markup } from "telegraf";
// import {
//   joinMessage,
//   requiredMessage,
//   subscribeMessage,
// } from "../../app.constants";
// import { requiredChanels } from "../../app.constants";
// import { Bot } from "../../bot/model/bot.entity";

// @Injectable()
// export class ChannelSubscriptionGuard implements CanActivate {
//   private readonly bot: Telegraf;

//   constructor(@InjectModel(Bot) private readonly botModel: typeof Bot) {
//     const token = process.env.BOT_TOKEN;
//     this.bot = new Telegraf(token!);
//   }

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const [ctx] = context.getArgs();
//     const userId = ctx.from.id;

//     const currentUser = await this.botModel.findOne({
//       where: { user_id: userId.toString() },
//     });

//     const language = currentUser?.language_code === "uz" ? "uz" : "ru";
//     try {
//       const inactiveChannels: [string, string][] = [];

//       for (const channel of requiredChanels) {
//         console.log(channel);
//         const [chatId] = channel;
//         try {
//           const member = await this.bot.telegram.getChatMember(chatId, userId);
//           console.log(member);
//           if (member.status === "left") {
//             inactiveChannels.push(channel);
//           }
//         } catch (error) {
//           console.log(
//             `Error checking membership for channel ${chatId}: ${error}`
//           );
//         }
//       }

//       if (inactiveChannels.length > 0) {
//         const keys: Array<
//           ReturnType<typeof Markup.button.url | typeof Markup.button.callback>
//         >[] = [];
//         inactiveChannels.forEach((channel) => {
//           keys.push([
//             Markup.button.url(`${joinMessage[language]}`, channel[1]),
//           ]);
//         });
//         keys.push([
//           Markup.button.callback(subscribeMessage[language], "subscribed"),
//         ]);

//         await ctx.reply(requiredMessage[language], Markup.inlineKeyboard(keys));

//         return false;
//       }

//       return true;
//     } catch (error) {
//       console.log("error", error);
//       return false;
//     }
//   }
// }
