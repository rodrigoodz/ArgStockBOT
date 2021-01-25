const {
  enviarMensajeBorra2Min,
  enviarMensajeSinBorrar,
} = require("../../mensajesBot/envioMensajes");
const iol = require("../../auxiliares/node-iol");

const verOpciones = async (bot, tipo, mercado, ticker, msg) => {
  let token = await iol.auth(); //autentificarme
  const descripcion = await iol.getOptions(token, mercado, ticker);

  if (descripcion === "Error") {
    enviarMensajeBorra2Min(bot, msg.chat.id, getMsgErrorOpciones());
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
    enviarMensajeSinBorrar(bot, msg.chat.id, mensajeOpciones);
  }
};

module.exports = {
  verOpciones,
};
