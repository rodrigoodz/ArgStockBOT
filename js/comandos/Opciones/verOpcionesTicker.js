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
${aux}
Variacion: ${e.cotizacion.variacion}% - Ult. Precio: ${e.cotizacion.ultimoPrecio}$`;
      }
    });
    mensajeOpciones += "";
    //si el mensaje sobrepasa los 4096 caracteres, divido en dos mensajes
    if (mensajeOpciones.length > 4096) {
      const Mensaje1 = mensajeOpciones.slice(0, mensajeOpciones.length / 2);
      const Mensaje2 = mensajeOpciones.slice(mensajeOpciones.length / 2, -1);
      enviarMensajeSinBorrar(bot, msg.chat.id, Mensaje1);
      enviarMensajeSinBorrar(bot, msg.chat.id, Mensaje2);
    } else {
      enviarMensajeSinBorrar(bot, msg.chat.id, mensajeOpciones);
    }
  }
};

module.exports = {
  verOpciones,
};
