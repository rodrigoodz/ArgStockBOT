# ArgStockBot

ArgStockBOT es un bot de telegram que surgió por la necesidad de tener una forma rápida y sencilla de obtener cotizaciones actuales de ciertas empresas argentinas, sin tener que consultar en una página especifica. Posteriormente, se implementó un método para obtener la cotización actual del dólar, y ciertos recordatorios previos a la apertura y cierre de la bolsa. En el futuro, si surge alguna funcionalidad que se considere pertinente de ser agregada, se desarrollará.

El bot fue realizado completamente en Javascript, mediante NodeJS, utilizando los siguientes modulos:
<br>
[node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api).
<br>
[dotenv](https://www.npmjs.com/package/dotenv)
<br>
[stock-info](https://www.npmjs.com/package/stock-info)
<br>
[fs-filesystem](https://www.npmjs.com/package/fs-filesystem)
<br>
[node-bluelytics](https://www.npmjs.com/package/node-bluelytics)
<br>
[express](https://www.npmjs.com/package/express)
<br>
[woke-dyno](https://www.npmjs.com/package/woke-dyno)

<hr>

## Comandos

**/start**

**/comandos**

**/tickers** ->muestra una lista todos los tickers argentinos que pueden ser consultados

**/ticker (ticker_argentino)** -> consultar un ticker particular del mercado argentino

**/dolar** -> obtener precio del dolar actual (a partir de Bluelytics)

**/about** -> acerca de

<hr>

Contactar <br>
[@ArgStockBOT](https://telegram.me/ArgStockBot)

<hr>

[![mercadopago](https://img.shields.io/badge/Donar-MercadoPago-green)](https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=83617641-ae4ea1f1-0674-4ddb-bde5-227c20187147)
[![Donar](https://img.shields.io/badge/Donar-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=WQWFXA3P3NP8E&currency_code=USD&source=url)
