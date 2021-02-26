//require
const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getDataDolar = async () => {
  try {
    //entramos a la pagina mediante puppeteer
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    const response = await page.goto("https://www.dolarhoy.com/");
    const body = await response.text();

    // 'parseamos' con JSDOM
    const { document } = new JSDOM(body).window;

    //extraigo lo que necesito
    const aux = [];
    document.querySelectorAll(".val").forEach((element) => {
      aux.push(element.textContent.trim(" ").toLowerCase());
    });
    console.log("data extraida de dolarhoy: ", aux);

    const data_hora = document.querySelector(".update").firstChild.innerHTML;

    await browser.close();

    return {
      blue: {
        compra: aux[2],
        venta: aux[3],
      },
      oficial: {
        compra: aux[4],
        venta: aux[5],
      },
      bolsa: {
        compra: aux[6],
        venta: aux[7],
      },
      ccl: {
        compra: aux[8],
        venta: aux[9],
      },
      solidario: {
        venta: aux[10],
      },
      hora_refresh: data_hora,
    };
  } catch (error) {
    return null;
  }
};

module.exports = {
  getDataDolar,
};
