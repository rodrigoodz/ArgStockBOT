const { enviarMensajeBorra1Min } = require("../../mensajesBot/envioMensajes");
const { getMsgAyudaTicker } = require("../../mensajesBot/mensajesBot");
const {
  es_accion_usa,
  es_accion_arg,
  es_adr,
  es_cedears,
} = require("./tipoTicker");
const { verCotizacion } = require("./verCotizacionTicker");

const comandoAyudaTicker = (bot, msg, match) => {
  const comandos_array = match.input.trim().split(" ");
  if (comandos_array.length === 1 && comandos_array[0] === "/ticker") {
    enviarMensajeBorra1Min(bot, msg.chat.id, getMsgAyudaTicker());
  }
};

const comandoTicker = (bot, msg, match) => {
  let ticker = match[1].toLowerCase();

  //consulto tipo accion y armo botones para seleccionar tipo
  let botones = [];
  const accion_arg = es_accion_arg(ticker);
  const accion_usa = es_accion_usa(ticker);
  const cedear = es_cedears(ticker);
  const adr = es_adr(ticker);

  // const aux = await iol.getOptions(token, "bcBA", ticker);
  // const aux = await iol.getInstrumentsByCountry(token, "argentina");
  //const aux = await iol.getPanels(token, "titulos", "bCBA", "argentina");

  if (accion_arg) {
    botones.push({
      text: accion_arg,
      callback_data: JSON.stringify({
        data: accion_arg,
        sol: ticker,
        id: msg.from.id,
      }),
    });
  }
  if (accion_usa) {
    botones.push({
      text: accion_usa,
      callback_data: JSON.stringify({
        data: accion_usa,
        sol: ticker,
        id: msg.from.id,
      }),
    });
  }
  if (cedear) {
    botones.push({
      text: "Cedear",
      callback_data: JSON.stringify({
        data: cedear,
        sol: ticker,
        id: msg.from.id,
      }),
    });
  }
  if (adr) {
    botones.push({
      text: "ADR",
      callback_data: JSON.stringify({
        data: adr,
        sol: ticker,
        id: msg.from.id,
      }),
    });
  }

  //solo voy a mostrar botones si el ticker está en más de un mercado
  const tipo = [accion_arg, accion_usa, cedear, adr].filter((elemento) => {
    return elemento != undefined;
  });

  //si esta en mas de 1, muestro botones
  if (tipo.length > 1) {
    bot.sendMessage(msg.chat.id, "Seleccionar", {
      reply_markup: {
        inline_keyboard: [botones],
      },
    });
  } else if (tipo.length === 1) {
    //si esta en solo 1, no muestro botones y obtengo la cotizacion directamente
    verCotizacion(bot, tipo[0], ticker, msg);
  } else if (tipo.length == 0) {
    //si no esta en ninguno, puede ser igual un ticker argentino(o que no exista)
    verCotizacion(bot, "bCBA", ticker, msg);
  }
};

module.exports = {
  comandoTicker,
  comandoAyudaTicker,
};
