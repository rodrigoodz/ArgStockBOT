// Imports
require("dotenv").config();
const express = require("express");
const wakeDyno = require("woke-dyno");
const TelegramBot = require("node-telegram-bot-api");
const Bluelytics = require("node-bluelytics");
const { informeApertura } = require("./js/InformeAperturaCierre");
const iol = require("./js/node-iol");
const { deleteDBFirebase, setDBFirebase } = require("./js/ControladorFirebase");
const {
  logMensajePrivado,
  logMensajeGrupal,
  logAgregadoAGrupo,
  logQuitadoDeGrupo,
} = require("./js/ControladorLogs");
const { enviarMensajeGlobal } = require("./js/MensajesGlobales");
const {
  es_accion_arg,
  es_accion_usa,
  es_cedears,
  es_adr,
  es_opcion,
  es_forex,
} = require("./js/tipoTicker");
const {
  getMsgAbout,
  getMsgStart,
  getMsgComandos,
  getMsgTickersArg,
  getLongitudTickersArg,
  getLongitudTickersUsa,
  getLongitudBonosArg,
  getMsgErrorTicker,
  getMsgAyudaTicker,
  getMsgAyudaOpciones,
  getMsgErrorOpciones,
  getMsgTickersUsa,
  getMsgBonosArg,
  getLongitudFCIs,
  getMsgFCIs,
  getMsgAyudaForex,
  getMsgErrorForex,
} = require("./js/mensajesBot");
const { getPrecioBitcoinUsd } = require("./js/obtenerPrecioBitcoin");
const { getDataDolar } = require("./js/webscrapingDolar");
const { getDataForex } = require("./js/obtenerDataForex");

//variables de entorno utilizada (referencia) - dejar comentado
// NTBA_FIX_319=1 -> solucion a error que generaba el modulo node-telegram-bot-api
// BOT_TOKEN=(token_botfather)
// BOT_ID=(bot_id)
// ORRA_ID=(id_grupo_logs) -> recibo alertas del bot y como interactua con las personas que lo utilizan
// ORRA_ID_PRIV=(id_propio_telegram)
// DYNO_URL=(sitio_web_heroku)"

// node-telegram-bot-api
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

//bot_id
const bot_id = process.env.BOT_ID;

//server
const port = process.env.PORT || 3000;
const app = express();

///comando /graf {ticker} {ruedas} -> obtener
// bot.onText(/\/graf (.+)/, (msg, match) => {
//   const ticker = match[1].split(" ")[0];
//   const ruedas = match[1].split(" ")[1];

//   let botones = [];
//   const accion_arg = es_accion_arg(ticker);
//   const accion_usa = es_accion_usa(ticker);
//   const cedear = es_cedears(ticker);

//   if (accion_arg) {
//     botones.push({
//       text: accion_arg,
//       callback_data: JSON.stringify({
//         data: "gArg",
//         sol: `${ticker} ${ruedas} arg`,
//         id: msg.from.id,
//       }),
//     });
//   }
//   if (accion_usa) {
//     botones.push({
//       text: accion_usa,
//       callback_data: JSON.stringify({
//         data: "gUsa",
//         sol: `${ticker} ${ruedas}`,
//         id: msg.from.id,
//       }),
//     });
//   }
//   if (cedear) {
//     botones.push({
//       text: "Cedear",
//       callback_data: JSON.stringify({
//         data: "gArg",
//         sol: `${ticker} ${ruedas}`,
//         id: msg.from.id,
//       }),
//     });
//   }

//   //solo voy a mostrar botones si el ticker está en más de un mercado
//   const tipo = [accion_arg, accion_usa, cedear].filter((elemento) => {
//     return elemento != undefined;
//   });

//   //
//   // if (tipo.length > 1) {
//   //   bot.sendMessage(msg.chat.id, "Seleccionar", {
//   //     reply_markup: {
//   //       inline_keyboard: [botones],
//   //     },
//   //   });
//   // } else if (tipo.length === 1) {
//   //   //si esta en solo 1, no muestro botones y obtengo la cotizacion directamente
//   //   verCotizacion(tipo[0], ticker, msg);
//   // } else if (tipo.length == 0) {
//   //   //si no esta en ninguno, puede ser igual un ticker argentino(o que no exista)
//   //   verCotizacion("bCBA", ticker, msg);
//   // }
//   // --------------------------
//   //si esta en mas de 1, muestro botones
//   if (tipo.length > 1 && Number(ruedas) > 0) {
//     bot.sendMessage(msg.chat.id, "Seleccionar", {
//       reply_markup: {
//         inline_keyboard: [botones],
//       },
//     });
//   } else if (tipo.length === 1) {
//     console.log("solo estaba en 1");
//     if (accion_arg || cedear) {
//       botonesLi neasYVelas("arg", msg, ticker, ruedas, msg.from.id);
//     } else {
//       botonesLineasYVelas("usa", msg, ticker, ruedas, msg.from.id);
//     }
//   } else {
//     const msgErrorGraf = getMsgErrorGraf();
//     bot.sendMessage(msg.chat.id, msgErrorGraf, { parse_mode: "HTML" });
//   }
//   //TODO permitir que pueda seleccionar linea o velas, y si tiene ema o algo de eso

