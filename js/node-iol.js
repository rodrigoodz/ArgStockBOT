/* MIT License

Copyright (c) 2020 Luis Paolini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.  */

/// Al desplegar en Heroku, como no puedo manipular archivos .json, todo la data del token la manejo
/// dentro de la variable dataIOL
require("dotenv").config({ path: __dirname + "../.env" });
const axios = require("axios");
const querystring = require("querystring");

// const fs = require("fs").promises;
// const credentials = require("../auth.json");
const username = process.env.usuario1;
const password = process.env.password;
const grant_type = process.env.grant_type;

let apiUrl = "https://api.invertironline.com/api/v2";

let dataIOL = {};

async function getTicker(token, market, asset) {
  let res = await axios
    .get(`${apiUrl}/${market}/Titulos/${asset}`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
    .catch((err) => {
      if (err.response.status) {
        return {
          data: { descripcion: "Error" },
        };
      }
    });
  return res.data;
}

async function getTickerValue(token, market, asset) {
  let res = await axios
    .get(`${apiUrl}/${market}/Titulos/${asset}/Cotizacion`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
    .catch((err) => {
      if (err.response.status) {
        return {
          data:
            "El ticker solicitado no existe, escriba el comando /tickers para ver la lista de tickers",
        };
      }
    });
  return res.data;
}

async function readToken() {
  let token = dataIOL;
  return token;
}

async function auth() {
  if (Object.keys(dataIOL).length !== 0) {
    let token = dataIOL;
    if (new Date(token[".expires"]) < new Date()) {
      if (new Date(token[".refreshexpires"]) < new Date()) {
        await getToken();
        return await readToken();
      } else {
        // await fs.unlink("token.json");
        await getToken(token.refresh_token);
        return await readToken();
      }
    } else {
      return token;
    }
  } else {
    await getToken();
    return await readToken();
  }
}

async function getToken(refreshToken) {
  let creds = "";
  if (refreshToken) {
    creds = querystring.stringify({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });
  } else {
    creds = querystring.stringify({
      username: process.env.usuario1,
      password: process.env.password,
      grant_type: process.env.grant_type,
    });
  }
  let token = await axios.post("https://api.invertironline.com/token", creds);
  dataIOL = token.data;
}

module.exports = {
  getTicker,
  getTickerValue,
  auth,
};
