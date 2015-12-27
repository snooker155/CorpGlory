// CONFIG

const SERVER_PORT = 3000;
const DATA_FOLDER = 'data';

// REQUIRES

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = require('express')();
const http = require('http').Server(app);

const DATA_PATH = path.join(__dirname, DATA_FOLDER);


if (!fs.existsSync(DATA_PATH)) {
  fs.mkdirSync(DATA_PATH);
}

if(process.argv.length > 2) {
  SERVER_PORT = parseInt(process.argv[2]);
}

// views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use("/public", express.static(path.join(__dirname, 'public')));


// RUN

const server = app.listen(SERVER_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

const io = require('socket.io').listen(server);

require('./game/route.js')(app, io);

app.get('/', function(req, res) {
  res.redirect('/game');
});
