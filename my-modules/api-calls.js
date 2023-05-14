// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

// var str="http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=e06672eb3d022cf9dbdffb18d384e515";

const axios = require('axios');
const bodyParser = require("body-parser");
const e = require('express');
const weekDate = require(__dirname + "/date.js")
const telegramBot = require('node-telegram-bot-api');


exports.getMeteo = (res,city) => {
    var data = weekDate.getWeekData();
    axios.get("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=adcb01a998523a982c8f04bd3e13e248")
        .then(response => {
            if (typeof response.data[0] === 'undefined'){
                res.render("error404", {
                });
            }else{
                var lat = response.data[0].lat.toPrecision(5);
                var lon = response.data[0].lon.toPrecision(5);
                axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,current,minutely&lang=it&units=metric&appid=adcb01a998523a982c8f04bd3e13e248")
                .then(giorni => {
                    res.render("meteo", {
                        giorni: giorni.data.daily,
                        data: data,
                        city:city,
                    });
                })
                .catch(error => {
                    console.error(error);
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
}

exports.sendMeteoBot = (bot, message) =>{
    
    let chat_id = message.from.id;
    let city = message.text;
    if (message.text === '/start') return 
    axios.get("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=adcb01a998523a982c8f04bd3e13e248")
        .then(response => {
            if (response.data[0] === undefined){
                bot.sendMessage(chat_id, "La citta' indicata non esiste!")
            }else{
                var lat = response.data[0].lat.toPrecision(5);
                var lon = response.data[0].lon.toPrecision(5);
                axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,current,minutely&lang=it&units=metric&appid=adcb01a998523a982c8f04bd3e13e248")
                .then(giorno => {
                    var str = "Il meteo di " + city + " e':\n" +
                    "Descrizione: " + giorno.data.daily[0].weather[0].description + "\n" + 
                    "Temperatura massima : " +  Math.trunc(giorno.data.daily[0].temp.max) + " C° \n" + 
                    "Temperatura minima: " + Math.trunc(giorno.data.daily[0].temp.min)+ "C° \n" +
                    "Per ulteriori informazioni sul meteo della settimana visita questo sito: \n" +
                    "https://meteo-now-progweb.herokuapp.com/"+city;
                    bot.sendMessage(chat_id, str);
                })
                .catch(error => {
                    console.error(error);
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
}