//   //https://stackoverflow.com/questions/61231440/advanced-accessible-chart-highchart-highcharts-export-server
// });

//Mensaje de ayuda al escribir /forex
bot.onText(/\/forex/, (msg, match) => {
  const comandos_array = match.input.trim().split(" ");
  if (comandos_array.length === 1 && comandos_array[0] === "/forex") {
    enviarMensajeBorra1Min(msg.chat.id, getMsgAyudaForex());
  }
});

//TODO agregar comando a /comandos y /start
bot.onText(/\/forex (.+)/, async (msg, match) => {
  const divisas = match[1].split(" ")[0].toUpperCase();

  const forex = es_forex(divisas);
  if (forex) {
    const dataForex = await getDataForex(divisas);
    const { rate, timestamp } = dataForex;

    const date = new Date(timestamp * 1000);

    date.setHours(date.getUTCHours() - 3);
    const mes = date.getUTCMonth();
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

    bot.sendMessage(
      msg.chat.id,
      `<b>[${divisas}]</b> 
  Precio: ${rate} USD
  <u><i>Datos del ${dia}/${mes} -- ${hora}:${min}hs</i></u>
    `,
      {
        parse_mode: "HTML",
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, getMsgErrorForex(), { parse_mode: "HTML" });
  }
});

//comando /btc para obtener precio actualizado del bitcoin
bot.onText(/\/btc/, async (msg) => {
  const { tiempo, precio } = await getPrecioBitcoinUsd();
  tiempo.setHours(tiempo.getUTCHours() - 3);
  const mes = tiempo.getUTCMonth();
  let min;
  tiempo.getUTCMinutes() < 10
    ? (min = "0" + tiempo.getUTCMinutes())
    : (min = tiempo.getUTCMinutes());
  let dia;
  tiempo.getUTCDate() < 10
    ? (dia = "0" + tiempo.getUTCDate())
    : (dia = tiempo.getUTCDate());
  let hora;
  tiempo.getHours() < 10
    ? (hora = "0" + tiempo.getHours())
    : (hora = tiempo.getHours());

  bot.sendMessage(
    msg.chat.id,
    `<b>[Bitcoin]</b> 
Precio: ${precio} USD
<u><i>Datos del ${dia}/${mes} -- ${hora}:${min}hs</i></u>
`,
    {
      parse_mode: "HTML",
    }
  );
});

//comando /global (enviar mensaje a todos los grupos donde el bot pertenezca, util por si quiero informar algo)
bot.onText(/\/global (.+)/, (msg, match) => {
  enviarMensajeGlobal(msg, match);
});

//para tener un control de los mensajes al bot (envio en chat de telegram y por consola)
bot.on("message", (msg) => {
  if (msg.chat.type === "private") {
    logMensajePrivado(msg);
  } else {
    logMensajeGrupal(msg);
  }
});

//Comando /start (funciona en grupos y en mensajes directos)
bot.onText(/\/start/, (msg) => {
  const msgStart = getMsgStart();
  bot.sendMessage(msg.chat.id, msgStart, { parse_mode: "HTML" });
});

//Ver lista de comandos disponibles
bot.onText(/\/comandos/, (msg) => {
  const msgComandos = getMsgComandos();
  bot.sendMessage(msg.chat.id, msgComandos, { parse_mode: "HTML" });
});

//Comando /tickers para ver todas las empresas argentinas que cotizan en bolsa
bot.onText(/\/tickers/, (msg) => {
  bot.sendMessage(msg.chat.id, "Seleccionar", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "MERVAL",
            callback_data: JSON.stringify({
              data: "M",
              soli: "0",
              id_soli: msg.from.id,
            }),
          },
          {
            text: "NYSE",
            callback_data: JSON.stringify({
              data: "usa",
              soli: "0",
              id_soli: msg.from.id,
            }),
          },
          {
            text: "BONOS",
            callback_data: JSON.stringify({
              data: "bonos",
              soli: "0",
              id_soli: msg.from.id,
            }),
          },
          {
            text: "FCIs",
            callback_data: JSON.stringify({
              data: "fci",
              soli: "0",
              id_soli: msg.from.id,
            }),
          },
        ],
      ],
    },
  });
});

