// Imports
require("dotenv").config();
const express = require("express");
const wakeDyno = require("woke-dyno");
const TelegramBot = require("node-telegram-bot-api");
const Bluelytics = require("node-bluelytics");
const { informeApertura } = require("./InformeAperturaCierre");
const { obtenerCotizacion } = require("./ControladorTickers");
const { getListado, agregar, borrar } = require("./ControladorRegistroChats");

// node-telegram-bot-api
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

//bot_id
const bot_id = process.env.BOT_ID;

//server
const port = process.env.PORT || 3000;
const app = express();

//para tener un control de los mensajes al bot
bot.on("message", (msg) => {
  // if (msg.chat.type === "private") {
  //   console.log(`${msg.from.username} te escribio en privado ${msg.text}`);
  // } else {
  //   console.log(`${msg.from.username} te escribio en un grupo ${msg.text}`);
  // }
  if (msg.chat.type === "private") {
    bot.sendMessage(
      process.env.ORRA_ID,
      `${msg.from.username} escribio en privado ${msg.text}`,
      { parse_mode: "HTML" }
    );
  } else {
    bot.sendMessage(
      process.env.ORRA_ID,
      `${msg.from.username} escribio en un grupo ${msg.text}`,
      { parse_mode: "HTML" }
    );
  }
});

//comando /start (funciona en grupos y mp)
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>ArgStockBOT</b> es un bot desarrollado por @orra6 y ofrece ciertas caracteristicas relacionadas a la bolsa de valores argentina. Para ver los comandos disponibles,escriba <b>/comandos</b>
    <pre>Funciones:
-Al ser agregado a un grupo, este informa el cierre y apertura del mercado argentino
-Ver la lista de todas las acciones argentinas
-Consultar la cotizacion de un accion argentina de forma particular
-Consultar el precio del dolar actual</pre>
`,
    { parse_mode: "HTML" }
  );
});

//ver la lista de comandos disponibles
bot.onText(/\/comandos/, async (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>/tickers</b> -> muestra una lista todos los tickers argentinos que pueden ser consultados
<b>/ticker (ticker_argentino)</b> -> consultar un ticker particular del mercado argentino
<b>/dolar</b> -> obtener precio del dolar (info. de Bluelytics)
<b>/about</b> -> informacion`,
    { parse_mode: "HTML" }
  );
});

