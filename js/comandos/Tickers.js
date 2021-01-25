const comandoTickers = (bot, msg) => {
  bot.sendMessage(msg.chat.id, "Seleccionar", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "MERVAL",
            callback_data: JSON.stringify({
              data: "M",
              sol: "0",
              id: msg.from.id,
            }),
          },
          {
            text: "NYSE",
            callback_data: JSON.stringify({
              data: "usa",
              sol: "0",
              id: msg.from.id,
            }),
          },
          {
            text: "BONOS",
            callback_data: JSON.stringify({
              data: "bonos",
              sol: "0",
              id: msg.from.id,
            }),
          },
          {
            text: "FCIs",
            callback_data: JSON.stringify({
              data: "fci",
              sol: "0",
              id: msg.from.id,
            }),
          },
        ],
      ],
    },
  });
};

module.exports = {
  comandoTickers,
};
