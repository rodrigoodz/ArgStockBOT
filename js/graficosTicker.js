const chartExporter = require("highcharts-export-server");
const TelegramBot = require("node-telegram-bot-api");
const ema = require("exponential-moving-average");
const {
  getDataHistoricaLine,
  getDataHistoricaCandleStick,
} = require("./yahoo-finance");

// node-telegram-bot-api
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

const lineChart = async (ticker, ruedas, msg) => {
  //traigo info de 2000 dias anteriores
  let fecha_actual = new Date();
  let fecha_anterior = new Date();
  const datosExtraidos = 2000;
  fecha_anterior.setDate(fecha_anterior.getDate() - datosExtraidos);

  // formatear fechas en aaaa-mm-dd
  fecha_actual = fecha_actual.toISOString().split("T")[0];
  fecha_anterior = fecha_anterior.toISOString().split("T")[0];

  ///data[0] precios -- data[1] fechas -- data[2] volumen
  const data = await getDataHistoricaLine(
    `${ticker}`,
    fecha_anterior,
    fecha_actual
  );

  ///divido segun la cantidad
  const datos = data[0].slice(-Number(ruedas));
  const fechas_slice = data[1].slice(-Number(ruedas));
  const volumen_slice = data[2].slice(-Number(ruedas));

  const chartDetails = {
    type: "png",
    options: {
      title: {
        text: `${ticker.toUpperCase()}`,
      },
      subtitle: {
        text: `${fechas_slice[0]} hasta ${
          fechas_slice[fechas_slice.length - 1]
        }`,
      },
      xAxis: [
        {
          labels: {
            type: "datetime",
            rotation: 90,
            align: "top",
            style: {
              fontSize: "8px",
            },
          },
          categories: fechas_slice,
        },
      ],
      yAxis: [
        {
          labels: { enabled: true },
          offset: 1,
          title: {
            text: "",
          },
          height: "80%",
        },
        {
          labels: {
            enabled: false,
          },
          title: {
            text: "",
          },
          top: "80%",
          height: "20%",
          offset: 0,
        },
      ],
      series: [
        {
          showInLegend: false,
          type: "line",
          data: datos,
          id: "dataseries",
        },
        {
          showInLegend: false,
          type: "column",
          name: "Volume",
          data: volumen_slice,
          yAxis: 1,
          // pointWidth: 2
        },
      ],
      caption: {
        floating: true,
        x: 300,
        y: -200,
        text: "<em>@ArgStockBOT</em>",
      },
      exporting: {
        // sourceWidth: 1920,
        // sourceHeight: 1080,
        sourceWidth: 1280,
        sourceHeight: 800,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        line: {
          marker: {
            enabled: false,
          },
        },
      },
    },
  };

  chartExporter.initPool();
  chartExporter.export(chartDetails, (err, res) => {
    let imageb64 = res.data;
    const file = `image/jpg;base64,${imageb64}`;
    const fileOpts = {
      filename: "image",
      contentType: "image/jpg",
    };
    bot.sendPhoto(
      msg.chat.id,
      Buffer.from(file.substr(17), "base64"),
      fileOpts
    );
    chartExporter.killPool();
  });
};