//comando /tickers para ver los tickers argentinos para consultar su cotizacion
bot.onText(/\/tickers/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>Tickers Argentinos</b>
<pre>
ALUA - Aluminio Argentino SA

BBAR - Banco Francés SA

BMA - Banco Macro SA

BYMA - Bolsas y Mercados Argentinos SA

CEPU - Central Puerto SA 

COME - Sociedad Comercial del Plata SA

CRES - Cresud SA

CVH - Cablevision Holding SA

EDN - Edenor

GGAL - Grupo Financiero Galicia

MIRG - Mirgor

PAMP - Pampa Energía

SUPV - Grupo Supervielle SA

TECO2 - Telecom Argentina SA

TGNO4 - Transportadora de Gas del Norte SA

TGSU2 - Transportadora de Gas del Sur

TRAN - Transener

TXAR - Ternium Argentina SA

VALO - Grupo Financiero Valores SA

YPFD - YPF SA
</pre>
  `,
    {
      parse_mode: "HTML",
    }
  );
});

//comando /ticker (ticker_accion) para ver la cotizacion actual de un ticker particular
bot.onText(/\/ticker (.+)/, async (msg, match) => {
  const ticker = match[1];
  const accion = await obtenerCotizacion(ticker);
  // console.log(accion);
  //si accion es un string (con el error)
  if (typeof accion === "string") {
    bot.sendMessage(msg.chat.id, `${accion}`, {
      parse_mode: "HTML",
    });
  } else {
    //si accion es un objeto
    //expreso la informacion con un retraso de (accion.delay)
    let delay_time = new Date().getTime() - accion.delay * 60000; //retrasada 20 minutos generalmente
    delay_time = new Date(delay_time);
    const hora_delay = delay_time.getUTCHours() - 3;
    const min_delay =
      (delay_time.getUTCMinutes() < 10 ? "0" : "") + delay_time.getUTCMinutes();

    //calculo porcentaje de ganancia/perdida
    let porcentaje_gan_perd = (
      (accion.cambio_cotizacion * 100) /
      accion.max_dia
    ).toFixed(2);
    if (porcentaje_gan_perd > 0) {
      porcentaje_gan_perd = "+" + porcentaje_gan_perd;
    }

    //mercadoAbierto?
    let mensajeTicker = "";
    let date = new Date();
    if (date.getUTCHours() - 3 > 11 && date.getUTCHours() - 3 < 18) {
      mensajeTicker = `<i>[Datos de las ${hora_delay}:${min_delay}hs]</i>  
    <b>${accion.nombre}</b>
    Precio Actual: <b>${accion.precio} ${accion.moneda}</b>
    Rango día: <b>${accion.min_dia} ${accion.moneda}</b> - <b>${accion.max_dia} ${accion.moneda}</b>
    Ganancia/Perdida: <b>${porcentaje_gan_perd}%</b>`;
    } else {
      mensajeTicker = `<i>[Mercado Cerrado. Ultimos Datos]</i>  
      <b>${accion.nombre}</b>
      Precio Actual: <b>${accion.precio} ${accion.moneda}</b>
      Rango día: <b>${accion.min_dia} ${accion.moneda}</b> - <b>${accion.max_dia} ${accion.moneda}</b>
      Ganancia/Perdida: <b>${porcentaje_gan_perd}%</b>`;
    }

    //sendMessage
    bot.sendMessage(msg.chat.id, mensajeTicker, {
      parse_mode: "HTML",
    });
  }
});

bot.onText(/\/ticker/, async (msg, match) => {
  //verificar que no escribi /ticker (accion) y solo escribi /ticker
  const comandos_array = match.input.trim().split(" ");
  if (comandos_array.length === 1) {
    bot.sendMessage(
      msg.chat.id,
      `<pre>Recuerda utilizar el comando 
/ticker (ticker_argentino)
Ejemplo: /ticker ypfd</pre>`,
      { parse_mode: "HTML" }
    );
  }
});

//comando /dolar
bot.onText(/\/dolar/, (msg) => {
  Bluelytics.get().then((result) => {
    const { oficial, blue, last_update } = result;
    const [, mes, dia] = last_update.trim().split("T")[0].trim().split("-");
    const [hora, min] = last_update
      .trim()
      .split("T")[1]
      .trim()
      .split(".")[0]
      .trim()
      .split(":");
    bot.sendMessage(
      msg.chat.id,
      `<b>[Oficial]</b> 
Venta: ${oficial.value_sell} ARS // Compra: ${oficial.value_buy} ARS
<b>[Blue]</b>
Venta: ${blue.value_sell} ARS // Compra: ${blue.value_buy} ARS
<u><i>Datos del ${dia}/${mes} -- ${hora}:${min}hs</i></u>
`,
      {
        parse_mode: "HTML",
      }
    );
  });
});

//comando /about para ver informacion acerca del bot
bot.onText(/\/about/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Bot desarrollado por @orra6 - Contacto: rodrigoodz@gmail.com`,
    {
      parse_mode: "HTML",
    }
  );
});

//si el bot es agregado a un grupo -> guardar un registro del chat (id y titulo del grupo)
bot.on("new_chat_members", (msg) => {
  //verifico si el id del "nuevo miembro" coincide con el del bot
  let { id: userID } = msg.new_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  if (String(userID) === bot_id) {
    console.log(
      `Agregaron al bot al grupo [${GroupTITLE}] con id [${GroupID}]`
    );
    //manejo db
    const chats = getListado();
    const guardo = agregar(GroupID, GroupTITLE);
  }
});

//si el bot se ha ido de un grupo -> borrar el registro de ese grupo
bot.on("left_chat_member", (msg) => {
  const { id: userID } = msg.left_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  if (String(userID) === bot_id) {
    console.log(
      `Quitaron al bot del grupo [${GroupTITLE}] con id [${GroupID}]`
    );
    //manejo db
    const borro = borrar(GroupID);
  }
});

//info si ocurre algun tipo de error
bot.on("polling_error", (err) => console.log(err));

//cada 1 minuto, consulta si el mercado esta por abrir o cerrar
setInterval(function () {
  let date = new Date();
  //si no es sabado o domingo
  if (date.getDay() !== 0 && date.getDay() !== 6) {
    if (date.getUTCHours() - 3 === 10 && date.getUTCMinutes() === 55) {
      informeApertura(1);
    }
    if (date.getUTCHours() - 3 === 17 && date.getUTCMinutes() === 55) {
      informeApertura(0);
    }
  }
}, 60000); //60000

//server
app.get("/", function (req, res) {
  res.send(JSON.stringify({ Hello: "World" }));
});
app.listen(port, function () {
  wakeDyno({
    url: process.env.DYNO_URL, // url string
    interval: 60000 * 25, // interval in milliseconds (1 minute in this example)
    startNap: [23, 0, 0, 0], // the time to start nap in UTC, as [h, m, s, ms] (05:00 UTC in this example)
    endNap: [5, 0, 0, 0], // time to wake up again, in UTC (09:59:59.999 in this example)
  }).start();
  console.log(`Escuchando en puerto ${port}`);
});

//TODO podria hacer que al llamar a .ticker img, mande grafico de la accion
//TODO estoy asumiendo que todos los tickers ingresados son argentinos, podria expandirlo a mas paises...
