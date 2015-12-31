const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const jsonData = require('./posts/data.json');

var posts = undefined;

var BlogManager = {};

const PREVIEW_DELIMETER = '<preview/>';

// TODO: make async
BlogManager.getPostText = function(id) {
  var p = path.join(__dirname, 'posts', id + '.xml');
  return fs.readFileSync(p, 'utf8');
}

BlogManager.loadAllPosts = function() {
  function getPreview(id) {
    var text = BlogManager.getPostText(id);
    var cutIndex = text.indexOf(PREVIEW_DELIMETER);
    if(cutIndex !== -1) {
      text = text.substring(0, cutIndex);
    }
    return text;
  }

  var posts = _.map(jsonData.posts, jp => {
    var res = _.clone(jp);
    res.previewHtml = getPreview(jp.id);
    return res;
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
  text.replace(PREVIEW_DELIMETER, '');
  var res = _.clone(BlogManager.posts[postId]);
  res.html = text;
  return res;
}

module.exports = BlogManager;