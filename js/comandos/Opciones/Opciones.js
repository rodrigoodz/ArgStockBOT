const { enviarMensajeBorra1Min } = require("../../mensajesBot/envioMensajes");
const {
  getMsgAyudaOpciones,
  getMsgErrorOpciones,
} = require("../../mensajesBot/mensajesBot");
const { es_opcion } = require("../Ticker/tipoTicker");

const comandoAyudaOpciones = (bot, msg, match) => {
  const comandos_array = match.input.trim().split(" ");
  if (comandos_array.length === 1 && comandos_array[0] === "/opciones") {
    enviarMensajeBorra1Min(bot, msg.chat.id, getMsgAyudaOpciones());
  }
};

const comandoOpciones = (bot, msg, match) => {
  let ticker = match[1].toLowerCase();

  const opcion_arg = es_opcion(ticker);
  if (opcion_arg) {
    bot.sendMessage(msg.chat.id, "Seleccionar", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "CALL",
              callback_data: JSON.stringify({
                data: "CALL",
                sol: ticker,
                id: msg.from.id,
              }),
            },
            {
              text: "PUT",
              callback_data: JSON.stringify({
                data: "PUT",
                sol: ticker,
                id: msg.from.id,
              }),
            },
          ],
        ],
      },
    });
  } else {
    enviarMensajeBorra1Min(bot, msg.chat.id, getMsgErrorOpciones());
  }
};

module.exports = {
  comandoAyudaOpciones,
  comandoOpciones,
};
