var yahooFinance = require("yahoo-finance");

const getDataHistoricaLine = async (simbolo, desde, hasta) => {
  let precios = [];
  let fechas = [];
  let volumen = [];
  await yahooFinance.historical(
    {
      symbol: simbolo,
      from: desde,
      to: hasta,
      period: "d", // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    },
    function (err, quotes) {
      if (err) {
        console.log(err);
      } else {
        quotes.forEach((element) => {
          precios.push(element.close);
          fechas.push(element.date.toISOString().split("T")[0]);
          volumen.push(element.volume);
        });
      }
    }
  );
  //la api me da los datos de adelante para atras, los invierto
  precios = precios.reverse();
  fechas = fechas.reverse();
  volumen = volumen.reverse();

  return [precios, fechas, volumen];
};

const getDataHistoricaCandleStick = async (simbolo, desde, hasta) => {
  let precios = [];
  let fechas = [];
  let volumen = [];
  await yahooFinance.historical(
    {
      symbol: simbolo,
      from: desde,
      to: hasta,
      period: "d", // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    },
    function (err, quotes) {
      if (err) {
        console.log(err);
      } else {
        quotes.forEach((element) => {
          volumen.push(element.volume);
          precios.push({
            open: element.open,
            high: element.high,
            low: element.low,
            close: element.close,
          });
          fechas.push(element.date.toISOString().split("T")[0]);
        });
      }
    }
  );
  //la api me da los datos de adelante para atras, los invierto
  precios = precios.reverse();
  fechas = fechas.reverse();
  volumen = volumen.reverse();
  return [precios, fechas, volumen];
};

module.exports = {
  getDataHistoricaLine,
  getDataHistoricaCandleStick,
};
