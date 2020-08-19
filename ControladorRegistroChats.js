const fs = require("fs");

let chats_db = [{ id: 0, title: "test" }];

const guardarDB = () => {
  let data = JSON.stringify(chats_db);

  fs.writeFile("db/data.json", data, (err) => {
    if (err) throw err;
    console.log("El archivo ha sido guardado con exito!");
  });
};

const cargarDB = () => {
  try {
    chats_db = require("./db/data.json");
  } catch (error) {
    chats_db = [];
  }
};

const getListado = () => {
  cargarDB();
  return chats_db;
};

const agregar = (GroupID, GroupTITLE) => {
  cargarDB();
  let index = chats_db.findIndex((chat) => chat.id === GroupID);
  if (index === -1) {
    let chat_nuevo = {
      id: GroupID,
      title: GroupTITLE,
    };
    chats_db.push(chat_nuevo);
    guardarDB();
    return true;
  } else {
    return false;
  }
};

const borrar = (GroupID) => {
  cargarDB();
  let index = chats_db.findIndex((chat) => chat.id === GroupID);
  if (index >= 0) {
    chats_db.splice(index, 1);
    guardarDB();
    return true;
  } else {
    return false;
  }
};
module.exports = {
  getListado,
  agregar,
  borrar,
};
