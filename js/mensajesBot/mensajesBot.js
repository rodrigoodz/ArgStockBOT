const about = `Bot desarrollado por @orra6
Contacto: rodrigoodz@gmail.com
Repositorio: <a href="https://github.com/rodrigoodz/ArgStockBOT">ArgStockBot - GitHub</a>
Donar: <a  href="https://www.mercadopago.com.ar/checkout/v1/redirect/1b830039-3a08-46c5-930a-23a867a29cae/error/?preference-id=83617641-ae4ea1f1-0674-4ddb-bde5-227c20187147&p=7d5266ef7912b9222ebede199e94543d">MercadoPago</a> - <a  href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=WQWFXA3P3NP8E&currency_code=USD&source=url">Paypal</a>`;

const start = `<b>ArgStockBOT</b> es un bot desarrollado por @orra6 y ofrece ciertas caracteristicas relacionadas a la bolsa de valores argentina. Para ver todos los comandos disponibles, escriba <b>/comandos</b>
<pre>Funciones:
-Si el bot es agregado a un grupo, este informará cierre y apertura del mercado argentino con 5 minutos de antelación
-Ver lista de empresas que cotizan en NYSE o Merval
-Ver lista de Bonos y FCIs disponibles
-Consultar la cotización de una empresa en forma particular
-Consultar opciones disponibles y sus cotizaciones
-Obtener cotización actual del bitcoin
-Obtener cotización actual del dólar
-Obtener ultima recomendación/idea publicada en TradingView para algún ticker particular
-Obtener grafico diario de alguna empresa elegida</pre>`;

const comandos = `<b>/tickers</b> -> lista de tickers disponibles para consultar (NYSE, MERVAL, BONOS, FCIs)

<b>/ticker {ticker}</b> -> consultar un ticker particular (NYSE,MERVAL,BONOS,OPCIONES,FCIs)

<b>/forex {divisas}</b> -> obtener cotizacion entre pares de divisas (FOREX)

<b>/idea {ticker}</b> -> obtener última idea publicada en Tradingview (NYSE, NASDAQ, MERVAL, FOREX)

<b>/graf {ticker} {ruedas}</b> -> obtener grafico diario de una empresa (NYSE, MERVAL)

<b>/opciones {ticker}</b> -> ver opciones disponibles y sus cotizaciones (MERVAL)

<b>/dolar</b> -> cotización actual del dolar

<b>/btc</b> -> cotizacion actual del Bitcoin en USD

<b>/about</b> -> informacion`;

