// Imports
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const config = require("./config/config.json");
const fs = require("fs");

// node-telegram-bot-api
const token = config.token;
const bot = new TelegramBot(token, { polling: true });

//db
let chats = [];
console.log(chats);

//bot_id
const bot_id = config.bot_id;

//comando /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>ArgStockBOT</b> es un bot desarrollado por @orra6 y ofrece ciertas caracteristicas relacionadas a la bolsa de valores
    <pre>Funciones:
-Informa apertura y cierre de la bolsa de valores
-Comando .{ticker} para solicitar la cotizacion de un accion particular</pre>`,
    { parse_mode: "HTML" }
  );
});

bot.on("new_chat_members", (msg) => {
  //verifico si el id del "nuevo miembro" coincide con el del bot
  const { id: userID } = msg.new_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  if (userID === bot_id) {
    console.log("Te agregaron al grupo -> " + GroupTITLE);
    //si fue agregado el bot, guardo el id del grupo
    bot.sendMessage(GroupID, "Gracias por la invitacion");
    chats.push({ title: GroupTITLE, id: GroupID });
    console.log(chats);
  }
});

bot.on("left_chat_member", (msg) => {
  //verifico si el id del "miembro que se ha ido" coincide con el del bot
  const { id } = msg.left_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  if (id === bot_id) {
    console.log("Te fuiste del grupo -> " + GroupTITLE);
  }
  chats = chats.filter((chat) => {
    return chat.id !== GroupID;
  });
  console.log(chats);
});
