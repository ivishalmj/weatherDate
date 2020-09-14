const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const request = require('request');
var path = require('path');
const constents = require('./constents');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.send("App Started!!!!")
})

app.use('/getWeather', async (req, res) => {

    //************ Getting Current Day */
    let currentDay = new Date().getDate();
    console.log("Current Day \n", currentDay);

    //********* Checking if Number is Prime or Not */
    let checkPrime = await isPrime(currentDay);

    console.log("Prime Checker Result \n", checkPrime);

    if (checkPrime) {
        // let cityName = req.body.city_name || process.env.CITY_NAME;

        //console.log("City Name \n", cityName);
        // console.log('constents.url.apikey', constents.cityname.city_name);
        let reqUrl = `https://api.openweathermap.org/data/2.5/weather?q=${constents.cityname.city_name}&appid=${constents.url.apikey}` 

        //********** Getting Weather Data using OpenWeatherAPI */
        request(reqUrl, async function (err, response, body) {
            //console.log(err,"ddddddddddddddddddddddddddd", body)
            if (err) {
                //console.log("Error :\n", err)
                res.status(500).send({ code: 500, content: null, message: "Internal Server Error", error: err })
                return;
            } else {
                // console.log("Weather Data of City \t", cityName, "\t \t \t", body);
                body = JSON.parse(body);
                res.status(200).send({ code: 200, content: null, message : "Date is prime", error : null})

            }
})
    } else {
        res.status(200).send({ code: 200, content: null, message: "Date is not a prime.", })

    }
})
app.listen(3080, () => {
    console.log("started web process at Port 3080");
});

async function isPrime(number) {

    if (number <= 1) {
        return false;
    }
    for (var i = 2; i < number; i++)
        if (number % i === 0)
            return false;

    return true;
}