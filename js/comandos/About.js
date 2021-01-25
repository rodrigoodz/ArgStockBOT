const { getMsgAbout } = require("../mensajesBot/mensajesBot");

const comandoAbout = (bot, msg) => {
  const msgAbout = getMsgAbout();
  bot.sendMessage(msg.chat.id, msgAbout, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
};

module.exports = {
  comandoAbout,
};
