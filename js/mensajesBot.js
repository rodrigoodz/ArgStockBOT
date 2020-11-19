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

// const tickers_arg = [
//   "ALUA - Aluminio Argentino SA",
//   "BBAR - Banco Francés SA",
//   "BMA - Banco Macro SA",
//   "BYMA - Bolsas y Mercados Argentinos SA",
//   "CEPU - Central Puerto SA",
//   "COME - Sociedad Comercial del Plata SA",
//   "CRES - Cresud SA",
//   "CVH - Cablevision Holding SA",
//   "EDN - Edenor",
//   "GGAL - Grupo Financiero Galicia",
//   "MIRG - Mirgor",
//   "PAMP - Pampa Energía",
//   "SUPV - Grupo Supervielle SA",
//   "TECO2 - Telecom Argentina SA",
//   "TGNO4 - Transportadora de Gas del Norte SA",
//   "TGSU2 - Transportadora de Gas del Sur",
//   "TRAN - Transener",
//   "TXAR - Ternium Argentina SA",
//   "VALO - Grupo Financiero Valores SA",
//   "YPFD - YPF SA",
// ];

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
  "agro - Agrometal",
  "alua - Aluar",
  "auso - Autopistas del Sol",
  "bbar - BBVA",
  "bhip - Banco Hipotecario",
  "bma - Banco Macro",
  "bolt - Boldt",
  "bpat - Banco Patagonia",
  "brio - Banco Santander",
  "byma - Bolsas y Mercados Argentinos",
  "cado - Carlos Casado",
  "capx - Capex",
  "carc - Carboclor S.A.",
  "ceco2 - Endesa Costanera",
  "celu - Celulosa",
  "cepu - Central Puerto SA",
  "cgpa2 - Camuzzi Gas Pampeana",
  "come - Sociedad Comercial del Plata",
  "cres - Cresud",
  "ctio - Consultatio",
  "cvh - Cablevision Holding S.A.",
  "dgcu2 - Distribuidora de Gas Cuyana",
  "dyca - Dycasa",
  "edn - Edenor",
  "esme - Bodegas Esmeralda",
  "ferr - Ferrum",
  "fipl - Fiplasto",
  "gami - B-Gaming S.A",
  "garo - Garovaglio y Zorraquin",
  "gban - Gas Natural Ban",
  "gcla - Grupo Clarin",
  "ggal - Grupo Financiero Galicia",
  "grim - Grimoldi",
  "harg - Holcim",
  "hava - Havanna Holding",
  "inag - Insumos Agroquimicos",
  "intr - Compania Introductora de BsAs",
  "invj - Inversora Juramento",
  "ircp - Alto Palermo",
  "irsa - Irsa",
  "lede - Ledesma",
  "loma - Loma Negra Compañia Industrial",
  "long - Longvie",
  "metr - Metrogas",
  "mirg - Mirgor",
  "mola - Molinos Agro S.A.",
  "moli - Molinos Rio de la Plata",
  "mori - Morixe Hermanos",
  "oest - Grupo Concesionario del Oeste",
  "pamp - Pampa Energia",
  "pata - Imp. y Exportadora de la Patagonia",
  "pgr - Phoenix Global Resources",
  "poll - Polledo",
  "rich - Laboratorios Richmond S.A.C.I.F.",
  "rigo - Rigolleau",
  "rose - Instituto Rosenbusch",
  "sami - San Miguel",
  "semi - Molinos Juan Semino",
  "supv - Grupo Supervielle",
  "teco2 - Telecom Argentina",
  "tglt - TGLT S.A",
  "tgno4 - Transportadora Gas del Norte",
  "tgsu2 - Transportadora Gas del Sur",
  "tran - Transener",
  "txar - Ternium Argentina",
  "valo - Grupo Financiero Valores",
  "ypfd - Ypf",
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

const getLongitudTickersArg = () => {
  return tickers_arg.length;
};
const getMsgTickersArg = (inicio) => {
  let text = "";
  const longitud = tickers_arg.length;
  for (let i = inicio; i < inicio + 10; i++) {
    if (i == longitud) break;
    text += `${tickers_arg[i]}

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
  for (let i = inicio; i < inicio + 10; i++) {
    if (i == longitud) break;
    text += `${tickers_usa[i]}

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
  getMsgTickersUsa,
  getLongitudTickersUsa,
  getLongitudBonosArg,
  getMsgErrorTicker,
  getMsgAyudaTicker,
  getMsgErrorOpciones,
  getLongitudTickersArg,
  getMsgBonosArg,
};
