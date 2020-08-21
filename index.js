// Imports
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { informeApertura } = require("./InformeAperturaCierre");
const { obtenerCotizacion } = require("./ControladorTickers");
const { getListado, agregar, borrar } = require("./ControladorRegistroChats");

// node-telegram-bot-api
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

//bot_id
const bot_id = process.env.BOT_ID;

//para tener un control en consola de los mensajes
bot.on("message", (msg) => {
  if (msg.chat.type === "private") {
    console.log(`${msg.from.username} te escribio en privado`);
  } else {
    console.log(`${msg.from.username} te escribio en un grupo`);
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
-Consultar la cotizacion de un accion argentina de forma particular</pre>
`,
    { parse_mode: "HTML" }
  );
});

//ver la lista de comandos disponibles
bot.onText(/\/comandos/, async (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>/tickers</b> -> muestra una lista todos los tickers argentinos que pueden ser consultados
<b>/ticker (ticker_argentino)</b> -> consultar un ticker particular del mercado argentino
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
    bot.sendMessage(
      msg.chat.id,
      `<b>El precio actual de ${accion.simbolo} es de ${accion.precio} ${accion.moneda}</b>`,
      {
        parse_mode: "HTML",
      }
    );
  }
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
    console.log("Te agregaron al grupo -> " + GroupTITLE);
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
    console.log("Te fuiste del grupo -> " + GroupTITLE);
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
    if (date.getHours() === 10 && date.getMinutes() === 55) {
      informeApertura(1);
    }
    if (date.getHours() === 17 && date.getMinutes() === 55) {
      informeApertura(0);
    }
  }
}, 60000); //60000

//TODO podria hacer que al llamar a .ticker img, mande grafico de la accion
//TODO estoy asumiendo que todos los tickers ingresados son argentinos, podria expandirlo a mas paises...