const tickers_usa = [
  "kod",
  "ach",
  "abev",
  "adeco",
  "amx",
  "arco",
  "azn",
  "baba",
  "bb",
  "bbv",
  "bhp",
  "bcs",
  "bidu",
  "bp",
  "bng",
  "brfs",
  "bsbr",
  "chl",
  "cx",
  "dd",
  "erj",
  "fmx",
  "ggb",
  "blob",
  "gsk",
  "hmc",
  "hmy",
  "hsbc",
  "itub",
  "jd",
  "lvs",
  "lyg",
  "meli",
  "ngg",
  "nok",
  "pbr",
  "ptr",
  "rio",
  "rtx",
  "san",
  "scco",
  "sid",
  "siegy",
  "suz",
  "tm",
  "tot",
  "tsla",
  "tsm",
  "ugp",
  "un",
  "vale",
  "viv",
  "vod",
  "x",
  "auy",
  "bbd",
  "a",
  "aal",
  "aap",
  "aapl",
  "abbv",
  "abc",
  "abmd",
  "abt",
  "acn",
  "adbe",
  "adi",
  "adm",
  "adp",
  "ads",
  "adsk",
  "aee",
  "aep",
  "aes",
  "afl",
  "agro",
  "aig",
  "aiv",
  "aiz",
  "ajg",
  "akam",
  "alb",
  "algn",
  "alk",
  "all",
  "alle",
  "alxn",
  "amat",
  "amd",
  "ame",
  "amg",
  "amgn",
  "amp",
  "amt",
  "amzn",
  "anet",
  "anss",
  "antm",
  "aon",
  "aos",
  "apa",
  "apd",
  "aph",
  "aptv",
  "are",
  "atvi",
  "avb",
  "avgo",
  "avy",
  "awk",
  "axp",
  "azo",
  "ba",
  "bac",
  "bax",
  "bby",
  "bdx",
  "ben",
  "bhf",
  "biib",
  "bk",
  "bkng",
  "blk",
  "bll",
  "bmy",
  "br",
  "bsx",
  "bwa",
  "bxp",
  "c",
  "cag",
  "cah",
  "cat",
  "cb",
  "cboe",
  "cbre",
  "cci",
  "ccl",
  "cdns",
  "cern",
  "cf",
  "cfg",
  "chd",
  "chrw",
  "chtr",
  "ci",
  "cinf",
  "cl",
  "clx",
  "cma",
  "cmcsa",
  "cme",
  "cmg",
  "cmi",
  "cms",
  "cnc",
  "cnp",
  "cof",
  "cog",
  "coo",
  "cop",
  "cost",
  "coty",
  "cpb",
  "cprt",
  "crm",
  "csco",
  "csx",
  "ctas",
  "ctsh",
  "ctxs",
  "cvs",
  "cvx",
  "cxo",
  "d",
  "dal",
  "de",
  "desp",
  "dfs",
  "dg",
  "dgx",
  "dhi",
  "dhr",
  "dis",
  "disca",
  "disck",
  "dish",
  "dlr",
  "dltr",
  "dov",
  "dre",
  "dri",
  "dte",
  "duk",
  "dva",
  "dvn",
  "dxc",
  "ea",
  "ebay",
  "ecl",
  "ed",
  "efx",
  "eix",
  "el",
  "emn",
  "emr",
  "eog",
  "eqix",
  "eqr",
  "eqt",
  "es",
  "ess",
  "etn",
  "etr",
  "evrg",
  "ew",
  "exc",
  "expd",
  "expe",
  "exr",
  "f",
  "fast",
  "fb",
  "fbhs",
  "fcx",
  "fdx",
  "fe",
  "ffiv",
  "fis",
  "fisv",
  "fitb",
  "fl",
  "flir",
  "flr",
  "fls",
  "flt",
  "fmc",
  "frt",
  "fti",
  "ftnt",
  "ftv",
  "gd",
  "ge",
  "gild",
  "gis",
  "glw",
  "gm",
  "gold",
  "goog",
  "googl",
  "gpc",
  "gpn",
  "gps",
  "grmn",
  "gs",
  "gt",
  "gww",
  "hal",
  "has",
  "hban",
  "hbi",
  "hca",
  "hd",
  "hes",
  "hfc",
  "hig",
  "hii",
  "hlt",
  "hog",
  "holx",
  "hon",
  "hp",
  "hpe",
  "hpq",
  "hrb",
  "hrl",
  "hsic",
  "hst",
  "hsy",
  "hum",
  "ibm",
  "ice",
  "idxx",
  "iff",
  "ilmn",
  "incy",
  "intc",
  "intu",
  "ip",
  "ipg",
  "ipgp",
  "iqv",
  "ir",
  "irm",
  "isrg",
  "it",
  "itw",
  "ivz",
  "jbht",
  "jci",
  "jef",
  "jnj",
  "jnpr",
  "jpm",
  "jwn",
  "k",
  "key",
  "keys",
  "khc",
  "kim",
  "klac",
  "kmb",
  "kmi",
  "kmx",
  "ko",
  "kr",
  "kss",
  "ksu",
  "l",
  "lb",
  "leg",
  "len",
  "lh",
  "lin",
  "lit",
  "lkq",
  "lly",
  "lmt",
  "lnc",
  "lnt",
  "low",
  "lrcx",
  "lumn",
  "luv",
  "lyb",
  "m",
  "ma",
  "maa",
  "mac",
  "mar",
  "mas",
  "mat",
  "mcd",
  "mchp",
  "mck",
  "mco",
  "mdlz",
  "mdt",
  "met",
  "mgm",
  "mhk",
  "mkc",
  "mlm",
  "mmc",
  "mmm",
  "mnst",
  "mo",
  "mos",
  "mpc",
  "mrk",
  "mro",
  "ms",
  "msci",
  "msft",
  "msi",
  "mtb",
  "mtd",
  "mu",
  "myl",
  "nclh",
  "ndaq",
  "nee",
  "nem",
  "nflx",
  "ni",
  "nke",
  "nktr",
  "nlok",
  "nlsn",
  "noc",
  "nov",
  "nrg",
  "nsc",
  "ntap",
  "ntrs",
  "nue",
  "nvda",
  "nwl",
  "nws",
  "nwsa",
  "o",
  "oke",
  "omc",
  "orcl",
  "orly",
  "oxy",
  "payx",
  "pbct",
  "pcar",
  "pcg",
  "peak",
  "peg",
  "pep",
  "pfe",
  "pfg",
  "pg",
  "pgr",
  "ph",
  "phm",
  "pkg",
  "pki",
  "pld",
  "pm",
  "pnc",
  "pnr",
  "pnw",
  "ppg",
  "ppl",
  "prgo",
  "pru",
  "psa",
  "psx",
  "pvh",
  "pwr",
  "pxd",
  "pypl",
  "qcom",
  "qrvo",
  "rcl",
  "re",
  "reg",
  "regn",
  "rf",
  "rhi",
  "rjf",
  "rl",
  "rmd",
  "rok",
  "rol",
  "rop",
  "rost",
  "rsg",
  "sbac",
  "sbux",
  "schw",
  "see",
  "shw",
  "sivb",
  "sjm",
  "slb",
  "slg",
  "sna",
  "snps",
  "so",
  "spg",
  "spgi",
  "srcl",
  "sre",
  "stt",
  "stx",
  "stz",
  "swk",
  "swks",
  "syf",
  "syk",
  "syy",
  "t",
  "tap",
  "tdg",
  "tel",
  "tgt",
  "tif",
  "tjx",
  "tmo",
  "tpr",
  "trip",
  "trow",
  "trv",
  "tsco",
  "tsn",
  "ttwo",
  "twtr",
  "txn",
  "txt",
  "ua",
  "uaa",
  "ual",
  "udr",
  "uhs",
  "ulta",
  "unh",
  "unm",
  "unp",
  "ups",
  "uri",
  "usb",
  "uvxy",
  "v",
  "var",
  "vfc",
  "viac",
  "vist",
  "vlo",
  "vmc",
  "vno",
  "vrsk",
  "vrsn",
  "vrtx",
  "vtr",
  "vz",
  "wat",
  "wba",
  "wdc",
  "wec",
  "well",
  "wfc",
  "whr",
  "wltw",
  "wm",
  "wmb",
  "wmt",
  "wrk",
  "wu",
  "wy",
  "wynn",
  "xec",
  "xel",
  "xlnx",
  "xom",
  "xray",
  "xrx",
  "xyl",
  "yum",
  "zbh",
  "zion",
  "zts",
];

