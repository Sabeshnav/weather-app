var https = require('https');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var app = express();
app.use(bodyParser.urlencoded({entended: true}));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.post('/', function(req, res){
  const city = req.body.CityName;
  const apiKey = 'f4f1f8787967d3f8a012af0ec4902afd';
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.write('<p>' + city + ' is curently ' + weatherDescription +'</p>');
      res.write('<p>Temperature : ' + temp + ' degree Celcius</p>');
      res.send();
    });
  });
});
app.listen(process.env.PORT || 8080, function () {
  console.log('Server started!');
});

