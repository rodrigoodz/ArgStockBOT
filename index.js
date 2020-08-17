// Imports
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const config = require("./config/config.json");
const { informeApertura } = require("./InformeAperturaCierre");

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

//si el bot es agrego a un grupo
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
// bot.on("polling_error", (err) => console.log(err));

//cada 1 minuto, consulta si el mercado esta por abrir o cerrar
//TODO buscar una forma mas eficiente de realizar esto
setInterval(function () {
  console.log(chats);
  let date = new Date();
  //si no es sabado o domingo
  if (date.getDay() !== 0 && date.getDay() !== 7) {
    if (date.getHours() === 13 && date.getMinutes() === 02) {
      informeApertura(chats, 1);
    }
    if (date.getHours() === 17 && date.getMinutes() === 55) {
      informeApertura(chats, 0);
    }
  }
}, 60000);
