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
  { ticker: "kod", nombre: "Kodiak Sciences Inc" },
  { ticker: "ach", nombre: "Aluminum Corporation of China" },
  { ticker: "abev", nombre: "Ambev S.A." },
  { ticker: "adeco", nombre: "Adecco Group AG" },
  { ticker: "amx", nombre: "America Movil, SAB de CV" },
  { ticker: "arco", nombre: "Arcos Dorados Holdings Inc" },
  { ticker: "azn", nombre: "AstraZeneca" },
  { ticker: "baba", nombre: "Alibaba Group" },
  { ticker: "bb", nombre: "BlackBerry Limited" },
  { ticker: "bbv", nombre: "Banco Bilbao Vizcaya Argentaria" },
  { ticker: "bhp", nombre: "BHP Group Ltd" },
  { ticker: "bcs", nombre: "Barclays" },
  { ticker: "bidu", nombre: "Baidu" },
  // { ticker: "bp", nombre: "" },
  // { ticker: "bng", nombre: "Bunge Cedear" },
  { ticker: "brfs", nombre: "BRF S.A. (ADR)" },
  { ticker: "bsbr", nombre: "Banco Santander (Brasil)" },
  { ticker: "chl", nombre: "China Mobile Limited" },
  { ticker: "cx", nombre: "Cemex" },
  { ticker: "dd", nombre: "DuPont Corporation" },
  { ticker: "erj", nombre: "Embraer" },
  { ticker: "fmx", nombre: "Fomento Economico Mexicano S.A. (ADR)" },
  { ticker: "ggb", nombre: "Gerdau" },
  { ticker: "gsk", nombre: "GlaxoSmithKline" },
  { ticker: "hmc", nombre: "Honda" },
  { ticker: "hmy", nombre: "Harmony Gold Mining Co." },
  { ticker: "hsbc", nombre: "HSBC" },
  { ticker: "itub", nombre: "Banco Itaú" },
  { ticker: "jd", nombre: "JD .com" },
  { ticker: "lvs", nombre: "Las Vegas Sands" },
  { ticker: "lyg", nombre: "Lloyds Banking Group PLC" },
  { ticker: "meli", nombre: "MercadoLibre" },
  { ticker: "ngg", nombre: "National Grid" },
  { ticker: "nok", nombre: "Nokia" },
  { ticker: "pbr", nombre: "Petroleo Brasileiro (ADR)" },
  { ticker: "ptr", nombre: "PetroChina" },
  { ticker: "rio", nombre: "Rio Tinto Company Limited" },
  { ticker: "rtx", nombre: "Raytheon Technologies Corporation" },
  { ticker: "san", nombre: "Banco Santander" },
  { ticker: "scco", nombre: "Southern Copper Corporation" },
  { ticker: "sid", nombre: "Companhia Siderúrgica Nacional" },
  { ticker: "siegy", nombre: "Siemens AG" },
  { ticker: "suz", nombre: "Suzano S.A." },
  { ticker: "tm", nombre: "Toyota" },
  { ticker: "tot", nombre: "Total S. A." },
  { ticker: "tsla", nombre: "Tesla, Inc." },
  { ticker: "tsm", nombre: "TSMC" },
  { ticker: "ugp", nombre: "Ultrapar Participacoes SA" },
  { ticker: "un", nombre: "Unilever NV" },
  { ticker: "vale", nombre: "Vale S.A." },
  { ticker: "viv", nombre: "Telefonica Brasil S.A. (ADR)" },
  { ticker: "vod", nombre: "Vodafone" },
  { ticker: "x", nombre: "U.S. Steel" },
  { ticker: "auy", nombre: "Yamana Gold" },
  { ticker: "bbd", nombre: "Banco Bradesco (ADR)" },
  { ticker: "a", nombre: "Agilent Technologies" },
  { ticker: "aal", nombre: "AMR Corporation" },
  { ticker: "aap", nombre: "Advance Auto Parts" },
  { ticker: "aapl", nombre: "Apple" },
  { ticker: "abbv", nombre: "AbbVie Inc." },
  { ticker: "abc", nombre: "AmerisourceBergen" },
  { ticker: "abmd", nombre: "ABIOMED" },
  { ticker: "abt", nombre: "Abbott Laboratories" },
  { ticker: "acn", nombre: "Accenture" },
  { ticker: "adbe", nombre: "Adobe Systems" },
  { ticker: "adi", nombre: "Analog Devices" },
  { ticker: "adm", nombre: "Archer-Daniels-Midland" },
  { ticker: "adp", nombre: "Automatic Data Processing" },
  { ticker: "ads", nombre: "Alliance Data Systems" },
  { ticker: "adsk", nombre: "Autodesk" },
  { ticker: "aee", nombre: "Ameren" },
  { ticker: "aep", nombre: "American Electric Power" },
  { ticker: "aes", nombre: "The AES" },
  { ticker: "afl", nombre: "Aflac" },
  { ticker: "agro", nombre: "Adecoagro S.A." },
  { ticker: "aig", nombre: "American International Group" },
  { ticker: "aiv", nombre: "Apartment Investment And Management" },
  { ticker: "aiz", nombre: "Assurant" },
  { ticker: "ajg", nombre: "Arthur J. Gallagher" },
  { ticker: "akam", nombre: "Akamai Technologies" },
  { ticker: "alb", nombre: "Albemarle" },
  { ticker: "algn", nombre: "Align Technology" },
  { ticker: "alk", nombre: "Alaska Air Group" },
  { ticker: "all", nombre: "Allstate" },
  { ticker: "alle", nombre: "ALLEGIANT BANC" },
  { ticker: "alxn", nombre: "Alexion Pharmaceuticals" },
  { ticker: "amat", nombre: "Applied Materials" },
  { ticker: "amd", nombre: "Advanced Micro Devices" },
  { ticker: "ame", nombre: "AMTEK" },
  { ticker: "amg", nombre: "Affiliated Managers Group" },
  { ticker: "amgn", nombre: "Amgen" },
  { ticker: "amp", nombre: "Ameriprise Financial Services" },
  { ticker: "amt", nombre: "American Tower" },
  { ticker: "amzn", nombre: "Amazon" },
  { ticker: "anet", nombre: "Arista Networks" },
  { ticker: "anss", nombre: "ANSYS" },
  { ticker: "antm", nombre: "Anthem Inc" },
  { ticker: "aon", nombre: "Aon Corporation" },
  { ticker: "aos", nombre: "Smith (A.O.)" },
  { ticker: "apa", nombre: "Apache" },
  { ticker: "apd", nombre: "Air Products And Chemicals" },
  { ticker: "aph", nombre: "Amphenol" },
  { ticker: "aptv", nombre: "Aptiv Plc" },
  { ticker: "are", nombre: "Alexandria Real Estate Equities" },
  { ticker: "atvi", nombre: "Activision Blizzard" },
  { ticker: "avb", nombre: "Avalonbay Communities" },
  { ticker: "avgo", nombre: "Broadcom Inc." },
  { ticker: "avy", nombre: "Avery Dennison" },
  { ticker: "awk", nombre: "American Water Works" },
  { ticker: "axp", nombre: "American Express" },
  { ticker: "azo", nombre: "AutoZone" },
  { ticker: "ba", nombre: "Boeing" },
  { ticker: "bac", nombre: "Bank of America" },
  { ticker: "bax", nombre: "Baxter International" },
  { ticker: "bby", nombre: "Best Buy" },
  { ticker: "bdx", nombre: "Becton Dickinson And" },
  { ticker: "ben", nombre: "Franklin Resources" },
  { ticker: "bhf", nombre: "Brighthouse Financial Inc" },
  { ticker: "biib", nombre: "Biogen Idec" },
  { ticker: "bk", nombre: "Bank Of New York Mellon" },
  { ticker: "bkng", nombre: "Banknorth Group" },
  { ticker: "blk", nombre: "BlackRock" },
  { ticker: "bll", nombre: "Ball" },
  { ticker: "bmy", nombre: "Bristol-Myers Squibb" },
  { ticker: "br", nombre: "Broadridge Financial Solutions" },
  { ticker: "bsx", nombre: "Boston Scientific" },
  { ticker: "bwa", nombre: "BorgWarner" },
  { ticker: "bxp", nombre: "Boston Properties" },
  { ticker: "c", nombre: "Citigroup" },
  { ticker: "cag", nombre: "ConAgra Foods" },
  { ticker: "cah", nombre: "Cardinal Health" },
  { ticker: "cat", nombre: "Caterpillar" },
  { ticker: "cb", nombre: "Chubb" },
  { ticker: "cboe", nombre: "CBOE" },
  { ticker: "cbre", nombre: "CBRE Group" },
  { ticker: "cci", nombre: "Crown Castle International" },
  { ticker: "ccl", nombre: "Carnival" },
  { ticker: "cdns", nombre: "Cadence Design Systems" },
  { ticker: "cern", nombre: "Cerner" },
  { ticker: "cf", nombre: "CF Industries" },
  { ticker: "cfg", nombre: "Citizens Financial Group Inc" },
  { ticker: "chd", nombre: "Church & Dwight" },
  { ticker: "chrw", nombre: "C.H. Robinson Worldwide" },
  { ticker: "chtr", nombre: "Charter Communications" },
  { ticker: "ci", nombre: "CIGNA" },
  { ticker: "cinf", nombre: "Cincinnati Financial" },
  { ticker: "cl", nombre: "Colgate-Palmolive" },
  { ticker: "clx", nombre: "Clorox" },
  { ticker: "cma", nombre: "Comerica Incorporated" },
  { ticker: "cmcsa", nombre: "Comcast" },
  { ticker: "cme", nombre: "CME Group" },
  { ticker: "cmg", nombre: "Chipotle Mexican Grill" },
  { ticker: "cmi", nombre: "Cummins" },
  { ticker: "cms", nombre: "CMS Energy" },
  { ticker: "cnc", nombre: "Centene" },
  { ticker: "cnp", nombre: "CenterPoint Energy	" },
  { ticker: "cof", nombre: "Capital One Financial" },
  { ticker: "cog", nombre: "Cabot Oil & Gas" },
  { ticker: "coo", nombre: "Cooper Companies" },
  { ticker: "cop", nombre: "ConocoPhillips" },
  { ticker: "cost", nombre: "Costco Wholesale" },
  { ticker: "coty", nombre: "Coty Inc" },
  { ticker: "cpb", nombre: "Campbell Soup" },
  { ticker: "cprt", nombre: "Copart" },
  { ticker: "crm", nombre: "Salesforce.com" },
  { ticker: "csco", nombre: "Cisco Systems" },
  { ticker: "csx", nombre: "CSX" },
  { ticker: "ctas", nombre: "Cintas" },
  { ticker: "ctsh", nombre: "Cognizant Technology Solutions" },
  { ticker: "ctxs", nombre: "Citrix Systems" },
  { ticker: "cvs", nombre: "CVS" },
  { ticker: "cvx", nombre: "Chevron" },
  { ticker: "cxo", nombre: "Dominion Resources	" },
  { ticker: "d", nombre: "Dominion Resources	" },
  { ticker: "dal", nombre: "Delta Air Lines Inc." },
  { ticker: "de", nombre: "Deere" },
  { ticker: "desp", nombre: "Despegar" },
  { ticker: "dfs", nombre: "Discover Financial Services" },
  { ticker: "dg", nombre: "Dollar General" },
  { ticker: "dgx", nombre: "Quest Diagnostics" },
  { ticker: "dhi", nombre: "D.R. Horton" },
  { ticker: "dhr", nombre: "Danaher" },
  { ticker: "dis", nombre: "Walt Disney" },
  { ticker: "disca", nombre: "Discovery Communications" },
  { ticker: "disck", nombre: "Discovery Communications" },
  { ticker: "dish", nombre: "DISH Network" },
  { ticker: "dlr", nombre: "Digital Realty Trust" },
  { ticker: "dltr", nombre: "Dollar Tree" },
  { ticker: "dov", nombre: "Dover" },
  { ticker: "dre", nombre: "Duke Realty" },
  { ticker: "dri", nombre: "Darden Restaurants" },
  { ticker: "dte", nombre: "DTE Energy" },
  { ticker: "duk", nombre: "Duke Energy" },
  { ticker: "dva", nombre: "DaVita" },
  { ticker: "dvn", nombre: "Devon Energy" },
  { ticker: "dxc", nombre: "DXC Technology" },
  { ticker: "ea", nombre: "Electronic Arts" },
  { ticker: "ebay", nombre: "eBay" },
  { ticker: "ecl", nombre: "Ecolab" },
  { ticker: "ed", nombre: "Consolidated Edison Of New York" },
  { ticker: "efx", nombre: "Equifax" },
  { ticker: "eix", nombre: "Edison International" },
  { ticker: "el", nombre: "Estee Lauder Companies" },
  { ticker: "emn", nombre: "Eastman Chemical" },
  { ticker: "emr", nombre: "Emerson Electric" },
  { ticker: "eog", nombre: "Eog Resources" },
  { ticker: "eqix", nombre: "" },
  { ticker: "eqr", nombre: "" },
  { ticker: "eqt", nombre: "" },
  { ticker: "es", nombre: "" },
  { ticker: "ess", nombre: "" },
  { ticker: "etn", nombre: "" },
  { ticker: "etr", nombre: "" },
  { ticker: "evrg", nombre: "" },
  { ticker: "ew", nombre: "" },
  { ticker: "exc", nombre: "" },
  { ticker: "expd", nombre: "" },
  { ticker: "expe", nombre: "" },
  { ticker: "exr", nombre: "" },
  { ticker: "f", nombre: "" },
  { ticker: "fast", nombre: "" },
  { ticker: "fb", nombre: "" },
  { ticker: "fbhs", nombre: "" },
  { ticker: "fcx", nombre: "" },
  { ticker: "fdx", nombre: "" },
  { ticker: "fe", nombre: "" },
  { ticker: "ffiv", nombre: "" },
  { ticker: "fis", nombre: "" },
  { ticker: "fisv", nombre: "" },
  { ticker: "fitb", nombre: "" },
  { ticker: "fl", nombre: "" },
  { ticker: "flir", nombre: "" },
  { ticker: "flr", nombre: "" },
  { ticker: "fls", nombre: "" },
  { ticker: "flt", nombre: "" },
  { ticker: "fmc", nombre: "" },
  { ticker: "frt", nombre: "" },
  { ticker: "fti", nombre: "" },
  { ticker: "ftnt", nombre: "" },
  { ticker: "ftv", nombre: "" },
  { ticker: "gd", nombre: "" },
  { ticker: "ge", nombre: "" },
  { ticker: "gild", nombre: "" },
  { ticker: "gis", nombre: "" },
  { ticker: "glw", nombre: "" },
  { ticker: "gm", nombre: "" },
  { ticker: "gold", nombre: "" },
  { ticker: "goog", nombre: "" },
  { ticker: "googl", nombre: "" },
  { ticker: "gpc", nombre: "" },
  { ticker: "gpn", nombre: "" },
  { ticker: "gps", nombre: "" },
  { ticker: "grmn", nombre: "" },
  { ticker: "gs", nombre: "" },
  { ticker: "gt", nombre: "" },
  { ticker: "gww", nombre: "" },
  { ticker: "hal", nombre: "" },
  { ticker: "has", nombre: "" },
  { ticker: "hban", nombre: "" },
  { ticker: "hbi", nombre: "" },
  { ticker: "hca", nombre: "" },
  { ticker: "hd", nombre: "" },
  { ticker: "hes", nombre: "" },
  { ticker: "hfc", nombre: "" },
  { ticker: "hig", nombre: "" },
  { ticker: "hii", nombre: "" },
  { ticker: "hlt", nombre: "" },
  { ticker: "hog", nombre: "" },
  { ticker: "holx", nombre: "" },
  { ticker: "hon", nombre: "" },
  { ticker: "hp", nombre: "" },
  { ticker: "hpe", nombre: "" },
  { ticker: "hpq", nombre: "" },
  { ticker: "hrb", nombre: "" },
  { ticker: "hrl", nombre: "" },
  { ticker: "hsic", nombre: "" },
  { ticker: "hst", nombre: "" },
  { ticker: "hsy", nombre: "" },
  { ticker: "hum", nombre: "" },
  { ticker: "ibm", nombre: "" },
  { ticker: "ice", nombre: "" },
  { ticker: "idxx", nombre: "" },
  { ticker: "iff", nombre: "" },
  { ticker: "ilmn", nombre: "" },
  { ticker: "incy", nombre: "" },
  { ticker: "intc", nombre: "" },
  { ticker: "intu", nombre: "" },
  { ticker: "ip", nombre: "" },
  { ticker: "ipg", nombre: "" },
  { ticker: "ipgp", nombre: "" },
  { ticker: "iqv", nombre: "" },
  { ticker: "ir", nombre: "" },
  { ticker: "irm", nombre: "" },
  { ticker: "isrg", nombre: "" },
  { ticker: "it", nombre: "" },
  { ticker: "itw", nombre: "" },
  { ticker: "ivz", nombre: "" },
  { ticker: "jbht", nombre: "" },
  { ticker: "jci", nombre: "" },
  { ticker: "jef", nombre: "" },
  { ticker: "jnj", nombre: "" },
  { ticker: "jnpr", nombre: "" },
  { ticker: "jpm", nombre: "" },
  { ticker: "jwn", nombre: "" },
  { ticker: "k", nombre: "" },
  { ticker: "key", nombre: "" },
  { ticker: "keys", nombre: "" },
  { ticker: "khc", nombre: "" },
  { ticker: "kim", nombre: "" },
  { ticker: "klac", nombre: "" },
  { ticker: "kmb", nombre: "" },
  { ticker: "kmi", nombre: "" },
  { ticker: "kmx", nombre: "" },
  { ticker: "ko", nombre: "" },
  { ticker: "kr", nombre: "" },
  { ticker: "kss", nombre: "" },
  { ticker: "ksu", nombre: "" },
  { ticker: "l", nombre: "" },
  { ticker: "lb", nombre: "" },
  { ticker: "leg", nombre: "" },
  { ticker: "len", nombre: "" },
  { ticker: "lh", nombre: "" },
  { ticker: "lin", nombre: "" },
  { ticker: "lit", nombre: "" },
  { ticker: "lkq", nombre: "" },
  { ticker: "lly", nombre: "" },
  { ticker: "lmt", nombre: "" },
  { ticker: "lnc", nombre: "" },
  { ticker: "lnt", nombre: "" },
  { ticker: "low", nombre: "" },
  { ticker: "lrcx", nombre: "" },
  { ticker: "lumn", nombre: "" },
  { ticker: "luv", nombre: "" },
  { ticker: "lyb", nombre: "" },
  { ticker: "m", nombre: "" },
  { ticker: "ma", nombre: "" },
  { ticker: "maa", nombre: "" },
  { ticker: "mac", nombre: "" },
  { ticker: "mar", nombre: "" },
  { ticker: "mas", nombre: "" },
  { ticker: "mat", nombre: "" },
  { ticker: "mcd", nombre: "" },
  { ticker: "mchp", nombre: "" },
  { ticker: "mck", nombre: "" },
  { ticker: "mco", nombre: "" },
  { ticker: "mdlz", nombre: "" },
  { ticker: "mdt", nombre: "" },
  { ticker: "met", nombre: "" },
  { ticker: "mgm", nombre: "" },
  { ticker: "mhk", nombre: "" },
  { ticker: "mkc", nombre: "" },
  { ticker: "mlm", nombre: "" },
  { ticker: "mmc", nombre: "" },
  { ticker: "mmm", nombre: "" },
  { ticker: "mnst", nombre: "" },
  { ticker: "mo", nombre: "" },
  { ticker: "mos", nombre: "" },
  { ticker: "mpc", nombre: "" },
  { ticker: "mrk", nombre: "" },
  { ticker: "mro", nombre: "" },
  { ticker: "ms", nombre: "" },
  { ticker: "msci", nombre: "" },
  { ticker: "msft", nombre: "" },
  { ticker: "msi", nombre: "" },
  { ticker: "mtb", nombre: "" },
  { ticker: "mtd", nombre: "" },
  { ticker: "mu", nombre: "" },
  { ticker: "myl", nombre: "" },
  { ticker: "nclh", nombre: "" },
  { ticker: "ndaq", nombre: "" },
  { ticker: "nee", nombre: "" },
  { ticker: "nem", nombre: "" },
  { ticker: "nflx", nombre: "" },
  { ticker: "ni", nombre: "" },
  { ticker: "nke", nombre: "" },
  { ticker: "nktr", nombre: "" },
  { ticker: "nlok", nombre: "" },
  { ticker: "nlsn", nombre: "" },
  { ticker: "noc", nombre: "" },
  { ticker: "nov", nombre: "" },
  { ticker: "nrg", nombre: "" },
  { ticker: "nsc", nombre: "" },
  { ticker: "ntap", nombre: "" },
  { ticker: "ntrs", nombre: "" },
  { ticker: "nue", nombre: "" },
  { ticker: "nvda", nombre: "" },
  { ticker: "nwl", nombre: "" },
  { ticker: "nws", nombre: "" },
  { ticker: "nwsa", nombre: "" },
  { ticker: "o", nombre: "" },
  { ticker: "oke", nombre: "" },
  { ticker: "omc", nombre: "" },
  { ticker: "orcl", nombre: "" },
  { ticker: "orly", nombre: "" },
  { ticker: "oxy", nombre: "" },
  { ticker: "payx", nombre: "" },
  { ticker: "pbct", nombre: "" },
  { ticker: "pcar", nombre: "" },
  { ticker: "pcg", nombre: "" },
  { ticker: "peak", nombre: "" },
  { ticker: "peg", nombre: "" },
  { ticker: "pep", nombre: "" },
  { ticker: "pfe", nombre: "" },
  { ticker: "pfg", nombre: "" },
  { ticker: "pg", nombre: "" },
  { ticker: "pgr", nombre: "" },
  { ticker: "ph", nombre: "" },
  { ticker: "phm", nombre: "" },
  { ticker: "pkg", nombre: "" },
  { ticker: "pki", nombre: "" },
  { ticker: "pld", nombre: "" },
  { ticker: "pm", nombre: "" },
  { ticker: "pnc", nombre: "" },
  { ticker: "pnr", nombre: "" },
  { ticker: "pnw", nombre: "" },
  { ticker: "ppg", nombre: "" },
  { ticker: "ppl", nombre: "" },
  { ticker: "prgo", nombre: "" },
  { ticker: "pru", nombre: "" },
  { ticker: "psa", nombre: "" },
  { ticker: "psx", nombre: "" },
  { ticker: "pvh", nombre: "" },
  { ticker: "pwr", nombre: "" },
  { ticker: "pxd", nombre: "" },
  { ticker: "pypl", nombre: "" },
  { ticker: "qcom", nombre: "" },
  { ticker: "qrvo", nombre: "" },
  { ticker: "rcl", nombre: "" },
  { ticker: "re", nombre: "" },
  { ticker: "reg", nombre: "" },
  { ticker: "regn", nombre: "" },
  { ticker: "rf", nombre: "" },
  { ticker: "rhi", nombre: "" },
  { ticker: "rjf", nombre: "" },
  { ticker: "rl", nombre: "" },
  { ticker: "rmd", nombre: "" },
  { ticker: "rok", nombre: "" },
  { ticker: "rol", nombre: "" },
  { ticker: "rop", nombre: "" },
  { ticker: "rost", nombre: "" },
  { ticker: "rsg", nombre: "" },
  { ticker: "sbac", nombre: "" },
  { ticker: "sbux", nombre: "" },
  { ticker: "schw", nombre: "" },
  { ticker: "see", nombre: "" },
  { ticker: "shw", nombre: "" },
  { ticker: "sivb", nombre: "" },
  { ticker: "sjm", nombre: "" },
  { ticker: "slb", nombre: "" },
  { ticker: "slg", nombre: "" },
  { ticker: "sna", nombre: "" },
  { ticker: "snps", nombre: "" },
  { ticker: "so", nombre: "" },
  { ticker: "spg", nombre: "" },
  { ticker: "spgi", nombre: "" },
  { ticker: "srcl", nombre: "" },
  { ticker: "sre", nombre: "" },
  { ticker: "stt", nombre: "" },
  { ticker: "stx", nombre: "" },
  { ticker: "stz", nombre: "" },
  { ticker: "swk", nombre: "" },
  { ticker: "swks", nombre: "" },
  { ticker: "syf", nombre: "" },
  { ticker: "syk", nombre: "" },
  { ticker: "syy", nombre: "" },
  { ticker: "t", nombre: "" },
  { ticker: "tap", nombre: "" },
  { ticker: "tdg", nombre: "" },
  { ticker: "tel", nombre: "" },
  { ticker: "tgt", nombre: "" },
  { ticker: "tif", nombre: "" },
  { ticker: "tjx", nombre: "" },
  { ticker: "tmo", nombre: "" },
  { ticker: "tpr", nombre: "" },
  { ticker: "trip", nombre: "" },
  { ticker: "trow", nombre: "" },
  { ticker: "trv", nombre: "" },
  { ticker: "tsco", nombre: "" },
  { ticker: "tsn", nombre: "" },
  { ticker: "ttwo", nombre: "" },
  { ticker: "twtr", nombre: "" },
  { ticker: "txn", nombre: "" },
  { ticker: "txt", nombre: "" },
  { ticker: "ua", nombre: "" },
  { ticker: "uaa", nombre: "" },
  { ticker: "ual", nombre: "" },
  { ticker: "udr", nombre: "" },
  { ticker: "uhs", nombre: "" },
  { ticker: "ulta", nombre: "" },
  { ticker: "unh", nombre: "" },
  { ticker: "unm", nombre: "" },
  { ticker: "unp", nombre: "" },
  { ticker: "ups", nombre: "" },
  { ticker: "uri", nombre: "" },
  { ticker: "usb", nombre: "" },
  { ticker: "uvxy", nombre: "" },
  { ticker: "v", nombre: "" },
  { ticker: "var", nombre: "" },
  { ticker: "vfc", nombre: "" },
  { ticker: "viac", nombre: "" },
  { ticker: "vist", nombre: "" },
  { ticker: "vlo", nombre: "" },
  { ticker: "vmc", nombre: "" },
  { ticker: "vno", nombre: "" },
  { ticker: "vrsk", nombre: "" },
  { ticker: "vrsn", nombre: "" },
  { ticker: "vrtx", nombre: "" },
  { ticker: "vtr", nombre: "" },
  { ticker: "vz", nombre: "" },
  { ticker: "wat", nombre: "" },
  { ticker: "wba", nombre: "" },
  { ticker: "wdc", nombre: "" },
  { ticker: "wec", nombre: "" },
  { ticker: "well", nombre: "" },
  { ticker: "wfc", nombre: "" },
  { ticker: "whr", nombre: "" },
  { ticker: "wltw", nombre: "" },
  { ticker: "wm", nombre: "" },
  { ticker: "wmb", nombre: "" },
  { ticker: "wmt", nombre: "" },
  { ticker: "wrk", nombre: "" },
  { ticker: "wu", nombre: "" },
  { ticker: "wy", nombre: "" },
  { ticker: "wynn", nombre: "" },
  { ticker: "xec", nombre: "" },
  { ticker: "xel", nombre: "" },
  { ticker: "xlnx", nombre: "" },
  { ticker: "xom", nombre: "" },
  { ticker: "xray", nombre: "" },
  { ticker: "xrx", nombre: "" },
  { ticker: "xyl", nombre: "" },
  { ticker: "yum", nombre: "" },
  { ticker: "zbh", nombre: "" },
  { ticker: "zion", nombre: "" },
  { ticker: "zts", nombre: "" },
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
