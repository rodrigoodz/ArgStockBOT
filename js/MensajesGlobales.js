//mensajes globales (todos los que tienen el bot en un grupo) que puedo enviar unicamente yo

//imports
const TelegramBot = require("node-telegram-bot-api");
const { getDBFirebase } = require("./ControladorFirebase");

// node-telegram-bot-api
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

const enviarMensajeGlobal = async (msg, match) => {
  if (String(msg.from.id) === process.env.ORRA_ID_PRIV) {
    const chats = await getDBFirebase();
    if (chats.length > 0) {
      chats.forEach((chat) => {
        bot.sendMessage(chat.id, match[1], { parse_mode: "HTML" });
        // .then((mensaje) => {
        //   //despues de 2 minutos borro el mensaje de todos los grupos
        //   setTimeout(() => {
        //     bot.deleteMessage(mensaje.chat.id, mensaje.message_id);
        //   }, 15 * 60000);
        // });
      });
    }
  }
  //   //borro el mensaje despues de 1 minuto
  //   setTimeout(() => {
  //     bot.onText(/^\/borrar/, (msg) => {

  //       if (msg.reply_to_message == undefined) {
  //         return;
  //       }

  //       bot.deleteMessage(chatId, messageId);
  //     });
  //   }, 60000);
};

module.exports = {
  enviarMensajeGlobal,
};