const candlestickChart = async (
  ticker,
  ruedas,
  msg,
  periodo_ema1,
  periodo_ema2
) => {
  //traigo info de 2000 dias anteriores
  let fecha_actual = new Date();
  let fecha_anterior = new Date();
  const datosExtraidos = 2000;
  fecha_anterior.setDate(fecha_anterior.getDate() - datosExtraidos);

  // formatear fechas en aaaa-mm-dd
  fecha_actual = fecha_actual.toISOString().split("T")[0];
  fecha_anterior = fecha_anterior.toISOString().split("T")[0];

  ///data[0] precios -- data[1] fechas -- data[2] volumen
  const data = await getDataHistoricaCandleStick(
    `${ticker}`,
    fecha_anterior,
    fecha_actual
  );

  ///divido segun la cantidad
  const datos = data[0].slice(-Number(ruedas));
  const fechas_slice = data[1].slice(-Number(ruedas));
  const volumen_slice = data[2].slice(-Number(ruedas));

  //llevo la info de 'precios de cierre' a un array auxiliar
  let aux_array = data[0]
    .filter(function (obj) {
      if ("close" in obj) {
        return true;
      } else {
        return false;
      }
    })
    .map(function (obj) {
      return obj["close"];
    });

  //si no tiene ema
  let objetoEMA = { showInLegend: false };
  let objetoEMA2 = { showInLegend: false };
  if (!periodo_ema1 && !periodo_ema2) {
    objetoEMA = { showInLegend: false };
  } else if (!periodo_ema2) {
    //si tiene una sola ema

    //calculo ema para todo los datos extraidos
    const ema1 = ema(aux_array, {
      range: Number(periodo_ema1),
      format: function (num) {
        return Number(num);
      },
    });
    //'corto' la parte que voy a mostrar en pantalla
    const datos_ema1 = ema1.slice(-Number(ruedas));
    objetoEMA = {
      // showInLegend: false,
      name: `EMA ${periodo_ema1}`,
      type: "line",
      data: datos_ema1,
      color: "green",
      marker: false,
    };
  } else {
    //si tiene dos emas

    const ema1 = ema(aux_array, {
      range: Number(periodo_ema1),
      format: function (num) {
        return Number(num);
      },
    });
    const ema2 = ema(aux_array, {
      range: Number(periodo_ema2),
      format: function (num) {
        return Number(num);
      },
    });
    const datos_ema1 = ema1.slice(-Number(ruedas));
    const datos_ema2 = ema2.slice(-Number(ruedas));
    objetoEMA = {
      // showInLegend: false,
      name: `EMA ${periodo_ema1}`,
      type: "line",
      data: datos_ema1,
      color: "green",
      marker: false,
    };
    objetoEMA2 = {
      // showInLegend: false,
      name: `EMA ${periodo_ema2}`,
      type: "line",
      data: datos_ema2,
      color: "red",
      marker: false,
    };
  }

  //si la cant. ruedas es mayor a 250, saco los bordes de las candlestick
  let mayor250 = 0;
  ruedas > 250 ? (mayor250 = 0) : (mayor250 = 1);
  const chartDetails = {
    type: "png",
    options: {
      title: {
        text: `${ticker.toUpperCase()}`,
      },
      subtitle: {
        text: `${fechas_slice[0]} hasta ${
          fechas_slice[fechas_slice.length - 1]
        }`,
      },
      xAxis: [
        {
          labels: {
            type: "datetime",
            rotation: 90,
            align: "top",
            style: {
              fontSize: "8px",
            },
          },
          categories: fechas_slice,
        },
      ],
      yAxis: [
        {
          labels: { enabled: true },
          offset: 1,
          title: {
            text: "",
          },
          height: "80%",
        },
        {
          labels: {
            enabled: false,
          },
          title: {
            text: "",
          },
          top: "80%",
          height: "20%",
          offset: 0,
        },
      ],
      series: [
        {
          showInLegend: false,
          type: "candlestick",
          data: datos,
          id: "dataseries",
          color: "red",
          upColor: "green",
          lineWidth: mayor250,
        },
        objetoEMA,
        objetoEMA2,
        {
          showInLegend: false,
          type: "column",
          name: "Volume",
          data: volumen_slice,
          yAxis: 1,
          // pointWidth: 2,
        },
      ],
      caption: {
        floating: true,
        x: 300,
        y: -200,
        text: "<em>@ArgStockBOT</em>",
      },
      exporting: {
        // sourceWidth: 1920,
        // sourceHeight: 1080,
        sourceWidth: 1280,
        sourceHeight: 800,
      },
      credits: {
        enabled: false,
      },
      legend: {
        align: "center",
        verticalAlign: "top",
        x: 300,
        y: 0,
        floating: true,
      },
      plotOptions: {
        ema: {
          marker: false,
        },
        column: {
          color: "black",
        },
      },
    },
  };
  chartExporter.initPool();
  chartExporter.export(chartDetails, (err, res) => {
    let imageb64 = res.data;
    const file = `image/jpg;base64,${imageb64}`;
    const fileOpts = {
      filename: "image",
      contentType: "image/jpg",
    };
    bot.sendPhoto(
      msg.chat.id,
      Buffer.from(file.substr(17), "base64"),
      fileOpts
    );
    chartExporter.killPool();
  });
};

module.exports = {
  lineChart,
  candlestickChart,
};