//TODO mejorar el codigo, unificarlo
bot.on("callback_query", async (accionboton) => {
  const { data, soli, id_soli } = JSON.parse(accionboton.data);
  const id_click = accionboton.from.id;
  const msg = accionboton.message;

  //verifico si quien tocó el boton fue el mismo que solicitó
  if (id_click !== id_soli) {
    bot.answerCallbackQuery(accionboton.id, {
      text: "No sos quien solicitó la informacion",
      show_alert: true,
    });
  } else {
    //borro botones
    bot.deleteMessage(msg.chat.id, msg.message_id);

    //Botones del comando /tickers
    if (data === "M") {
      //merval
      const inicio = Number(soli); //inicio desde donde voy a mostrar el arreglo de tickers
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
                      soli: `${inicio + 5}`,
                      id_soli: id_soli,
                    }),
                  },
                  {
                    text: "Cerrar",
                    callback_data: JSON.stringify({
                      data: "null",
                      soli: "null",
                      id_soli: id_soli,
                    }),
                  },
                ],
              ],
            },
          }
        );
      }
    }

    if (data == "usa") {
      //nyse
      const inicio = Number(soli); //inicio desde donde voy a mostrar el arreglo de tickers
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
                      soli: `${inicio + 5}`,
                      id_soli: id_soli,
                    }),
                  },
                  {
                    text: "Cerrar",
                    callback_data: JSON.stringify({
                      data: "null",
                      soli: "null",
                      id_soli: id_soli,
                    }),
                  },
                ],
              ],
            },
          }
        );
      }
    }

    if (data == "bonos") {
      //bonos
      const inicio = Number(soli); //inicio desde donde voy a mostrar el arreglo de tickers
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
                      soli: `${inicio + 5}`,
                      id_soli: id_soli,
                    }),
                  },
                  {
                    text: "Cerrar",
                    callback_data: JSON.stringify({
                      data: "null",
                      soli: "null",
                      id_soli: id_soli,
                    }),
                  },
                ],
              ],
            },
          }
        );
      }
    }

    if (data == "fci") {
      //bonos
      const inicio = Number(soli); //inicio desde donde voy a mostrar el arreglo de tickers
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
                    soli: `${inicio + 5}`,
                    id_soli: id_soli,
                  }),
                },
                {
                  text: "Cerrar",
                  callback_data: JSON.stringify({
                    data: "null",
                    soli: "null",
                    id_soli: id_soli,
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
      verCotizacion("bCBA", soli, msg);
    }
    if (data == "nYSE") {
      verCotizacion("nYSE", soli, msg);
    }

    //Opciones
    if (data == "CALL") {
      verOpciones("Call", "bCBA", soli, msg);
    }
    if (data == "PUT") {
      verOpciones("Put", "bCBA", soli, msg);
    }
  }
});

//comando /ticker (ticker_accion) para ver la cotizacion actual de un ticker particular
bot.onText(/\/ticker (.+)/, async (msg, match) => {
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
        soli: ticker,
        id_soli: msg.from.id,
      }),
    });
  }
  if (accion_usa) {
    botones.push({
      text: accion_usa,
      callback_data: JSON.stringify({
        data: accion_usa,
        soli: ticker,
        id_soli: msg.from.id,
      }),
    });
  }
  if (cedear) {
    botones.push({
      text: "Cedear",
      callback_data: JSON.stringify({
        data: cedear,
        soli: ticker,
        id_soli: msg.from.id,
      }),
    });
  }
  if (adr) {
    botones.push({
      text: "ADR",
      callback_data: JSON.stringify({
        data: adr,
        soli: ticker,
        id_soli: msg.from.id,
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
    verCotizacion(tipo[0], ticker, msg);
  } else if (tipo.length == 0) {
    //si no esta en ninguno, puede ser igual un ticker argentino(o que no exista)
    verCotizacion("bCBA", ticker, msg);
  }
});

//Mensaje de ayuda al escribir /opciones
bot.onText(/\/opciones/, (msg, match) => {
  const comandos_array = match.input.trim().split(" ");
  if (comandos_array.length === 1 && comandos_array[0] === "/opciones") {
    enviarMensajeBorra1Min(msg.chat.id, getMsgAyudaOpciones());
  }
});

//Ver opciones "call y put" de algun ticker
bot.onText(/\/opciones (.+)/, async (msg, match) => {
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
                soli: ticker,
                id_soli: msg.from.id,
              }),
            },
            {
              text: "PUT",
              callback_data: JSON.stringify({
                data: "PUT",
                soli: ticker,
                id_soli: msg.from.id,
              }),
            },
          ],
        ],
      },
    });
  } else {
    enviarMensajeBorra1Min(msg.chat.id, getMsgErrorOpciones());
  }
});

