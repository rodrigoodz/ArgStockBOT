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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(pagina);
    const body = await response.text();
    // 'parseamos' con JSDOM
    const { document } = new JSDOM(body).window;

    //extraigo lo que necesito
    const ideas = document.querySelector(".tv-widget-idea");
    const link =
      "https://es.tradingview.com" +
      ideas.querySelector(".tv-widget-idea__title-row a").getAttribute("href");
    const titulo = ideas
      .querySelector(".tv-widget-idea__title-row")
      .textContent.trim(" ");
    const autor = ideas.querySelector(".tv-card-user-info__name").textContent;
    const descripcion = ideas
      .querySelector(".tv-widget-idea__description-row")
      .textContent.trim("\t");
    const fecha = ideas
      .querySelector(".tv-card-stats .tv-card-stats__time")
      .getAttribute("data-timestamp");
    const imagen = ideas
      .querySelector(
        ".tv-widget-idea__cover-wrap .tv-widget-idea__cover-link picture img"
      )
      .getAttribute("data-src");
    const date = new Date(Number(fecha) * 1000);

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
