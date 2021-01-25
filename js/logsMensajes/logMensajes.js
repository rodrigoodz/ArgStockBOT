const { logMensajePrivado, logMensajeGrupal } = require("./ControladorLogs");

const logMensajes = (bot, msg) => {
  if (msg.chat.type === "private") {
    logMensajePrivado(msg);
  } else {
    logMensajeGrupal(msg);
  }
};

module.exports = {
  logMensajes,
};
