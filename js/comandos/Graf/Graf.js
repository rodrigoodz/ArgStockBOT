const { botonesLineasYVelas } = require("./botonesLineasYVelas");
const { enviarMensajeBorra1Min } = require("../../mensajesBot/envioMensajes");
const {
  getMsgErrorGraf,
  getMsgAyudaGraf,
} = require("../../mensajesBot/mensajesBot");
const {
  es_accion_arg,
  es_accion_usa,
  es_cedears,
} = require("../Ticker/tipoTicker");

const comandoAyudaGraf = (bot, msg, match) => {
  const comandos_array = match.input.trim().split(" ");
  if (comandos_array.length === 1 && comandos_array[0] === "/graf") {
    enviarMensajeBorra1Min(bot, msg.chat.id, getMsgAyudaGraf());
  }
};

const comandoGraf = async (bot, msg, match) => {
  const ticker = match[1].split(" ")[0].toLowerCase();
  const ruedas = match[1].split(" ")[1];

  //consulto tipo accion y armo botones para seleccionar tipo
  let botones = [];
  const accion_arg = es_accion_arg(ticker);
  const accion_usa = es_accion_usa(ticker);
  const cedear = es_cedears(ticker);
  if (accion_arg) {
    botones.push({
      text: accion_arg,
      callback_data: JSON.stringify({
        data: "gArg",
        sol: `${ticker} ${ruedas} arg`,
        id: msg.from.id,
      }),
    });
  }
  if (accion_usa) {
    botones.push({
      text: accion_usa,
      callback_data: JSON.stringify({
        data: "gUsa",
        sol: `${ticker} ${ruedas}`,
        id: msg.from.id,
      }),
    });
  }
  if (cedear) {
    botones.push({
      text: "Cedear",
      callback_data: JSON.stringify({
        data: "gArg",
        sol: `${ticker} ${ruedas}`,
        id: msg.from.id,
      }),
    });
  }

  //solo voy a mostrar botones si el ticker está en más de un mercado
  const tipo = [accion_arg, accion_usa, cedear].filter((elemento) => {
    return elemento != undefined;
  });
  // ///////////////////////////////////////////////////
  const tickers_invalidos = ["mirg", "bbar", "txar", "carc", "glnt", "pgr"];
  const invalido = tickers_invalidos.filter((e) => {
    return e == ticker;
  });
  //algunas graficas no estan disponibles en yahoo-finance, si se consulto alguna de ellas mando mensaje
  if (invalido.length > 0) {
    enviarMensajeBorra1Min(
      bot,
      msg.chat.id,
      `Las gráficas de los tickers ${tickers_invalidos} no estan disponibles actualmente.`
    );
  } else {
    if (tipo.length > 1 && Number(ruedas) > 0) {
      //si esta en mas de 1, muestro botones
      if (Number(ruedas) > 500) {
        //si escribio > 500 ruedas
        bot.sendMessage(
          msg.chat.id,
          "Ingresar un cantidad de ruedas menor a 500",
          { parse_mode: "HTML" }
        );
      } else {
        //sino muestro botones
        bot.sendMessage(msg.chat.id, "Seleccionar", {
          reply_markup: {
            inline_keyboard: [botones],
          },
        });
      }
    } else if (tipo.length === 1 && Number(ruedas) > 0) {
      //si el ticker esta en un solo mercado, muestro directamente botones
      if (Number(ruedas) > 500) {
        //si escribio > 500 ruedas
        bot.sendMessage(
          msg.chat.id,
          "Ingresar un cantidad de ruedas menor a 500",
          { parse_mode: "HTML" }
        );
      } else {
        //sino muestro botones
        if (accion_arg || cedear) {
          botonesLineasYVelas(bot, "arg", msg, ticker, ruedas, msg.from.id);
        } else {
          botonesLineasYVelas(bot, "usa", msg, ticker, ruedas, msg.from.id);
        }
      }
    } else {
      //en caso de error
      enviarMensajeBorra1Min(bot, msg.chat.id, getMsgErrorGraf());
    }
  }
};

module.exports = {
  comandoAyudaGraf,
  comandoGraf,
};
