const Render = require('../render.js');
const BlogManager = require('./blogManager.js');

// MODELS

// CONTROLLERS

function route (app) {
  app.get('/blog', function(req, res) {
    Render.renderInner(res, 'blog/list', {
      navigationTitle: 'Blog',
      title: 'Blog',
      posts: BlogManager.posts,
    });
  });

  app.get('/blog/(*)', function(req, res) {
    var postId = req.params[0];
    var post = BlogManager.getPost(postId);
    if(post === undefined) {
      res.status(404).send('not found');
      return;
    }
    Render.renderInner(res, 'blog/post', {
      navigationTitle: 'Blog',
      title: post.title,
      post: post
    });
  });
}


module.exports = route;