// REQUIRES

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

// CONFIGURE

var SERVER_PORT = 4000;
var DATA_PATH = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_PATH)){
  fs.mkdirSync(DATA_PATH);
}

if(process.argv.length > 2) {
  SERVER_PORT = parseInt(process.argv[2]);
}

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// ROUTES

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/subscribtions', function(req, res) {
  res.render('subscribtions');
});

app.post('/subscribtions', function(req, res) {
  var stream = fs.createWriteStream(
    path.join(DATA_PATH, "my_file.txt")
  );
  stream.once('open', function(fd) {
    stream.write(req.body.email + "\n");
    stream.write(req.body.subType + "\n");
    stream.end();
  });

  res.render('subscribtionsOk');
});

// RUN

var server = app.listen(SERVER_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});