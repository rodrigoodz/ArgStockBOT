//imports
const si = require("stock-info");

const tickersARG = [
  {
    ticker: "ALUA",
    yahoo_ticker: "ALUA.BA",
  },
  {
    ticker: "BBAR",
    yahoo_ticker: "BBAR.BA",
  },
  {
    ticker: "BMA",
    yahoo_ticker: "BMA.BA",
  },
  {
    ticker: "BYMA",
    yahoo_ticker: "BYMA.BA",
  },
  {
    ticker: "CEPU",
    yahoo_ticker: "CEPU.BA",
  },
  {
    ticker: "COME",
    yahoo_ticker: "COME.BA",
  },
  {
    ticker: "CRES",
    yahoo_ticker: "CRES.BA",
  },
  {
    ticker: "CVH",
    yahoo_ticker: "CVH.BA",
  },
  {
    ticker: "EDN",
    yahoo_ticker: "EDN.BA",
  },
  {
    ticker: "GGAL",
    yahoo_ticker: "GGAL.BA",
  },
  {
    ticker: "MIRG",
    yahoo_ticker: "MIRG.BA",
  },
  {
    ticker: "PAMP",
    yahoo_ticker: "PAMP.BA",
  },
  {
    ticker: "SUPV",
    yahoo_ticker: "SUPV.BA",
  },
  {
    ticker: "TECO2",
    yahoo_ticker: "TECO2.BA",
  },
  {
    ticker: "TGNO4",
    yahoo_ticker: "TGNO4.BA",
  },
  {
    ticker: "TGSU2",
    yahoo_ticker: "TGSU2.BA",
  },
  {
    ticker: "TRAN",
    yahoo_ticker: "TRAN.BA",
  },
  {
    ticker: "TXAR",
    yahoo_ticker: "TXAR.BA",
  },
  {
    ticker: "VALO",
    yahoo_ticker: "VALO.BA",
  },
  {
    ticker: "YPFD",
    yahoo_ticker: "YPFD.BA",
  },
];

const obtenerCotizacion = (ticker) => {
  let precio = si
    .getSingleStockInfo("YPFD.BA")
    .then((data) => {
      return data.regularMarketPrice;
    })
    .catch((err) => {
      console.log(err);
    });
  return precio;
};

module.exports = { obtenerCotizacion };
