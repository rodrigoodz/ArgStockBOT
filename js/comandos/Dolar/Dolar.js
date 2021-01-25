const { getDataDolar } = require("./webscrapingDolar");

const comandoDolar = async (bot, msg) => {
  bot.sendMessage(msg.chat.id, "Obteniendo informacion...").then((mensaje) => {
    setTimeout(() => {
      bot.deleteMessage(mensaje.chat.id, mensaje.message_id);
    }, 2000);
  });
  try {
    const dataDolar = await getDataDolar();

    if (dataDolar) {
      const { compra: cOficial, venta: vOficial } = dataDolar.oficial;
      const { compra: cBlue, venta: vBlue } = dataDolar.blue;
      const { compra: cBolsa, venta: vBolsa } = dataDolar.bolsa;
      const { compra: cCCL, venta: vCCL } = dataDolar.ccl;
      const { venta: vsolidario } = dataDolar.solidario;
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
Venta: ${vsolidario} ARS 
<u>${dataDolar.hora_refresh}</u>`,
        {
          parse_mode: "HTML",
        }
      );
    } else {
      enviarMensajeBorra1Min(
        bot,
        msg.chat.id,
        "Hubo un error al obtener la informacion"
      );
    }
  } catch (error) {
    console.log(error);
    enviarMensajeBorra1Min(bot, msg.chat.id, getMsgErrorInfo());
  }
};

module.exports = {
  comandoDolar,
};
