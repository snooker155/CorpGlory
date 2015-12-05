// REQUIRES

var express = require('express');
var path = require('path');

// CONFIGURE

var SERVER_PORT = 4000;

if(process.argv.length > 2) {
  SERVER_PORT = parseInt(process.argv[2]);
  console.log(SERVER_PORT);
}

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/public", express.static(path.join(__dirname, 'public')));

// ROUTES

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/subscribtions', function(req, res) {
  res.render('subscribtions');
});

// RUN

var server = app.listen(SERVER_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});