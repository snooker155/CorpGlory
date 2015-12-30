// REQUIRES

var express = require('express'),
    expressLayouts = require('express-ejs-layouts');
var path = require('path');
var bodyParser = require('body-parser');

const SubscriptionManager = require(
  './subscriptions/subscriptionManager.js'
);
const Render = require('./render.js');

// CONFIGURE

var SERVER_PORT = 3000;

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


// ROUTES

// index
app.get('/', function(req, res) {
  Render.renderBasic(res, 'index');
});

app.post('/', function(req, res) {
  const success = SubscriptionManager.updateEmailSubscribtion(
    req, req.body.email, 'all'
  );
  if(success) {
    Render.renderBasic(res, 'subscriptionsOk');
  } else {
    Render.renderBasic(res, 'subscriptionsInvalid');
  }
});


// press

app.get('/press', function(req, res) {
  res.render('press', {title:'Press'});
});

// blog
require('./blog/route.js')(app);

// subsribtions
require('./subscriptions/route.js')(app);



// RUN

var server = app.listen(SERVER_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
