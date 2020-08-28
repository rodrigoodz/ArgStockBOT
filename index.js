// Imports
require("dotenv").config();
const express = require("express");
const wakeDyno = require("woke-dyno");
const TelegramBot = require("node-telegram-bot-api");
const Bluelytics = require("node-bluelytics");
const { informeApertura } = require("./js/InformeAperturaCierre");
const { obtenerCotizacion } = require("./js/ControladorTickers");
const { deleteDBFirebase, setDBFirebase } = require("./js/ControladorFirebase");
const {
  logMensajePrivado,
  logMensajeGrupal,
  logAgregadoAGrupo,
  logQuitadoDeGrupo,
} = require("./js/ControladorLogs");

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

//comando /global (enviar mensaje a todos los grupos donde el bot pertenezca, util por si quiero informar algo)
bot.onText(/\/global (.+)/, (msg, match) => {
  if (String(msg.from.id) === process.env.ORRA_ID_PRIV) {
    const chats = getListado();
    const mensaje_global = match[1];
    chats.forEach((chat) => {
      bot.sendMessage(chat.id, mensaje_global, { parse_mode: "HTML" });
    });
  }
});

//para tener un control de los mensajes al bot (envio en chat de telegram y por consola)
bot.on("message", (msg) => {
  if (msg.chat.type === "private") {
    logMensajePrivado(msg);
  } else {
    logMensajeGrupal(msg);
  }
});

//comando /start (funciona en grupos y en mensajes directos)
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>ArgStockBOT</b> es un bot desarrollado por @orra6 y ofrece ciertas caracteristicas relacionadas a la bolsa de valores argentina. Para ver los comandos disponibles,escriba <b>/comandos</b>
    <pre>Funciones:
-Si el bot es agregado a un grupo, este informará el cierre y apertura del mercado argentino con 5 minutos de antelación
-Ver la lista de todas las empresas argentinas que cotizan en bolsa
-Consultar la cotizacion de un empresa argentina en forma particular 
-Consultar el precio del dolar actual utiizando la informacion provista por Bluelytics</pre>`,
    { parse_mode: "HTML" }
  );
});

//ver la lista de comandos disponibles
bot.onText(/\/comandos/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>/tickers</b> -> muestra una lista todos los tickers argentinos que pueden ser consultados
<b>/ticker (ticker_argentino)</b> -> consultar un ticker particular del mercado argentino
<b>/dolar</b> -> obtener precio del dolar (info. de Bluelytics)
<b>/about</b> -> informacion`,
    { parse_mode: "HTML" }
  );
});

//comando /tickers para ver todas las empresas argentinas que cotizan en bolsa
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
</pre>`,
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
    //si accion es un objeto (no retorno mensaje error)

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

    //Segun el dia y la hora, muestro diferentes mensajes al escribir el comando
    let mensajeTicker = "";
    let date = new Date();
    //si es un dia de semana de 11hs a 18hs
    const hora = date.getUTCHours() - 3;
    const dia = date.getDay();
    if (hora >= 11 && hora <= 18 && dia !== 0 && dia !== 6) {
      mensajeTicker = `<i>[Datos de las ${hora_delay}:${min_delay}hs]</i>  
    <b>${accion.nombre}</b>
    Precio Actual: <b>${accion.precio} ${accion.moneda}</b>
    Rango día: <b>${accion.min_dia} ${accion.moneda}</b> - <b>${accion.max_dia} ${accion.moneda}</b>
    Ganancia/Perdida: <b>${porcentaje_gan_perd}%</b>`;
    } else {
      //en cualquier otro caso muestro los ultimos datos del mercado
      mensajeTicker = `<i>[Mercado Cerrado. Ultimos Datos]</i>  
      <b>${accion.nombre}</b>
      Precio Actual: <b>${accion.precio} ${accion.moneda}</b>
      Rango día: <b>${accion.min_dia} ${accion.moneda}</b> - <b>${accion.max_dia} ${accion.moneda}</b>
      Ganancia/Perdida: <b>${porcentaje_gan_perd}%</b>`;
    }

    //envio el mensaje correspondiente
    bot.sendMessage(msg.chat.id, mensajeTicker, {
      parse_mode: "HTML",
    });
  }
});

bot.onText(/\/ticker/, (msg, match) => {
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

//comando /dolar -> utilizo la informacion de Bluelytics
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

//comando /about para ver información acerca del bot
bot.onText(/\/about/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Bot desarrollado por @orra6
Contacto: rodrigoodz@gmail.com
Repositorio: <a href="https://github.com/rodrigoodz/ArgStockBOT">ArgStockBot - GitHub</a>
Donar: <a  href="https://www.mercadopago.com.ar/checkout/v1/redirect/1b830039-3a08-46c5-930a-23a867a29cae/error/?preference-id=83617641-ae4ea1f1-0674-4ddb-bde5-227c20187147&p=7d5266ef7912b9222ebede199e94543d">MercadoPago</a> - <a  href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=WQWFXA3P3NP8E&currency_code=USD&source=url">Paypal</a>`,
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }
  );
});

//si el bot es agregado a un grupo -> guardar un registro del chat (id y titulo del grupo)
bot.on("new_chat_members", (msg) => {
  //verifico si el id del "nuevo miembro" coincide con el del bot
  let { id: userID } = msg.new_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  if (String(userID) === bot_id) {
    logAgregadoAGrupo(GroupID, GroupTITLE);
    //manejo db
    setDBFirebase(String(GroupID), GroupTITLE);
  }
});

//si el bot se ha ido de un grupo -> borrar el registro de ese grupo
bot.on("left_chat_member", (msg) => {
  const { id: userID } = msg.left_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  if (String(userID) === bot_id) {
    logQuitadoDeGrupo(GroupID, GroupTITLE);
    //manejo db
    deleteDBFirebase(String(GroupID));
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
    url: process.env.DYNO_URL,
    interval: 60000 * 25,
    startNap: [4, 0, 0, 0],
    endNap: [10, 0, 0, 0],
    //'siesta' de 4am a 10am (UTC)
  }).start();
  console.log(`Escuchando en puerto ${port}`);
});
