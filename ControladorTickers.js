//imports
const si = require("stock-info");

const obtenerCotizacion = (ticker) => {
  //recibe un ticker por ejemplo:[ypfd], y tiene que emparejarlo con el ticker que utiliza Yahoo Finance API -> [ypfd.ba]
  const ticker_argentino = 1;
  //TODO estoy asumiendo que todos los tickers ingresados son argentinos, podria expandirlo a mas paises...
  if (ticker_argentino === 1) {
    ticker = ticker.trim().concat(".ba");
    const accion = si
      .getSingleStockInfo(ticker)
      .then((data) => {
        return {
          precio: data.regularMarketPrice,
          simbolo: data.symbol,
          nombre: data.longName,
          moneda: data.currency,
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
