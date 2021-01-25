const iol = require("../../auxiliares/node-iol");
const {
  enviarMensajeBorra2Min,
  enviarMensajeSinBorrar,
} = require("../../mensajesBot/envioMensajes");
const { getMsgErrorTicker } = require("../../mensajesBot/mensajesBot");

const verCotizacion = async (bot, mercado, ticker, msg) => {
  let token = await iol.auth(); //autentificarme
  const descripcion = await iol.getTickerValue(token, mercado, ticker);
  if (descripcion === "Error") {
    enviarMensajeBorra2Min(bot, msg.chat.id, getMsgErrorTicker());
  } else {
    const {
      ultimoPrecio,
      variacion,
      maximo,
      minimo,
      fechaHora,
      cierreAnterior,
    } = descripcion;
    let moneda = "";
    if (mercado == "nYSE") {
      moneda = "US";
    } else if (mercado == "bCBA") {
      moneda = "";
    }
    //fecha de la consulta
    const [, mes, dia] = fechaHora.trim().split("T")[0].trim().split("-");
    const [hora, min] = fechaHora
      .trim()
      .split("T")[1]
      .trim()
      .split(".")[0]
      .trim()
      .split(":");
    //   //fecha actual
    let date = new Date();
    //si es un dia de semana de 11hs a 18hs
    const hora_actual = date.getUTCHours() - 3;
    const dia_actual = date.getDay();
    //Segun el dia y la hora_actual, muestro diferentes mensajes al escribir el comando
    let mensajeTicker = "";
    const variacion_fixed = variacion.toFixed(2);
    const mensaje_accion = `<b>${ticker.toUpperCase()}</b>
Precio Actual: <b>${ultimoPrecio} ${moneda}$</b>
Cierre Anterior: <b>${cierreAnterior} ${moneda}$</b>
Rango día: <b>${minimo} ${moneda}$</b> - <b>${maximo} ${moneda}$</b>
Ganancia/Perdida: <b>${variacion_fixed}%</b>`;
    const mensaje_accion_premercado = `<b>${ticker.toUpperCase()}</b>
Precio Actual: <b>${ultimoPrecio} ${moneda}$</b>
Rango día: <b>${minimo} ${moneda}$</b> - <b>${maximo} ${moneda}$</b>`;
    if (
      hora_actual >= 11 &&
      hora_actual <= 18 &&
      dia_actual !== 0 &&
      dia_actual !== 6
    ) {
      mensajeTicker = `<i>[Datos del ${dia}/${mes} -- ${hora}:${min}hs]</i>
${mensaje_accion}`;
    } else {
      //agregado para mostrar dia anterior si estamos entre las 8 y las 11
      if (hora_actual >= 7 && hora_actual < 11) {
        mensajeTicker = `<i>[Mercado Cerrado. Datos del ${dia - 1}/${mes}]</i>
${mensaje_accion_premercado}`;
      } else {
        //en cualquier otro caso muestro los ultimos datos del mercado
        mensajeTicker = `<i>[Mercado Cerrado. Datos del ${dia}/${mes}]</i>
      ${mensaje_accion}`;
      }
    }
    //envio el mensaje correspondiente
    enviarMensajeSinBorrar(bot, msg.chat.id, mensajeTicker);
  }
};

module.exports = {
  verCotizacion,
};
