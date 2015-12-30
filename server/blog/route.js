_ = require('underscore');

function route (app) {
  function postFail(res, err, html) {
    if (err) {
      if (err.message.indexOf('Failed to lookup view') !== -1) {
        return res.status(404).send('not found');
      }
      throw err;
    }
    res.send(html);
  });
  
  app.get('/blog', function(req, res) {
    res.render('blog', {title:'Blog'});
  });

  app.get('/blog/(*)', function(req, res) {
    var path = 'posts/' + req.params[0];    
    var data = { title: 'Blog' };
    var callback = _.partial(postFail, res);
    res.render(path, data , callback);
  });
}


module.exports = route;