//require
const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getIdea = async (ticker, mercado) => {
  try {
    let pagina = "";
    if (mercado) {
      //consulto algun ticker del bcba o nasdaq
      pagina = `https://es.tradingview.com/symbols/${mercado}-${ticker}/ideas/`;
    } else {
      //consulto divisas
      pagina = `https://es.tradingview.com/symbols/${ticker}/ideas/`;
    }
    //entramos a la pagina mediante puppeteer
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    let response = await page.goto(pagina);
    let body = await response.text();
    // 'parseamos' con JSDOM
    const { document } = new JSDOM(body).window;

    //extraigo lo que necesito
    let ideas = document.querySelector(".tv-widget-idea");
    let link, titulo, descripcion, imagen, fecha, date;

    //si el ticker no es de NASDAQ, me fijo en NYSE
    if (ideas == null) {
      response = await page.goto(
        `https://es.tradingview.com/symbols/NYSE-${ticker}/ideas/`
      );
      body = await response.text();
      // 'parseamos' con JSDOM
      const { document } = new JSDOM(body).window;
      ideas = document.querySelector(".tv-widget-idea");
    }

    link =
      "https://es.tradingview.com" +
      ideas.querySelector(".tv-widget-idea__title-row a").getAttribute("href");
    titulo = ideas
      .querySelector(".tv-widget-idea__title-row")
      .textContent.trim(" ");
    autor = ideas.querySelector(".tv-card-user-info__name").textContent;
    descripcion = ideas
      .querySelector(".tv-widget-idea__description-row")
      .textContent.trim("\t");
    fecha = ideas
      .querySelector(".tv-card-stats .tv-card-stats__time")
      .getAttribute("data-timestamp");
    imagen = ideas
      .querySelector(
        ".tv-widget-idea__cover-wrap .tv-widget-idea__cover-link picture img"
      )
      .getAttribute("data-src");
    date = new Date(Number(fecha) * 1000);

    await browser.close();

    return {
      titulo,
      descripcion,
      link,
      autor,
      imagen,
      date,
    };
  } catch (error) {
    console.error("ERROR! ", error);
  }
};

module.exports = {
  getIdea,
};
