//botones que se van mostrando ya sea por el comando /graf,/tickers o /ticker

const { botonesLineasYVelas } = require("../comandos/Graf/botonesLineasYVelas");
const {
  lineChart,
  candlestickChart,
} = require("../comandos/Graf/graficosTicker");
const { verOpciones } = require("../comandos/Opciones/verOpcionesTicker");
const { verCotizacion } = require("../comandos/Ticker/verCotizacionTicker");
const {
  getMsgTickersArg,
  getLongitudTickersArg,
  getMsgTickersUsa,
  getLongitudTickersUsa,
  getMsgBonosArg,
  getMsgFCIs,
  getLongitudBonosArg,
  getLongitudFCIs,
} = require("../mensajesBot/mensajesBot");

const callbackQuery = async (bot, accionboton) => {
  const { data, sol, id } = JSON.parse(accionboton.data);
  const id_click = accionboton.from.id;
  const msg = accionboton.message;

  //verifico si quien tocó el boton fue el mismo que solicitó
  if (id_click !== id) {
    bot.answerCallbackQuery(accionboton.id, {
      text: "No sos quien solicitó la informacion",
      show_alert: true,
    });
  } else {
    //borro botones
    bot.deleteMessage(msg.chat.id, msg.message_id);

    //################################
    // Botones del comando /tickers
    //################################

    //MERVAL
    if (data === "M") {
      //merval
      const inicio = Number(sol); //inicio desde donde voy a mostrar el arreglo de tickers
      const msgTickersArg = getMsgTickersArg(inicio);
      const longitudTickersArg = getLongitudTickersArg();
      if (inicio < longitudTickersArg) {
        bot.sendMessage(
          msg.chat.id,
          `${msgTickersArg}[${inicio}/${longitudTickersArg}]`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Mostrar Mas",
                    callback_data: JSON.stringify({
                      data: "M",
                      sol: `${inicio + 10}`,
                      id: id,
                    }),
                  },
                  {
                    text: "Cerrar",
                    callback_data: JSON.stringify({
                      data: "null",
                      sol: "null",
                      id: id,
                    }),
                  },
                ],
              ],
            },
          }
        );
      }
    }

    //NYSE
    if (data == "usa") {
      const inicio = Number(sol); //inicio desde donde voy a mostrar el arreglo de tickers
      const msgTickersUsa = getMsgTickersUsa(inicio);
      const longitudTickersUsa = getLongitudTickersUsa();
      if (inicio < longitudTickersUsa) {
        bot.sendMessage(
          msg.chat.id,
          `${msgTickersUsa}[${inicio}/${longitudTickersUsa}]`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Mostrar Mas",
                    callback_data: JSON.stringify({
                      data: "usa",
                      sol: `${inicio + 10}`,
                      id: id,
                    }),
                  },
                  {
                    text: "Cerrar",
                    callback_data: JSON.stringify({
                      data: "null",
                      sol: "null",
                      id: id,
                    }),
                  },
                ],
              ],
            },
          }
        );
      }
    }

    //################################
    // Botones para comando /graf
    //################################

    // Mercado Graficas
    if (data === "gArg") {
      const ticker = sol.trim().split(" ")[0];
      const ruedas = sol.trim().split(" ")[1];
      botonesLineasYVelas(bot, "arg", msg, ticker, ruedas, id);
    }

    if (data === "gUsa") {
      const ticker = sol.trim().split(" ")[0];
      const ruedas = sol.trim().split(" ")[1];
      botonesLineasYVelas(bot, "usa", msg, ticker, ruedas, id);
    }

    // Botones Candlestick
    if (data === "V") {
      const ticker = sol.trim().split(" ")[0];
      const ruedas = sol.trim().split(" ")[1];
      bot.sendMessage(msg.chat.id, "Seleccionar", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "EMA9",
                callback_data: JSON.stringify({
                  data: "EMA9",
                  sol: `${ticker} ${ruedas} 9`,
                  id: id,
                }),
              },
              {
                text: "EMA27",
                callback_data: JSON.stringify({
                  data: "EMA27",
                  sol: `${ticker} ${ruedas} 27`,
                  id: id,
                }),
              },
              {
                text: "EMA100",
                callback_data: JSON.stringify({
                  data: "EMA100",
                  sol: `${ticker} ${ruedas} 100`,
                  id: id,
                }),
              },
              {
                text: "EMA200",
                callback_data: JSON.stringify({
                  data: "EMA200",
                  sol: `${ticker} ${ruedas} 200`,
                  id: id,
                }),
              },
            ],
            [
              {
                text: "EMA 50 y 200",
                callback_data: JSON.stringify({
                  data: "EMA50200",
                  sol: `${ticker} ${ruedas} 50 200`,
                  id: id,
                }),
              },
              {
                text: "EMA 9 y 27",
                callback_data: JSON.stringify({
                  data: "EMA927",
                  sol: `${ticker} ${ruedas} 9 27`,
                  id: id,
                }),
              },
            ],
            [
              {
                text: "Sin EMA",
                callback_data: JSON.stringify({
                  data: "SINEMA",
                  sol: `${ticker} ${ruedas}`,
                  id: id,
                }),
              },
            ],
          ],
        },
      });
    }

    // Si toco alguna ema o ninguna
    if (
      data === "EMA9" ||
      data === "EMA27" ||
      data === "EMA100" ||
      data === "EMA200" ||
      data === "SINEMA"
    ) {
      const ticker = sol.trim().split(" ")[0];
      const ruedas = sol.trim().split(" ")[1];
      const periodo_ema = sol.trim().split(" ")[2];
      await candlestickChart(ticker, ruedas, msg, periodo_ema);
    }
    if (data === "EMA927" || data === "EMA50200") {
      const ticker = sol.trim().split(" ")[0];
      const ruedas = sol.trim().split(" ")[1];
      const periodo_ema1 = sol.trim().split(" ")[2];
      const periodo_ema2 = sol.trim().split(" ")[3];
      await candlestickChart(ticker, ruedas, msg, periodo_ema1, periodo_ema2);
    }

    // Si toco boton Linea
    if (data === "Line") {
      const ticker = sol.trim().split(" ")[0];
      const ruedas = sol.trim().split(" ")[1];
      await lineChart(ticker, ruedas, msg);
    }

    //   ################################################################

    //BONOS
    if (data == "bonos") {
      const inicio = Number(sol); //inicio desde donde voy a mostrar el arreglo de tickers
      const msgBonosArg = getMsgBonosArg(inicio);
      const longitudBonosArg = getLongitudBonosArg();
      if (inicio < longitudBonosArg) {
        bot.sendMessage(
          msg.chat.id,
          `${msgBonosArg}[${inicio}/${longitudBonosArg}]`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Mostrar Mas",
                    callback_data: JSON.stringify({
                      data: "bonos",
                      sol: `${inicio + 10}`,
                      id: id,
                    }),
                  },
                  {
                    text: "Cerrar",
                    callback_data: JSON.stringify({
                      data: "null",
                      sol: "null",
                      id: id,
                    }),
                  },
                ],
              ],
            },
          }
        );
      }
    }

    //FCI
    if (data == "fci") {
      const inicio = Number(sol); //inicio desde donde voy a mostrar el arreglo de tickers
      const msgFCIs = getMsgFCIs(inicio);
      const longitudFCIs = getLongitudFCIs();
      if (inicio < longitudFCIs) {
        bot.sendMessage(msg.chat.id, `${msgFCIs}[${inicio}/${longitudFCIs}]`, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Mostrar Mas",
                  callback_data: JSON.stringify({
                    data: "fci",
                    sol: `${inicio + 10}`,
                    id: id,
                  }),
                },
                {
                  text: "Cerrar",
                  callback_data: JSON.stringify({
                    data: "null",
                    sol: "null",
                    id: id,
                  }),
                },
              ],
            ],
          },
        });
      }
    }

    //Acciones
    if (data == "bCBA") {
      verCotizacion(bot, "bCBA", sol, msg);
    }
    if (data == "nYSE") {
      verCotizacion(bot, "nYSE", sol, msg);
    }

    //Opciones
    if (data == "CALL") {
      verOpciones(bot, "Call", "bCBA", sol, msg);
    }
    if (data == "PUT") {
      verOpciones(bot, "Put", "bCBA", sol, msg);
    }
  }
};

module.exports = {
  callbackQuery,
};