const tickers_arg = [
  { ticker: "agro", nombre: "Agrometal" },
  { ticker: "alua", nombre: "Aluar" },
  { ticker: "auso", nombre: "Autopistas del Sol" },
  { ticker: "bbar", nombre: "BBVA" },
  { ticker: "bhip", nombre: "Banco Hipotecario" },
  { ticker: "bma", nombre: "Banco Macro" },
  { ticker: "bolt", nombre: "Boldt" },
  { ticker: "bpat", nombre: "Banco Patagonia" },
  { ticker: "brio", nombre: "Banco Santander" },
  { ticker: "byma", nombre: "Bolsas y Mercados Argentinos" },
  { ticker: "cado", nombre: "Carlos Casado" },
  { ticker: "capx", nombre: "Capex" },
  { ticker: "carc", nombre: "Carboclor S.A." },
  { ticker: "ceco2", nombre: "Endesa Costanera" },
  { ticker: "celu", nombre: "Celulosa" },
  { ticker: "cepu", nombre: "Central Puerto SA" },
  { ticker: "cgpa2", nombre: "Camuzzi Gas Pampeana" },
  { ticker: "come", nombre: "Sociedad Comercial del Plata" },
  { ticker: "cres", nombre: "Cresud" },
  { ticker: "ctio", nombre: "Consultatio" },
  { ticker: "cvh", nombre: "Cablevision Holding S.A." },
  { ticker: "dgcu2", nombre: "Distribuidora de Gas Cuyana" },
  { ticker: "dyca", nombre: "Dycasa" },
  { ticker: "edn", nombre: "Edenor" },
  { ticker: "esme", nombre: "Bodegas Esmeralda" },
  { ticker: "ferr", nombre: "Ferrum" },
  { ticker: "fipl", nombre: "Fiplasto" },
  { ticker: "gami", nombre: "BGaming S.A" },
  { ticker: "garo", nombre: "Garovaglio y Zorraquin" },
  { ticker: "gban", nombre: "Gas Natural Ban" },
  { ticker: "gcla", nombre: "Grupo Clarin" },
  { ticker: "ggal", nombre: "Grupo Financiero Galicia" },
  { ticker: "grim", nombre: "Grimoldi" },
  { ticker: "harg", nombre: "Holcim" },
  { ticker: "hava", nombre: "Havanna Holding" },
  { ticker: "inag", nombre: "Insumos Agroquimicos" },
  { ticker: "intr", nombre: "Compania Introductora de BsAs" },
  { ticker: "invj", nombre: "Inversora Juramento" },
  { ticker: "ircp", nombre: "Alto Palermo" },
  { ticker: "irsa", nombre: "Irsa" },
  { ticker: "lede", nombre: "Ledesma" },
  { ticker: "loma", nombre: "Loma Negra Compañia Industrial" },
  { ticker: "long", nombre: "Longvie" },
  { ticker: "metr", nombre: "Metrogas" },
  { ticker: "mirg", nombre: "Mirgor" },
  { ticker: "mola", nombre: "Molinos Agro S.A." },
  { ticker: "moli", nombre: "Molinos Rio de la Plata" },
  { ticker: "mori", nombre: "Morixe Hermanos" },
  { ticker: "oest", nombre: "Grupo Concesionario del Oeste" },
  { ticker: "pamp", nombre: "Pampa Energia" },
  { ticker: "pata", nombre: "Imp. y Exportadora de la Patagonia" },
  { ticker: "pgr", nombre: "Phoenix Global Resources" },
  { ticker: "poll", nombre: "Polledo" },
  { ticker: "rich", nombre: "Laboratorios Richmond S.A.C.I.F." },
  { ticker: "rigo", nombre: "Rigolleau" },
  { ticker: "rose", nombre: "Instituto Rosenbusch" },
  { ticker: "sami", nombre: "San Miguel" },
  { ticker: "semi", nombre: "Molinos Juan Semino" },
  { ticker: "supv", nombre: "Grupo Supervielle" },
  { ticker: "teco2", nombre: "Telecom Argentina" },
  { ticker: "tglt", nombre: "TGLT S.A" },
  { ticker: "tgno4", nombre: "Transportadora Gas del Norte" },
  { ticker: "tgsu2", nombre: "Transportadora Gas del Sur" },
  { ticker: "tran", nombre: "Transener" },
  { ticker: "txar", nombre: "Ternium Argentina" },
  { ticker: "valo", nombre: "Grupo Financiero Valores" },
  { ticker: "ypfd", nombre: "Ypf" },
];

