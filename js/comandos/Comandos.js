const { getMsgComandos } = require("../mensajesBot/mensajesBot");

const comandoComandos = (bot, msg) => {
  const msgComandos = getMsgComandos();
  bot.sendMessage(msg.chat.id, msgComandos, { parse_mode: "HTML" });
};

module.exports = {
  comandoComandos,
};
