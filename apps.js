const bodyParser = require("body-parser");
const express = require("express");
const app = express(); 
const https = require('node:https');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
   res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req,res){
    
    const query = req.body.cityName;
    const apiKey = "44d209bdb71f6887d5802ed5e170c5e7" 
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            cloud = weatherData.weather[0].main
            temp = weatherData.main.temp;
            description = weatherData.weather[0].description;
            feel = weatherData.main.feels_like;
            icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature today in " + query + " is " + temp + "C, with " + description + ", which makes it feel like " + feel + "C .</h1>")
            res.write("<img src=" + imageURL + ">")
            res.send()
        })
    })

})

app.listen(3000, function(){
    console.log("Server is running at port 3000");
});