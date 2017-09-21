var express = require('express');
var app = express();

var MAX_RANDOM_NUMBER = 10000;

function randomInt(maxInt) {
  return Math.floor((Math.random() * maxInt) + 1);
}

var currentRandomNumber = randomInt(MAX_RANDOM_NUMBER);

app.get('/randomize', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  currentRandomNumber = randomInt(MAX_RANDOM_NUMBER);
	res.send("randomized");
});

app.get('/guess/:number', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var guess = req.params.number;
  if(currentRandomNumber > guess) {
    res.send("1");
  } else if (currentRandomNumber < guess) {
    res.send("-1");
  } else {
    res.send("0");
  }
});

app.get('/debug', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.send("[DEBUG] current random number "+currentRandomNumber);
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});
