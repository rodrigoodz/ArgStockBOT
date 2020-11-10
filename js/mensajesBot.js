const about = `Bot desarrollado por @orra6
Contacto: rodrigoodz@gmail.com
Repositorio: <a href="https://github.com/rodrigoodz/ArgStockBOT">ArgStockBot - GitHub</a>
Donar: <a  href="https://www.mercadopago.com.ar/checkout/v1/redirect/1b830039-3a08-46c5-930a-23a867a29cae/error/?preference-id=83617641-ae4ea1f1-0674-4ddb-bde5-227c20187147&p=7d5266ef7912b9222ebede199e94543d">MercadoPago</a> - <a  href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=WQWFXA3P3NP8E&currency_code=USD&source=url">Paypal</a>`;

const start = `<b>ArgStockBOT</b> es un bot desarrollado por @orra6 y ofrece ciertas caracteristicas relacionadas a la bolsa de valores argentina. Para ver todos comandos disponibles,escriba <b>/comandos</b>
<pre>Funciones:
-Si el bot es agregado a un grupo, este informará el cierre y apertura del mercado argentino con 5 minutos de antelación
-Ver la lista de las empresas argentinas que cotizan en bolsa
-Consultar la cotización de una empresa argentina en forma particular 
-Consultar el precio del dolar actual utilizando la informacion provista por Bluelytics</pre>`;

const comandos = `<b>/tickers</b> -> muestra una lista de todos los tickers argentinos del panel general
<b>/ticker (ticker_argentino)</b> -> consultar un ticker particular del mercado argentino
<b>/dolar</b> -> obtener precio del dolar (info. de Bluelytics)
<b>/about</b> -> informacion`;

const tickers_arg = `<b>Tickers Argentinos</b>
<pre>
ALUA - Aluminio Argentino SA

BBAR - Banco Francés SA

BMA - Banco Macro SA

BYMA - Bolsas y Mercados Argentinos SA

CEPU - Central Puerto SA 

COME - Sociedad Comercial del Plata SA

CRES - Cresud SA

CVH - Cablevision Holding SA

EDN - Edenor

GGAL - Grupo Financiero Galicia

MIRG - Mirgor

PAMP - Pampa Energía

SUPV - Grupo Supervielle SA

TECO2 - Telecom Argentina SA

TGNO4 - Transportadora de Gas del Norte SA

TGSU2 - Transportadora de Gas del Sur

TRAN - Transener

TXAR - Ternium Argentina SA

VALO - Grupo Financiero Valores SA

YPFD - YPF SA
</pre>`;

const error_ticker = `El ticker solicitado no existe o hubo un error, escriba el comando /tickers para ver la lista de tickers`;

const error_opciones = `No hay opciones para el ticker solicitado o hubo un error`;

const mensaje_ayuda_ticker = `<pre>Recuerda utilizar el comando 
/ticker (ticker_argentino)
Ejemplo: /ticker ypfd</pre>`;

const getMsgAbout = () => {
  return about;
};

const getMsgStart = () => {
  return start;
};

const getMsgComandos = () => {
  return comandos;
};

const getMsgTickersArg = () => {
  return tickers_arg;
};

const getMsgErrorTicker = () => {
  return error_ticker;
};

const getMsgErrorOpciones = () => {
  return error_opciones;
};

const getMsgAyudaTicker = () => {
  return mensaje_ayuda_ticker;
};

module.exports = {
  getMsgAbout,
  getMsgStart,
  getMsgComandos,
  getMsgTickersArg,
  getMsgErrorTicker,
  getMsgAyudaTicker,
  getMsgErrorOpciones,
};
