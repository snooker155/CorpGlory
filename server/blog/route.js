const Render = require('../render.js');

const _ = require('underscore');
const libxmljs = require("libxmljs");
const fs = require('fs');
const path = require('path');


// MODELS

var posts = undefined;

// TODO: make async
function getPostText(id) {
  var p = path.join(__dirname, 'posts', id + '.xml');
  return fs.readFileSync(p, 'utf8');
}

function loadAllPosts() {
  function getPreview(id) {
    var text = getPostText(id);
    var cutIndex = text.indexOf('<preview/>');
    if(cutIndex !== -1) {
      text = text.substring(0, cutIndex);
    }
    return text;
  }
  var p = path.join(__dirname, 'posts', 'data.xml');
  var xmlText = fs.readFileSync(p, 'utf8');
  var xmlDoc = libxmljs.parseXml(xmlText);
  var xmlPosts = _.filter(
    xmlDoc.root().childNodes(),
    n => n.name() === 'post'
  );
  var posts = _.map(xmlPosts, xp => {
    var id = xp.attr('id').value();
    var title = xp.attr('title').value();
    var previewHtml = getPreview(id);
    return {
      id:id, 
      previewHtml: previewHtml,
      title: title
    };
  });

  var res = _.object(
    _.map(posts, p => [p.id, p])
  );

  return res;
}

posts = loadAllPosts();

function getPost(postId) {
  if(posts[postId] === undefined) {
    return undefined;
  }
  var text = getPostText(postId);
  text.replace('<preview/>', '');
  var res = _.clone(posts[postId]);
  res.html = text;
  return res;
}

// CONTROLLERS

function route (app) {
  app.get('/blog', function(req, res) {
    Render.renderInner(res, 'blog/list', {
      navigationTitle: 'Blog',
      title: 'Blog',
      posts: posts,
    });
  });

  app.get('/blog/(*)', function(req, res) {
    var postId = req.params[0];
    var post = getPost(postId);
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