const SubscriptionManager = require('./SubscriptionManager.js');
const Render = require('./../render.js');


function route (app) {
  app.get('/subscribtions', function(req, res) {
    res.redirect('/subscriptions');
  });
  
  app.get('/subscriptions', function(req, res) {
    Render.renderBasic(res, 'subscriptions');
  });

  app.post('/subscribtions', function(req, res) {
    const success = SubscriptionManager.updateEmailSubscribtion(
      req,
      req.body.email,
      req.body.subType
    );
    if(success) {
      Render.renderBasic(res, 'subscriptionsOk');
    } else {
      Render.renderBasic(res, 'subscriptionsInvalid');
    }
  });
}

module.exports = route;