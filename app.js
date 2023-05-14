const express = require("express");
const meteo = require(__dirname + "/my-modules/api-calls.js");
const weekDate = require(__dirname + "/my-modules/date.js")
// const request = require ('request')
const axios = require('axios');
// const path = require('path')
const bodyParser = require("body-parser");
const telegramBot = require('node-telegram-bot-api');
const { response } = require("express");
require('dotenv').config();

const app = express();

// Telegram bot
// const telegramTOKEN = process.env.TOKEN;
// const bot = new telegramBot(telegramTOKEN, { polling: true });

// bot.on("message",async (message) => {
//     meteo.sendMeteoBot(bot, message)
// });

// 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', "ejs");

app.get("/", async (req, res) => {
    let city = "Milano";
    await meteo.getMeteo(res, city);
});

app.get("/no-city", (req, res) => {
    res.redirect("/");
})

app.get('/:city', async (req, res) => {
    let city = req.params.city;
    if (city != "favicon.ico") {
        await meteo.getMeteo(res, city);
    }
})

app.post('/', async (req, res) => {
    let city = req.body.city;
    if (city === "") {
        res.redirect("/");
    } else {
        await meteo.getMeteo(res, city);
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
})
