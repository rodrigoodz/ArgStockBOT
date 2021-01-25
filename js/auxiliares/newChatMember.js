const { setDBFirebase } = require("./ControladorFirebase");
const { logAgregadoAGrupo } = require("../logsMensajes/ControladorLogs");

const newChatMember = (bot, msg) => {
  const bot_id = process.env.BOT_ID;
  let { id: userID } = msg.new_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  //verifico si ha sido agregado el bot
  if (String(userID) === bot_id) {
    logAgregadoAGrupo(GroupID, GroupTITLE);
    setDBFirebase(String(GroupID), GroupTITLE);
  }
};

module.exports = {
  newChatMember,
};
