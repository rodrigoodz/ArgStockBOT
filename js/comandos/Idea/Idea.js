const { enviarMensajeBorra1Min } = require("../../mensajesBot/envioMensajes");
const {
  getMsgAyudaIdea,
  getMsgErrorIdea,
} = require("../../mensajesBot/mensajesBot");
const {
  es_accion_usa,
  es_accion_arg,
  es_forex,
} = require("../Ticker/tipoTicker");
const { getIdea } = require("./webscrapingIdeasTD");

const comandoAyudaIdea = (bot, msg, match) => {
  const comandos_array = match.input.trim().split(" ");
  if (comandos_array.length === 1 && comandos_array[0] === "/idea") {
    enviarMensajeBorra1Min(bot, msg.chat.id, getMsgAyudaIdea());
  }
};
const comandoIdea = async (bot, msg, match) => {
  const ticker = match[1].split(" ")[0].toLowerCase();

  bot.sendMessage(msg.chat.id, "Obteniendo informacion...").then((mensaje) => {
    setTimeout(() => {
      bot.deleteMessage(mensaje.chat.id, mensaje.message_id);
    }, 4000);
  });

  const array = [
    es_accion_arg(ticker),
    es_accion_usa(ticker),
    es_forex(ticker),
  ];

  //si hay algo undefined busco, sino envio mensaje error
  const hay_data = array.findIndex((e) => {
    return e != undefined;
  });

  let titulo, descripcion, link, autor, date;
  if (hay_data !== -1) {
    switch (hay_data) {
      case 0:
        ({ titulo, descripcion, link, autor, date } = await getIdea(
          ticker,
          "BCBA"
        ));
        break;
      case 1:
        ({ titulo, descripcion, link, autor, date } = await getIdea(
          ticker,
          "NASDAQ"
        ));
        break;
      case 2:
        ({ titulo, descripcion, link, autor, date } = await getIdea(ticker));
        break;
    }

    date.setHours(date.getUTCHours() - 3);
    const mes = date.getUTCMonth() + 1;
    let min;
    date.getUTCMinutes() < 10
      ? (min = "0" + date.getUTCMinutes())
      : (min = date.getUTCMinutes());
    let dia;
    date.getUTCDate() < 10
      ? (dia = "0" + date.getUTCDate())
      : (dia = date.getUTCDate());
    let hora;
    date.getHours() < 10
      ? (hora = "0" + date.getHours())
      : (hora = date.getHours());

    bot.sendPhoto(msg.chat.id, link).then(() => {
      bot.sendMessage(
        msg.chat.id,
        `<b>${titulo}</b>
${descripcion}
<i>Autor: <b>${autor}</b></i>
<u><i>Fecha: ${dia}/${mes} -- ${hora}:${min}hs</i></u>
<a href="${link}">Link</a>`,
        {
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }
      );
    });
  } else {
    bot.sendMessage(msg.chat.id, getMsgErrorIdea(), {
      parse_mode: "HTML",
    });
  }
};

module.exports = {
  comandoAyudaIdea,
  comandoIdea,
};
