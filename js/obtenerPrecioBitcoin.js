const BitcoinValue = require("coindesk.js");

const getPrecioBitcoinUsd = async () => {
  let btc;
  await BitcoinValue.current("USD")
    .then((data) => {
      const tiempo = new Date(data.time.updatedISO);
      const precio = data.bpi.USD.rate.replace(",", "");
      btc = { tiempo, precio };
    })
    .catch((err) => {
      console.log(err);
    });
  return btc;
};

module.exports = {
  getPrecioBitcoinUsd,
};
