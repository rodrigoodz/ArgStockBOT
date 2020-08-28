// Imports
const TelegramBot = require("node-telegram-bot-api");
const { getDBFirebase } = require("./ControladorFirebase");

// node-telegram-bot-api
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

const informeApertura = async (apertura) => {
  const chats = await getDBFirebase();
  if (chats.length > 0) {
    chats.forEach((grupo) => {
      if (apertura === 1) {
        chats.forEach((chat) => {
          bot.sendMessage(
            chat.id,
            "<b>El mercado abre en aproximadamente 5 minutos!</b>",
            { parse_mode: "HTML" }
          );
        });
      } else {
        bot.sendMessage(
          grupo.id,
          "<b>El mercado cierra en aproximadamente 5 minutos!</b>",
          { parse_mode: "HTML" }
        );
      }
    });
  }
};

module.exports = {
  informeApertura,
};
