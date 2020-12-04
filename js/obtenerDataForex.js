const axios = require("axios");

const getDataForex = async (divisas) => {
  let res = await axios.get(
    `https://www.freeforexapi.com/api/live?pairs=${divisas}`
  );
  const { rate, timestamp } = res.data.rates[divisas];

  return {
    rate,
    timestamp,
  };
};

module.exports = {
  getDataForex,
};
