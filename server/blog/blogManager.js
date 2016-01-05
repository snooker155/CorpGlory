const _ = require('underscore');
const fs = require('fs');
const path = require('path');

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
  
  var data = require('./posts/data.json'); // ordered posts array
  BlogManager.posts = data.posts;
  BlogManager.idPost = {}; // map id -> post

  _.each(BlogManager.posts, jp => {
    jp.previewHtml = getPreview(jp.id);
    BlogManager.idPost[jp.id] = jp;
    if(jp.alias !== undefined) {
      BlogManager.idPost[jp.alias] = jp;
    }
  });
}

BlogManager.loadAllPosts();

// return undefined if it IS NOT an alias
// return targetId if it IS an alias
BlogManager.aliasCheck = function(postId) {
  var p = BlogManager.idPost[postId];
  if(p === undefined) {
    return undefined;
  }
  if(p.id === postId) {
    return undefined;
  }
  return p.id;
}

BlogManager.getPost = function(postId) {
  const post = BlogManager.idPost[postId];
  if(post === undefined) {
    return undefined;
  }
  if(post.id !== postId) {
    res.redirect(301, post.id);
    return;
  }
  
  var text = BlogManager.getPostText(post.id)
                        .replace(PREVIEW_DELIMETER, '');
  var res = _.clone(post);
  res.html = text;
  return res;
}

module.exports = BlogManager;