//Mensaje de ayuda al escribir /ticker
bot.onText(/\/ticker/, (msg, match) => {
  const comandos_array = match.input.trim().split(" ");
  if (comandos_array.length === 1 && comandos_array[0] === "/ticker") {
    enviarMensajeBorra1Min(msg.chat.id, getMsgAyudaTicker());
  }
});

//Comando /dolar -> utilizo la informacion de Bluelytics
bot.onText(/\/dolar/, async (msg) => {
  bot.sendMessage(msg.chat.id, "Obteniendo informacion...").then((mensaje) => {
    setTimeout(() => {
      bot.deleteMessage(mensaje.chat.id, mensaje.message_id);
    }, 2000);
  });
  const dataDolar = await getDataDolar();

  if (dataDolar) {
    const { compra: cOficial, venta: vOficial } = dataDolar.oficial;
    const { compra: cBlue, venta: vBlue } = dataDolar.blue;
    const { compra: cBolsa, venta: vBolsa } = dataDolar.bolsa;
    const { compra: cCCL, venta: vCCL } = dataDolar.ccl;
    const { venta: vSolidario } = dataDolar.solidario;
    bot.sendMessage(
      msg.chat.id,
      `<b>[Oficial]</b>
  Compra: ${cOficial} ARS // Venta: ${vOficial} ARS
  <b>[Blue]</b>
  Compra: ${cBlue} ARS // Venta: ${vBlue} ARS
  <b>[Bolsa]</b>
  Compra: ${cBolsa} ARS // Venta: ${vBolsa} ARS
  <b>[CCL]</b>
  Compra: ${cCCL} ARS // Venta: ${vCCL} ARS
  <b>[Solidario]</b>
  Venta: ${vSolidario} ARS 
  <u>${dataDolar.hora_refresh}hs</u>    `,
      {
        parse_mode: "HTML",
      }
    );
  } else {
    enviarMensajeBorra1Min(
      msg.chat.id,
      "Hubo un error al obtener la informacion"
    );
  }
});

