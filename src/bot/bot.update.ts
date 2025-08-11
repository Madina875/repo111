import { Injectable } from "@nestjs/common";
import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { BotService } from "./bot.service";
import { Context, Markup } from "telegraf";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {} //bot

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  // @On("contact")
  // async onContact(@Ctx() ctx: Context) {
  //   await this.botService.onContact(ctx);
  // }

  // @Command("stop")
  // async onStop(@Ctx() ctx: Context) {
  //   await this.botService.onStop(ctx);
  // }

  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   await this.botService.onLocation(ctx);
  // }

  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message!) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }
  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if ("video" in ctx.message!) {
  //     console.log(ctx.message.video);
  //     await ctx.reply(String(ctx.message.video.file_name));
  //   }
  // }

  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   if ("sticker" in ctx.message!) {
  //     console.log(ctx.message.sticker);
  //     await ctx.replyWithSticker(String(ctx.message.sticker.file_id));
  //   }
  // }
  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ("animation" in ctx.message!) {
  //     console.log(ctx.message.animation);
  //     await ctx.replyWithAnimation(String(ctx.message.animation.file_id));
  //   }
  // }
  // @On("contact")
  // async onContact(@Ctx() ctx: Context) {
  //   if ("contact" in ctx.message!) {
  //     //   console.log(ctx.message.contact);
  //     await ctx.reply(String(ctx.message.contact.first_name));
  //     //   await ctx.reply(String(ctx.message.contact.last_name));
  //     await ctx.reply(String(ctx.message.contact.phone_number));
  //     await ctx.reply(String(ctx.message.contact.user_id));
  //   }
  // }

  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   if ("location" in ctx.message!) {
  //     console.log(ctx.message.location);
  //     await ctx.reply(String(ctx.message.location.latitude));
  //     await ctx.reply(String(ctx.message.location.longitude));
  //     await ctx.replyWithLocation(
  //       ctx.message.location.latitude,
  //       ctx.message.location.longitude
  //     );
  //   }
  // }

  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   if ("voice" in ctx.message!) {
  //     console.log(ctx.message.voice);
  //     await ctx.reply(String(ctx.message.voice.duration));
  //   }
  // }

  // @On("document")
  // async onDocument(@Ctx() ctx: Context) {
  //   if ("document" in ctx.message!) {
  //     console.log(ctx.message.document);
  //     await ctx.replyWithDocument(String(ctx.message.document.file_id));
  //   }
  // }

  // @Hears("hi")
  // async onHearsHi(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML(`<b>hey there </b>`);
  // }

  // @Command("help")
  // async onCommandHelp(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML(`<b>not now </b>`);
  // }

  // //---------------------------------------------------------
  // @Command("inline")
  // async onCommandInLine(@Ctx() ctx: Context) {
  //   const inlineKeyboards = [
  //     [
  //       {
  //         text: "product1",
  //         callback_data: "product_1",
  //       },
  //       {
  //         text: "product2",
  //         callback_data: "product_2",
  //       },
  //       {
  //         text: "product3",
  //         callback_data: "product_3",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Product4",
  //         callback_data: "product_4",
  //       },
  //       {
  //         text: "Product5",
  //         callback_data: "product_5",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Product6",
  //         callback_data: "product_6",
  //       },
  //     ],
  //   ];

  //   await ctx.reply("Kerakli productni tanla: ", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboards,
  //     },
  //   });
  // }

  // //   @Action("product_1")
  // //   async onActPro1(@Ctx() ctx: Context) {
  // //     await ctx.replyWithHTML(`<b>product 1 tanlandi</b>`);
  // //   }

  // @Action(/product_\d+/)
  // async onActAnyProd(@Ctx() ctx: Context) {
  //   if ("data" in ctx.callbackQuery!) {
  //     const data = ctx.callbackQuery.data;
  //     const productId = data.split("_")[1];
  //     await ctx.replyWithHTML(`<b>${productId} product tanlandi</b>`);
  //   }
  // }

  // //------------------------------------------------------------------

  // //------------------------------------------------------------------
  // @Command("main")
  // async onCommandMain(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("kerakli Main Button ni tanla: ", {
  //     ...Markup.keyboard([
  //       ["Bir"],
  //       ["Ikki", "Uch"],
  //       ["To'rt", "Besh", "Olti"],
  //       [Markup.button.contactRequest("Tel raqamingizni yuboring")],
  //       [Markup.button.locationRequest("Turgan lokatsiyangizni yuboring")],
  //     ])
  //       .resize()
  //       .oneTime(),
  //   });
  // }

  // @Hears("Bir")
  // async onHearsBir(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML(`<b>bir bosildi</b>`);
  // }
  // @Hears("ikki")
  // async onHearsIkki(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML(`<b>ikki bosildi</b>`);
  // }

  // //------------------------------------------------------------------

  // //-------------------------------------------- amaliyot -----------------------------------
  // @Command("poll")
  // async onCommandPoll(@Ctx() ctx: Context) {
  //   await ctx.replyWithPoll("Which is your favorite color?", [
  //     "Red",
  //     "Blue",
  //     "Green",
  //   ]);
  // }

  // @Command("joke")
  // async onCommandJoke(@Ctx() ctx: Context) {
  //   const res = await fetch(
  //     "https://official-joke-api.appspot.com/random_joke"
  //   );
  //   const joke = (await res.json()) as { setup: string; punchline: string };
  //   await ctx.replyWithHTML(`<b>${joke.setup}</b>\n${joke.punchline}`);
  // }

  // @Command("cat")
  // async onCommandCat(@Ctx() ctx: Context) {
  //   const res = await fetch("https://api.thecatapi.com/v1/images/search");
  //   const data = (await res.json()) as { url: string }[];
  //   await ctx.replyWithPhoto(data[0].url);
  // }

  // @Command("dog")
  // async onCommandDog(@Ctx() ctx: Context) {
  //   const res = await fetch("https://dog.ceo/api/breeds/image/random");
  //   const data = (await res.json()) as { message: string };
  //   await ctx.replyWithPhoto(data.message);
  // }

  // //--------------------------------------------amaliyot ----------------------------

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.chat?.id);
    console.log(ctx.from?.id);
  }
}
