// Imports
require("dotenv").config();
require("./bot");
const express = require("express");
const wakeDyno = require("woke-dyno");
const {
  informeApertura,
} = require("./js/comandos/MensajesGlobales/InformeAperturaCierre");

//server
const port = process.env.PORT || 3000;
const app = express();

app.get("/", function (req, res) {
  res.send(JSON.stringify({ Hello: "World" }));
});

app.listen(port, function () {
  wakeDyno({
    url: process.env.DYNO_URL,
    interval: 60000 * 25,
    startNap: [4, 0, 0, 0],
    endNap: [10, 0, 0, 0],
    //descanso de 4am a 10am (UTC)
  }).start();
  console.log(`Escuchando en puerto ${port}`);
});

//Cada 1 minuto, consulta si el mercado esta por abrir o cerrar
setInterval(function () {
  let date = new Date();
  //verifico si no es sabado o domingo
  if (date.getDay() !== 0 && date.getDay() !== 6) {
    //verifico si esta por abrir o cerrar el mercado
    if (date.getUTCHours() - 3 === 10 && date.getUTCMinutes() === 55) {
      informeApertura(1);
    }
    if (date.getUTCHours() - 3 === 16 && date.getUTCMinutes() === 55) {
      informeApertura(0);
    }
  }
}, 60000); //60000
