const enviarMensajeSinBorrar = (bot, chat_id, mensaje) => {
  bot.sendMessage(chat_id, mensaje, {
    parse_mode: "HTML",
  });
};

const enviarMensajeBorra2Min = (bot, chat_id, mensaje) => {
  bot
    .sendMessage(chat_id, mensaje, {
      parse_mode: "HTML",
    })
    .then((mensaje) => {
      //despues de 2 minutos borro el mensaje de todos los grupos
      setTimeout(() => {
        bot.deleteMessage(mensaje.chat.id, mensaje.message_id);
      }, 120000);
    });
};

const enviarMensajeBorra1Min = (bot, chat_id, mensaje) => {
  bot
    .sendMessage(chat_id, mensaje, {
      parse_mode: "HTML",
    })
    .then((mensaje) => {
      //despues de 2 minutos borro el mensaje de todos los grupos
      setTimeout(() => {
        bot.deleteMessage(mensaje.chat.id, mensaje.message_id);
      }, 30000);
    });
};

module.exports = {
  enviarMensajeSinBorrar,
  enviarMensajeBorra2Min,
  enviarMensajeBorra1Min,
};