const bonos_arg = [
  "A2E8",
  "A2E8D",
  "AA21",
  "AA21D",
  "AA22",
  "AA25",
  "AA25D",
  "AA37",
  "AA37D",
  "AA46",
  "AA46D",
  "AE38",
  "AE38C",
  "AE38D",
  "AE48",
  "AE48D",
  "AF20",
  "AF20D",
  "AL29",
  "AL29C",
  "AL30",
  "AL30C",
  "AL35",
  "AL35C",
  "AL35D",
  "AL36",
  "AL41",
  "AL41C",
  "AL41D",
  "AO20",
  "AO20D",
  "AY24",
  "AY24C",
  "BDC22",
  "BDC24",
  "BDC28",
  "BP21",
  "BP28",
  "BPLD",
  "BPLDD",
  "BPLE",
  "BPMD",
  "BPMDD",
  "BPME",
  "CH24D",
  "CHSG1",
  "CGSG2",
  "CO21D",
  "CO23",
  "CO26",
  "CO26D",
  "CUAP",
  "DIA0",
  "DIA0D",
  "DICA",
  "DICAD",
  "DICP",
  "FORM3",
  "GD29",
  "GD29C",
  "GD29D",
  "GD30",
  "GD30C",
  "GD30D",
  "GD35",
  "GD35C",
  "GD35D",
  "GD38",
  "GD38C",
  "GD38D",
  "GD41",
  "GD41C",
  "GD41D",
  "GD46",
  "GD46C",
  "GD46D",
  "GE29",
  "GE41",
  "NRH2",
  "PAA0",
  "PAA0D",
  "PAP0",
  "PARA",
  "PARAD",
  "PARP",
  "PAY0",
  "PAY0D",
  "PBA25",
  "PBF23",
  "PBJ21",
  "PBJ27",
  "PBM24",
  "PBY22",
  "PF23D",
  "PMJ21",
  "PMY24",
  "PR13",
  "PR15",
  "PUL26",
  "PUM21",
  "PUY23",
  "SA24D",
  "SARH",
  "T2V1",
  "T2V1C",
  "T2V1D",
  "T2X1",
  "T2X2",
  "TB21",
  "TC21",
  "TC23",
  "TC25P",
  "TD21",
  "TFU27",
  "TO21",
  "TO23",
  "TO26",
  "TV21",
  "TV22",
  "TVPA",
  "TVPE",
  "TVPP",
  "TVPY",
  "TVPYD",
  "TVY0",
  "TX21",
  "TX22",
  "TX23",
  "TX24",
  "TX26",
  "TX28",
];

