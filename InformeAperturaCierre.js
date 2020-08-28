// Imports
const TelegramBot = require("node-telegram-bot-api");

// node-telegram-bot-api
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

const informeApertura = (apertura) => {
  const chats = getListado();
  if (chats.length > 0) {
    chats.forEach((grupo) => {
      if (apertura === 1) {
        console.log(chats);
        chats.forEach((chat) => {
          bot.sendMessage(
            chat.id,
            "<b>El mercado abre en aproximadamente 5 minutos!</b>",
            { parse_mode: "HTML" }
          );
        });
        // bot.sendMessage(
        //   grupo.id,
        //   "<b>El mercado abre en aproximadamente 5 minutos!</b>",
        //   { parse_mode: "HTML" }
        // );
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
