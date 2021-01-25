const TelegramBot = require("node-telegram-bot-api");
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

//voy a manejar los logs que se envian en privado/grupo hacia el grupo ArgStockBotLOGS

const logMensajePrivado = (msg) => {
  if (msg.photo) {
    bot.sendMessage(
      process.env.ORRA_ID,
      `<b>${msg.from.first_name}</b> envio una imagen por privado`,
      { parse_mode: "HTML" }
    );
    console.log(`${msg.from.first_name} envio una imagen por privado`);
  } else {
    bot.sendMessage(
      process.env.ORRA_ID,
      `<b>${msg.from.first_name}</b> escribio en privado "${msg.text}"`,
      { parse_mode: "HTML" }
    );
    console.log(`${msg.from.first_name} escribio en privado "${msg.text}"`);
  }
};

const logMensajeGrupal = (msg) => {
  //agregado a grupo?
  if (
    msg.new_chat_member &&
    String(msg.new_chat_member.id) === process.env.BOT_ID
  ) {
    bot.sendMessage(
      process.env.ORRA_ID,
      `<b>${msg.from.first_name}</b> agregó el bot al grupo [${msg.chat.title}] `,
      { parse_mode: "HTML" }
    );
  } else if (
    //eliminado de grupo?
    msg.left_chat_member &&
    String(msg.left_chat_member.id) === process.env.BOT_ID
  ) {
    bot.sendMessage(
      process.env.ORRA_ID,
      `<b>${msg.from.first_name}</b> quitó al bot del grupo [${msg.chat.title}] `,
      { parse_mode: "HTML" }
    );
  } else {
    //cualquier otro tipo de mensaje en grupo
    if (msg.photo) {
      bot.sendMessage(
        process.env.ORRA_ID,
        `<b>${msg.from.first_name}</b> le mando una imagen en un grupo`,
        { parse_mode: "HTML" }
      );
      console.log(`${msg.from.first_name} le mando una imagen en un grupo`);
    } else if (!msg.new_chat_member && !msg.left_chat_member) {
      bot.sendMessage(
        process.env.ORRA_ID,
        `<b>${msg.from.first_name}</b> le escribio en un grupo "${msg.text}"`,
        { parse_mode: "HTML" }
      );
      console.log(
        `${msg.from.first_name} le escribio en un grupo "${msg.text}"`
      );
    }
  }
};

const logAgregadoAGrupo = (GroupID, GroupTITLE) => {
  console.log(`Agregaron al bot al grupo [${GroupTITLE}] con id [${GroupID}]`);
};

const logQuitadoDeGrupo = (GroupID, GroupTITLE) => {
  console.log(`Quitaron al bot del grupo [${GroupTITLE}] con id [${GroupID}]`);
};

module.exports = {
  logMensajePrivado,
  logMensajeGrupal,
  logAgregadoAGrupo,
  logQuitadoDeGrupo,
};
