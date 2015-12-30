const Render = require('../render.js');

const _ = require('underscore');
const libxmljs = require("libxmljs");
const fs = require('fs');
const path = require('path');


// MODELS

// TODO: make async
function getPostText(id) {
  var p = path.join(__dirname, 'posts', id + '.xml');
  return fs.readFileSync(p, 'utf8');
}

function getAllPosts() {
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
    var previewHtml = getPreview(id);
    return {
      id: id, previewHtml: previewHtml
    };
  });
  return posts;
}

function getPost(postId) {
  var text = getPostText(postId);
  return text.replace('<preview/>', '');
}

// CONTROLLERS

function route (app) {
  function postFail(res, err, html) {
    if (err) {
      if (err.message.indexOf('Failed to lookup view') !== -1) {
        return res.status(404).send('not found');
      }
      throw err;
    }
    res.send(html);
  };

  app.get('/blog', function(req, res) {
    var posts = getAllPosts();
    Render.renderInner(res, 'blog/list', {
      title: 'Blog',
      posts: posts,
    });
  });

  app.get('/blog/(*)', function(req, res) {
    var postId = req.params[0];
    var data = {
      title: 'Blog',
      post: {
        html: getPost(postId)
      }
    };
    Render.renderInner(res, 'blog/post', data, postFail);
  });
}


module.exports = route;