//comando /about para ver información acerca del bot
bot.onText(/\/about/, (msg) => {
  const msgAbout = getMsgAbout();
  bot.sendMessage(msg.chat.id, msgAbout, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
});

//Si el bot es agregado a un grupo -> guardar un registro del chat (id y titulo del grupo)
bot.on("new_chat_members", (msg) => {
  let { id: userID } = msg.new_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  //verifico si ha sido agregado el bot
  if (String(userID) === bot_id) {
    logAgregadoAGrupo(GroupID, GroupTITLE);
    setDBFirebase(String(GroupID), GroupTITLE);
  }
});

//Si el bot se ha ido/borrado de un grupo -> borrar el registro de ese grupo
bot.on("left_chat_member", (msg) => {
  const { id: userID } = msg.left_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  //verifico si ha sido eliminado el bot
  if (String(userID) === bot_id) {
    logQuitadoDeGrupo(GroupID, GroupTITLE);
    deleteDBFirebase(String(GroupID));
  }
});

//console.log() si ocurre algun tipo de error
bot.on("polling_error", (err) => console.log(err));

//---------------------------------------------------------------------------------------

const enviarMensajeSinBorrar = (chat_id, mensaje) => {
  bot.sendMessage(chat_id, mensaje, {
    parse_mode: "HTML",
  });
};

const enviarMensajeBorra2Min = (chat_id, mensaje) => {
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

const enviarMensajeBorra1Min = (chat_id, mensaje) => {
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

const verOpciones = async (tipo, mercado, ticker, msg) => {
  let token = await iol.auth(); //autentificarme
  const descripcion = await iol.getOptions(token, mercado, ticker);

  if (descripcion === "Error") {
    enviarMensajeBorra2Min(msg.chat.id, getMsgErrorOpciones());
  } else {
    let mensajeOpciones = "";
    descripcion.forEach((e) => {
      if (e.tipoOpcion == tipo) {
        let aux = e.descripcion.replace("Vencimiento:", "Vto.");
        mensajeOpciones += `
  <u>${aux}</u>
  <i>Variacion: ${e.cotizacion.variacion}% - Ult. Precio: ${e.cotizacion.ultimoPrecio}$</i>`;
      }
    });
    mensajeOpciones += "";
    enviarMensajeSinBorrar(msg.chat.id, mensajeOpciones);
  }
};

const verCotizacion = async (mercado, ticker, msg) => {
  let token = await iol.auth(); //autentificarme
  const descripcion = await iol.getTickerValue(token, mercado, ticker);
  if (descripcion === "Error") {
    enviarMensajeBorra2Min(msg.chat.id, getMsgErrorTicker());
  } else {
    const {
      ultimoPrecio,
      variacion,
      maximo,
      minimo,
      fechaHora,
      cierreAnterior,
    } = descripcion;
    let moneda = "";
    if (mercado == "nYSE") {
      moneda = "US";
    } else if (mercado == "bCBA") {
      moneda = "";
    }
    //fecha de la consulta
    const [, mes, dia] = fechaHora.trim().split("T")[0].trim().split("-");
    const [hora, min] = fechaHora
      .trim()
      .split("T")[1]
      .trim()
      .split(".")[0]
      .trim()
      .split(":");
    //   //fecha actual
    let date = new Date();
    //si es un dia de semana de 11hs a 18hs
    const hora_actual = date.getUTCHours() - 3;
    const dia_actual = date.getDay();
    //Segun el dia y la hora_actual, muestro diferentes mensajes al escribir el comando
    let mensajeTicker = "";
    const variacion_fixed = variacion.toFixed(2);
    const mensaje_accion = `<b>${ticker.toUpperCase()}</b>
    Precio Actual: <b>${ultimoPrecio} ${moneda}$</b>
    Cierre Anterior: <b>${cierreAnterior} ${moneda}$</b>
    Rango día: <b>${minimo} ${moneda}$</b> - <b>${maximo} ${moneda}$</b>
    Ganancia/Perdida: <b>${variacion_fixed}%</b>`;
    const mensaje_accion_premercado = `<b>${ticker.toUpperCase()}</b>
    Precio Actual: <b>${ultimoPrecio} ${moneda}$</b>
    Rango día: <b>${minimo} ${moneda}$</b> - <b>${maximo} ${moneda}$</b>`;
    if (
      hora_actual >= 11 &&
      hora_actual <= 18 &&
      dia_actual !== 0 &&
      dia_actual !== 6
    ) {
      mensajeTicker = `<i>[Datos del ${dia}/${mes} -- ${hora}:${min}hs]</i>
    ${mensaje_accion}`;
    } else {
      //agregado para mostrar dia anterior si estamos entre las 8 y las 11
      if (hora_actual >= 7 && hora_actual < 11) {
        mensajeTicker = `<i>[Mercado Cerrado. Datos del ${dia - 1}/${mes}]</i>
    ${mensaje_accion_premercado}`;
      } else {
        //en cualquier otro caso muestro los ultimos datos del mercado
        mensajeTicker = `<i>[Mercado Cerrado. Datos del ${dia}/${mes}]</i>
    ${mensaje_accion}`;
      }
    }
    //envio el mensaje correspondiente
    enviarMensajeSinBorrar(msg.chat.id, mensajeTicker);
  }
};

//---------------------------------------------------------------------------------------

//Cada 1 minuto, consulta si el mercado esta por abrir o cerrar
setInterval(function () {
  let date = new Date();
  //verifico si no es sabado o domingo
  if (date.getDay() !== 0 && date.getDay() !== 6) {
    //verifico si esta por abrir o cerrar el mercado
    if (date.getUTCHours() - 3 === 10 && date.getUTCMinutes() === 55) {
      informeApertura(1);
    }
    if (date.getUTCHours() - 3 === 16 && date.getUTCMinutes() === 55) {
      informeApertura(0);
    }
  }
}, 60000); //60000

//SERVER
app.get("/", function (req, res) {
  res.send(JSON.stringify({ Hello: "World" }));
});
app.listen(port, function () {
  wakeDyno({
    url: process.env.DYNO_URL,
    interval: 60000 * 25,
    startNap: [4, 0, 0, 0],
    endNap: [10, 0, 0, 0],
    //descanso de 4am a 10am (UTC)
  }).start();
  console.log(`Escuchando en puerto ${port}`);
});
