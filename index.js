// Imports
require("dotenv").config();

const config = require("./config/config.json");
const TelegramBot = require("node-telegram-bot-api");
const { informeApertura } = require("./InformeAperturaCierre");
const { obtenerCotizacion } = require("./ControladorTickers");

// node-telegram-bot-api
const token = config.token;
const bot = new TelegramBot(token, { polling: true });

//db
let chats = [];

//bot_id
const bot_id = config.bot_id;

//comando /start (funciona en grupos y mp)
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>ArgStockBOT</b> es un bot desarrollado por @orra6 y ofrece ciertas caracteristicas relacionadas a la bolsa de valores
    <pre>Funciones:
-Informa apertura y cierre de la bolsa de valores
-Comando .{ticker} para solicitar la cotizacion de un accion particular</pre>`,
    { parse_mode: "HTML" }
  );
});

//TODO agregar comando que permita ver la lista de todos los tickers
bot.onText(/\.tickers/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>Tickers Argentinos[BULLMARKET]</b>
<pre>.ALUA - Aluminio Argentino SA
.BBAR - BBVA Banco Francés S.A.
.BMA - Banco Macro S.A.
.BYMA - Bolsas y Mercados Argentinos S.A.
.CEPU - Central Puerto S.A. 
.COME - Sociedad Comercial del Plata S.A.
.CRES - Cresud S.A.
.CVH - CABLEVISIÓN HOLDING S.A.
.EDN - EDENOR
.GGAL - Grupo Financiero Galicia
.MIRG - Mirgor SACIFIA
.PAMP - Pampa Energía
.SUPV - Grupo Supervielle SA
.TECO2 - TELECOM ARGENTINA SA
.TGNO4 - Transportadora de Gas del Norte S.A.
.TGSU2 - Transportadora de Gas del Sur
.TRAN - Transener
.TXAR - Ternium Argentina SA
.VALO - GRUPO FINANCIERO VALORES S.A.
.YPFD - YPF S.A.
</pre>
  `,
    {
      parse_mode: "HTML",
    }
  );
});

bot.onText(/\.ticket/, async (msg) => {
  let precio = await obtenerCotizacion("YPFD.BA");
  console.log("PRECIOOO: ", precio);
});

//TODO llamar a controladorTickers y retornar el precio actual

//si el bot se agrego a un grupo
bot.on("new_chat_members", (msg) => {
  //verifico si el id del "nuevo miembro" coincide con el del bot
  const { id: userID } = msg.new_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  if (userID === bot_id) {
    console.log("Te agregaron al grupo -> " + GroupTITLE);
    //si fue agregado el bot, guardo el id del grupo
    chats.push({ title: GroupTITLE, id: GroupID });
  }
});

//si el bot abandono (es eliminado) de un grupo
bot.on("left_chat_member", (msg) => {
  const { id } = msg.left_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  if (id === bot_id) {
    console.log("Te fuiste del grupo -> " + GroupTITLE);
  }
  chats = chats.filter((chat) => {
    return chat.id !== GroupID;
  });
  console.log(chats);
});

//info si ocurre algun tipo de error
bot.on("polling_error", (err) => console.log(err));

//cada 1 minuto, consulta si el mercado esta por abrir o cerrar
//TODO buscar una forma mas eficiente de realizar esto
setInterval(function () {
  console.log("Chats  -> ", chats);
  let date = new Date();
  //si no es sabado o domingo
  if (date.getDay() !== 0 && date.getDay() !== 6) {
    if (date.getHours() === 10 && date.getMinutes() === 55) {
      informeApertura(chats, 1);
    }
    if (date.getHours() === 17 && date.getMinutes() === 55) {
      informeApertura(chats, 0);
    }
  }
}, 60000); //60000

//TODO buscar alguna API para obtener cotizacion en tiempo real
//TODO crear un archivo .json para manejar los registro de chats, o usar firebase
//TODO podria hacer que al llamar a .ticker img, mande grafico de la accion
