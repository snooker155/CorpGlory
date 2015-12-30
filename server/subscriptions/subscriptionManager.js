const randomstring = require("randomstring");
const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_PATH)){
  fs.mkdirSync(DATA_PATH);
}

var SubscriptionManager = {};

function getClientIP(req) {
  var ip = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;
  return ip;
}

SubscriptionManager.updateEmailSubscribtion = function(req, email, type) {
  if(!SubscriptionManager.isEmailValid(req.body.email)) {
    return false;
  }
  var ip = getClientIP(req);
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
  return true;
}

SubscriptionManager.isEmailValid = function(email) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return regex.test(email);
}

module.exports = SubscriptionManager;