// Imports
const TelegramBot = require("node-telegram-bot-api");
const config = require("./config/config.json");

// node-telegram-bot-api
const token = config.token;
const bot = new TelegramBot(token);

const informeApertura = (chats, apertura) => {
  if (chats.length > 0) {
    //le manda un mensaje a todos los grupos guardados, cambiarlo... es solo para probar
    chats.forEach((grupo) => {
      //si apertura es 1 es porque el mercado esta por abrir, sino esta por cerrar
      if (apertura === 1) {
        bot.sendMessage(
          grupo.id,
          "<b>El mercado abre en aproximadamente 5 minutos!</b>",
          { parse_mode: "HTML" }
        );
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
