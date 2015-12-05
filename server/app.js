// REQUIRES

var express = require('express');
var http = require('http').Server(app);
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

// ROUTES

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  console.log("/ ???");
  res.render('index');
});

// RUN

var server = app.listen(SERVER_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});