const { enviarMensajeBorra1Min } = require("../../mensajesBot/envioMensajes");
const {
  getMsgAyudaForex,
  getMsgErrorForex,
} = require("../../mensajesBot/mensajesBot");
const { es_forex } = require("../Ticker/tipoTicker");
const { getDataForex } = require("./obtenerDataForex");

const comandoAyudaForex = (bot, msg, match) => {
  const comandos_array = match.input.trim().split(" ");
  if (comandos_array.length === 1 && comandos_array[0] === "/forex") {
    enviarMensajeBorra1Min(bot, msg.chat.id, getMsgAyudaForex());
  }
};

const comandoForex = async (bot, msg, match) => {
  const divisas = match[1].split(" ")[0];
  try {
    const forex = es_forex(divisas);
    if (forex) {
      const dataForex = await getDataForex(divisas.toUpperCase());
      const { rate, timestamp } = dataForex;

      const date = new Date(timestamp * 1000);

      date.setHours(date.getUTCHours() - 3);
      let mes;
      date.getUTCMonth() + 1 < 10
        ? (mes = "0" + (date.getUTCMonth() + 1))
        : (mes = date.getUTCMonth() + 1);
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
        `<b>[${divisas.toUpperCase()}]</b> 
Precio: ${rate} USD
<u><i>Datos del ${dia}/${mes} -- ${hora}:${min}hs</i></u>`,
        {
          parse_mode: "HTML",
        }
      );
    } else {
      enviarMensajeBorra1Min(bot, msg.chat.id, getMsgErrorForex());
    }
  } catch (error) {
    console.log(error);
    enviarMensajeBorra1Min(bot, msg.chat.id, getMsgErrorInfo());
  }
};

module.exports = {
  comandoAyudaForex,
  comandoForex,
};