const fci_arg = [
  "ADCGLOA - Adcap Renta Dolar / Clase D",
  "ADRDOLA - Adcap Ahorro Pesos / Clase A",
  "CNXPOPA - Adcap Pesos Plus / Clase A",
  "CONIOLA - Adcap Iol Acciones Argentina / Clase A",
  "CONRETO - Adcap Retorno Total / Clase A",
  "CRTAFAA - Adcap Renta Fija Argentina / Clase A",
  "PCOMAGB - Premier Commodities / Clase B",
  "PRCPPEB - Premier Renta Corto Plazo Pesos / Clase B",
  "PRERMDB - Premier Renta Mixta Dolares / Clase B",
  "PRFAHOB - Premier Renta Fija / Clase B",
  "PRGLBDB - Premier Global Dolares / Clase B",
  "PRPEDOB - Premier Perfomance Dolares / Clase B",
  "PRPLPEB - Premier Renta Plus Pesos / Clase B",
  "PRREMIB - Premier Renta Mixta / Clase B",
  "PRTAVAB - Premier Renta Variable / Clase B",
];

const error_ticker = `El ticker solicitado no existe o hubo un error, escriba el comando /tickers para ver la lista de tickers`;

const error_opciones = `No hay opciones para el ticker solicitado o hubo un error`;

const mensaje_error_graf = `Error al solicitar grafico, escriba /graf {ticker} {ruedas}`;

const mensaje_error_forex = `Error al solicitar la informacion, escriba /forex {divisas}`;

const mensaje_error_idea = `Error al solicitar la informacion, escriba /idea {ticker}`;

const mensaje_error_informacion =
  "Hubo un error al obtener la informacion solicitada";

const mensaje_ayuda_ticker = `<pre>Recuerda utilizar el comando 
/ticker (ticker)
Ejemplo: /ticker ypfd</pre>`;

