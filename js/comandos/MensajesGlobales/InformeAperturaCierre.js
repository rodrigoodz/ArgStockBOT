// Imports
const TelegramBot = require("node-telegram-bot-api");
const { getDBFirebase } = require("../../auxiliares/ControladorFirebase");

// node-telegram-bot-api
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

const informeApertura = async (apertura) => {
  const chats = await getDBFirebase();
  if (chats.length > 0) {
    if (apertura === 1) {
      chats.forEach((chat) => {
        bot
          .sendMessage(
            chat.id,
            "<b>El mercado abre en aproximadamente 5 minutos!</b>",
            { parse_mode: "HTML" }
          )
          .then((mensaje) => {
            //despues de 2 minutos borro el mensaje de todos los grupos
            setTimeout(() => {
              bot.deleteMessage(mensaje.chat.id, mensaje.message_id);
            }, 60000);
          });
        bot
          .sendPhoto(chat.id, "https://unsplash.com/photos/N__BnvQ_w18")
          .then((mensaje) => {
            //despues de 2 minutos borro el mensaje de todos los grupos
            setTimeout(() => {
              bot.deleteMessage(mensaje.chat.id, mensaje.message_id);
            }, 60000);
          });
      });
    } else {
      chats.forEach((chat) => {
        bot
          .sendMessage(
            chat.id,
            "<b>El mercado cierra en aproximadamente 5 minutos!</b>",
            { parse_mode: "HTML" }
          )
          .then((mensaje) => {
            //despues de 2 minutos borro el mensaje de todos los grupos
            setTimeout(() => {
              bot.deleteMessage(mensaje.chat.id, mensaje.message_id);
            }, 60000);
          });
        bot
          .sendPhoto(chat.id, "https://unsplash.com/photos/ZzOa5G8hSPI")
          .then((mensaje) => {
            //despues de 2 minutos borro el mensaje de todos los grupos
            setTimeout(() => {
              bot.deleteMessage(mensaje.chat.id, mensaje.message_id);
            }, 60000);
          });
      });
    }
  }
};

module.exports = {
  informeApertura,
};
