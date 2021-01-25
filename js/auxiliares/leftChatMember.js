const { deleteDBFirebase } = require("./ControladorFirebase");
const { logQuitadoDeGrupo } = require("../logsMensajes/ControladorLogs");

const leftChatMember = (bot, msg) => {
  const bot_id = process.env.BOT_ID;
  const { id: userID } = msg.left_chat_member;
  const { id: GroupID, title: GroupTITLE } = msg.chat;
  //verifico si ha sido eliminado el bot
  if (String(userID) === bot_id) {
    logQuitadoDeGrupo(GroupID, GroupTITLE);
    deleteDBFirebase(String(GroupID));
  }
};

module.exports = {
  leftChatMember,
};
