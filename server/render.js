var Render = {}

Render.renderBasic = function(res, view, data) {
  if(data === undefined) {
    data = {}
  }
  data.layout = 'layouts/emptyLayout';
  res.render(view, data);
}

module.exports = Render;