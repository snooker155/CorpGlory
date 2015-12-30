const _ = require('underscore');

const Render = {}

function getDefaultData(data) {
  var res = data;
  if(res === undefined) {
    res = {};
  }
  res._ = _;
  return res;
}

function render(res, view, data, callback) {
  if(callback !== undefined) {
    callback = _.partial(callback, res);
    res.render(view, data, callback);
  } else {
    res.render(view, data, callback);
  }
}

Render.renderBasic = function(res, view, data, callback) {
  var data = getDefaultData(data);
  data.layout = 'layouts/emptyLayout';
  render(res, view, data, callback);
}

Render.renderInner = function(res, view, data, callback) {
  var data = getDefaultData(data);
  data.layout = 'layouts/innerPageLayout';
  render(res, view, data, callback);
}

module.exports = Render;