const mensaje_ayuda_idea = `<pre>Recuerda utilizar el comando 
/idea (ticker)
Ejemplo: /idea aapl</pre>`;

const mensaje_ayuda_opciones = `<pre>Recuerda utilizar el comando 
/opciones (ticker_argentino)
Ejemplo: /opciones ggal</pre>`;

const mensaje_ayuda_graf = `<pre>Recuerda utilizar el comando 
/graf (ticker) (ruedas)
Ejemplo: /graf ypfd 125</pre>`;

const mensaje_ayuda_forex = `<pre>Recuerda utilizar el comando 
/forex (divisas)
Ejemplo: /forex eurusd</pre>`;

const getMsgAbout = () => {
  return about;
};

const getMsgStart = () => {
  return start;
};

const getMsgComandos = () => {
  return comandos;
};

const getMsgErrorInfo = () => {
  return mensaje_error_informacion;
};

const getLongitudTickersArg = () => {
  return tickers_arg.length;
};
const getMsgTickersArg = (inicio) => {
  let text = "";
  const longitud = tickers_arg.length;
  for (let i = inicio; i < inicio + 10; i++) {
    if (i >= longitud) break;
    text += `${tickers_arg[i].ticker} - ${tickers_arg[i].nombre}

`;
  }
  return text;
};
const getLongitudTickersUsa = () => {
  return tickers_usa.length;
};

const getMsgTickersUsa = (inicio) => {
  let text = "";
  const longitud = tickers_usa.length;
  console.log(longitud);
  for (let i = inicio; i < inicio + 10; i++) {
    if (i >= longitud) break;
    text += `${tickers_usa[i].ticker} - ${tickers_usa[i].nombre}

`;
  }
  return text;
};

const getLongitudBonosArg = () => {
  return bonos_arg.length;
};

const getMsgBonosArg = (inicio) => {
  let text = "";
  const longitud = bonos_arg.length;
  for (let i = inicio; i < inicio + 10; i++) {
    if (i == longitud) break;
    text += `${bonos_arg[i]}

`;
  }
  return text;
};

const getLongitudFCIs = () => {
  return fci_arg.length;
};
const getMsgFCIs = (inicio) => {
  let text = "";
  const longitud = fci_arg.length;
  for (let i = inicio; i < inicio + 10; i++) {
    if (i == longitud) break;
    text += `${fci_arg[i]}

`;
  }
  return text;
};

const getMsgErrorTicker = () => {
  return error_ticker;
};

const getMsgErrorForex = () => {
  return mensaje_error_forex;
};

const getMsgErrorOpciones = () => {
  return error_opciones;
};

const getMsgAyudaIdea = () => {
  return mensaje_ayuda_idea;
};

const getMsgErrorIdea = () => {
  return mensaje_error_idea;
};

const getMsgErrorGraf = () => {
  return mensaje_error_graf;
};

const getMsgAyudaTicker = () => {
  return mensaje_ayuda_ticker;
};

const getMsgAyudaForex = () => {
  return mensaje_ayuda_forex;
};

const getMsgAyudaGraf = () => {
  return mensaje_ayuda_graf;
};

const getMsgAyudaOpciones = () => {
  return mensaje_ayuda_opciones;
};

module.exports = {
  getMsgAbout,
  getMsgStart,
  getMsgComandos,
  getMsgAyudaGraf,
  getMsgErrorGraf,
  getMsgTickersArg,
  getMsgTickersUsa,
  getLongitudTickersUsa,
  getLongitudBonosArg,
  getMsgErrorTicker,
  getMsgAyudaTicker,
  getMsgAyudaOpciones,
  getMsgErrorOpciones,
  getLongitudTickersArg,
  getMsgBonosArg,
  getLongitudFCIs,
  getMsgFCIs,
  getMsgAyudaForex,
  getMsgErrorForex,
  getMsgAyudaIdea,
  getMsgErrorIdea,
  getMsgErrorInfo,
};
