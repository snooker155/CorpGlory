const _ = require('underscore');
const libxmljs = require("libxmljs");
const fs = require('fs');
const path = require('path');

var posts = undefined;

var BlogManager = {};

// TODO: make async
BlogManager.getPostText = function(id) {
  var p = path.join(__dirname, 'posts', id + '.xml');
  return fs.readFileSync(p, 'utf8');
}

BlogManager.loadAllPosts = function() {
  function getPreview(id) {
    var text = BlogManager.getPostText(id);
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
      id: id, 
      previewHtml: previewHtml,
      title: title
    };
  });

  var res = _.object(
    _.map(posts, p => [p.id, p])
  );

  return res;
}

BlogManager.posts = BlogManager.loadAllPosts();

BlogManager.getPost = function(postId) {
  if(BlogManager.posts[postId] === undefined) {
    return undefined;
  }
  var text = BlogManager.getPostText(postId);
  text.replace('<preview/>', '');
  var res = _.clone(BlogManager.posts[postId]);
  res.html = text;
  return res;
}

module.exports = BlogManager;