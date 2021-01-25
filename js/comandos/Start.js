const { getMsgStart } = require("../mensajesBot/mensajesBot");

const comandoStart = (bot, msg) => {
  const msgStart = getMsgStart();
  bot.sendMessage(msg.chat.id, msgStart, { parse_mode: "HTML" });
};

module.exports = {
  comandoStart,
};
