//botones enviados al escribir comando /graf ... ...

const botonesLineasYVelas = (bot, mercado, msg, ticker, ruedas, id) => {
  let tickerOutput = "";
  if (mercado == "arg") {
    tickerOutput = `${ticker}.ba`;
  } else {
    tickerOutput = `${ticker}`;
  }
  bot.sendMessage(msg.chat.id, "Seleccionar", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Linea",
            callback_data: JSON.stringify({
              data: "Line",
              sol: `${tickerOutput} ${ruedas}`,
              id: id,
            }),
          },
          {
            text: "Velas",
            callback_data: JSON.stringify({
              data: "V",
              sol: `${tickerOutput} ${ruedas}`,
              id: id,
            }),
          },
        ],
      ],
    },
  });
};

module.exports = {
  botonesLineasYVelas,
};
