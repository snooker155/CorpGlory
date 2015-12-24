// REQUIRES

var express = require('express'),
    expressLayouts = require('express-ejs-layouts');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var randomstring = require("randomstring");

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

// views
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/innerPageLayout');

// middleware
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());                           // to process
app.use(bodyParser.urlencoded({ extended: true }));   // request params
app.use(expressLayouts);

// CONTROLLERS

function isEmailValid(email) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return regex.test(email);
}

function getClientIP(req) {
  var ip = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;
  return ip;
}

function updateEmailSubscribtion(email, type, ip) {
  var fileName = randomstring.generate({
    length: 10,
    charset: 'alphabetic'
  }) + ".txt";
  var stream = fs.createWriteStream(
    path.join(DATA_PATH, fileName)
  );
  stream.once('open', function(fd) {
    stream.write(email + "\n");
    stream.write(type + "\n");
    stream.write(ip);
    stream.end();
  });
}

// ROUTES

function renderBasic(res, view, data) {
  if(data === undefined) {
    data = {}
  }
  data.layout = 'layouts/emptyLayout';
  res.render(view, data);
}

// index
app.get('/', function(req, res) {
  var host = req.get('host');
  var language = 'en';
  if(host.indexOf(".ru") != -1) {
    language = 'ru';
  }
  renderBasic(res, 'index', { language: language });
});

app.post('/', function(req, res) {
  if(isEmailValid(req.body.email)) {
    updateEmailSubscribtion(req.body.email, 'all', getClientIP(req));
    renderBasic(res, 'subscribtionsOk');
  }
  else {
    renderBasic(res, 'subscribtionsInvalid');
  }
});

// subsribtions
app.get('/subscribtions', function(req, res) {
  renderBasic(res, 'subscribtions');
});

app.post('/subscribtions', function(req, res) {
  if(isEmailValid(req.body.email)) {
    updateEmailSubscribtion(
      req.body.email,
      req.body.subType,
      getClientIP(req)
    );
    renderBasic(res, 'subscribtionsOk');
  }
  else {
    renderBasic(res, 'subscribtionsInvalid');
  }
});

// press

app.get('/press', function(req, res) {
  res.render('press', {title:'Press'});
});

// blog

app.get('/blog', function(req, res) {
  res.render('blog', {title:'Blog'});
});

app.get('/blog/(*)', function(req, res) {
  res.render('posts/' + req.params[0], {title:'Blog'}, function(err, html) {
    if (err) {
      if (err.message.indexOf('Failed to lookup view') !== -1) {
        return res.status(404).send('not found');
      }
      throw err;
    }
    res.send(html);
  });
});


// RUN

var server = app.listen(SERVER_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
