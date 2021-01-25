const { getPrecioBitcoinUsd } = require("./obtenerPrecioBitcoin");

const comandoBTC = async (bot, msg) => {
  try {
    const { tiempo, precio } = await getPrecioBitcoinUsd();
    tiempo.setHours(tiempo.getUTCHours() - 3);
    let mes;
    tiempo.getUTCMonth() + 1 < 10
      ? (mes = "0" + (tiempo.getUTCMonth() + 1))
      : (mes = tiempo.getUTCMonth() + 1);
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
<u><i>Datos del ${dia}/${mes} -- ${hora}:${min}hs</i></u>`,
      {
        parse_mode: "HTML",
      }
    );
  } catch (error) {
    console.log(error);
    enviarMensajeBorra1Min(msg.chat.id, getMsgErrorInfo());
  }
};

module.exports = {
  comandoBTC,
};
