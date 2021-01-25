const { getDBFirebase } = require("../../auxiliares/ControladorFirebase");

//mensajes globales (todos los que tienen el bot en un grupo) que puedo enviar unicamente yo
const enviarMensajeGlobal = async (bot, msg, match) => {
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
};

module.exports = {
  enviarMensajeGlobal,
};
