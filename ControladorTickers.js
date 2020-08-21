//imports
const si = require("stock-info");

const obtenerCotizacion = (ticker) => {
  //recibe un ticker por ejemplo:[ypfd], y tiene que emparejarlo con el ticker que utiliza Yahoo Finance API -> [ypfd.ba]
  const ticker_argentino = 1;
  if (ticker_argentino === 1) {
    ticker = ticker.trim().concat(".ba");
    const accion = si
      .getSingleStockInfo(ticker)
      .then((data) => {
        console.log(data);
        return {
          precio: data.regularMarketPrice,
          nombre: data.longName,
          moneda: data.currency,
          delay: data.sourceInterval,
          max_dia: data.regularMarketDayHigh,
          min_dia: data.regularMarketDayLow,
          cambio_cotizacion: data.regularMarketChange,
        };
      })
      .catch((err) => {
        // console.log(err);
        return "El ticker solicitado no existe, escriba el comando /tickers para ver la lista de tickers";
      });
    return accion;
  }
};

module.exports = { obtenerCotizacion };
