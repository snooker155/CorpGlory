const SubscriptionManager = require('./SubscriptionManager.js');
const Render = require('./../render.js');


function route (app) {
  app.get('/subscribtions', function(req, res) {
    Render.renderBasic(res, 'subscribtions');
  });

  app.post('/subscribtions', function(req, res) {
    const success = SubscriptionManager.updateEmailSubscribtion(
      req,
      req.body.email,
      req.body.subType
    );
    if(success) {
      Render.renderBasic(res, 'subscribtionsOk');
    } else {
      Render.renderBasic(res, 'subscribtionsInvalid');
    }
  });
}

module.exports = route;