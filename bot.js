const TelegramBot = require("node-telegram-bot-api");
const {
  enviarMensajeGlobal,
} = require("./js/comandos/MensajesGlobales/MensajesGlobales");
const { comandoAbout } = require("./js/comandos/About");
const { comandoStart } = require("./js/comandos/Start");
const { comandoComandos } = require("./js/comandos/Comandos");
const { comandoTickers } = require("./js/comandos/Tickers");
const { callbackQuery } = require("./js/auxiliares/callbackQuery");
const { newChatMember } = require("./js/auxiliares/newChatMember");
const { leftChatMember } = require("./js/auxiliares/leftChatMember");
const {
  comandoForex,
  comandoAyudaForex,
} = require("./js/comandos/Forex/Forex");
const { comandoBTC } = require("./js/comandos/Btc/Btc");
const { comandoAyudaIdea, comandoIdea } = require("./js/comandos/Idea/Idea");
const { comandoGraf, comandoAyudaGraf } = require("./js/comandos/Graf/Graf");
const { comandoDolar } = require("./js/comandos/Dolar/Dolar");
const {
  comandoTicker,
  comandoAyudaTicker,
} = require("./js/comandos/Ticker/Ticker");
const {
  comandoAyudaOpciones,
  comandoOpciones,
} = require("./js/comandos/Opciones/Opciones");
const { logMensajes } = require("./js/logsMensajes/logMensajes");

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

//Mensaje de ayuda al escribir /graf
bot.onText(/\/graf/, (msg, match) => {
  comandoAyudaGraf(bot, msg, match);
});

bot.onText(/\/graf (.+)/, (msg, match) => {
  comandoGraf(bot, msg, match);
});

//Mensaje de ayuda al escribir /idea
bot.onText(/\/idea/, (msg, match) => {
  comandoAyudaIdea(bot, msg, match);
});

//obtener ultima idea de tradingview para un ticker dado
bot.onText(/\/idea (.+)/, (msg, match) => {
  comandoIdea(bot, msg, match);
});

//Mensaje de ayuda al escribir /forex
bot.onText(/\/forex/, (msg, match) => {
  comandoAyudaForex(bot, msg, match);
});

//TODO agregar comando a /comandos y /start
bot.onText(/\/forex (.+)/, (msg, match) => {
  comandoForex(bot, msg, match);
});

bot.onText(/\/btc/, (msg) => {
  comandoBTC(bot, msg);
});

//comando /global (enviar mensaje a todos los grupos donde el bot pertenezca, util por si quiero informar algo)
bot.onText(/\/global (.+)/, (msg, match) => {
  enviarMensajeGlobal(bot, msg, match);
});

//para tener un control de los mensajes al bot (envio en chat de telegram y por consola)
bot.on("message", (msg) => {
  logMensajes(bot, msg);
});

//Comando /start (funciona en grupos y en mensajes directos)
bot.onText(/\/start/, (msg) => {
  comandoStart(bot, msg);
});

//Ver lista de comandos disponibles
bot.onText(/\/comandos/, (msg) => {
  comandoComandos(bot, msg);
});

//Comando /tickers para ver todas las empresas argentinas que cotizan en bolsa
bot.onText(/\/tickers/, (msg) => {
  comandoTickers(bot, msg);
});

bot.on("callback_query", async (accionboton) => {
  callbackQuery(bot, accionboton);
});

//Mensaje de ayuda al escribir /ticker
bot.onText(/\/ticker/, (msg, match) => {
  comandoAyudaTicker(bot, msg, match);
});

//comando /ticker (ticker_accion) para ver la cotizacion actual de un ticker particular
bot.onText(/\/ticker (.+)/, (msg, match) => {
  comandoTicker(bot, msg, match);
});

//Mensaje de ayuda al escribir /opciones
bot.onText(/\/opciones/, (msg, match) => {
  comandoAyudaOpciones(bot, msg, match);
});

//Ver opciones "call y put" de algun ticker
bot.onText(/\/opciones (.+)/, (msg, match) => {
  comandoOpciones(bot, msg, match);
});

//Comando /dolar -> utilizo la informacion de Bluelytics
bot.onText(/\/dolar/, async (msg) => {
  comandoDolar(bot, msg);
});

//comando /about para ver información acerca del bot
bot.onText(/\/about/, (msg) => {
  comandoAbout(bot, msg);
});

//Si el bot es agregado a un grupo -> guardar un registro del chat (id y titulo del grupo)
bot.on("new_chat_members", (msg) => {
  newChatMember(bot, msg);
});

//Si el bot se ha ido/borrado de un grupo -> borrar el registro de ese grupo
bot.on("left_chat_member", (msg) => {
  leftChatMember(bot, msg);
});

//console.log() si ocurre algun tipo de error
bot.on("polling_error", (err) => console.log(err));
