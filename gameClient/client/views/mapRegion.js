var REGION_ATTR = {
  "fill": "#eee",
  "stroke": "#888",
  "stroke-width": 0.6,
  "stroke-linejoin": "round"
};

MapRegion = function (id, mapDataObj, raphaelObj, initData) {
  this.region = raphaelObj.path(mapDataObj.path).attr(REGION_ATTR);
  this.marketShare = new MapMarketShare(
    id, mapDataObj.cx, mapDataObj.cy,
    raphaelObj.canvas, this.region[0], initData
  );
}

var MapMarketShare = function(id, cx, cy, svg, region, companies) {
  function mkSVG(tag) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
  }
  // make clip
  var clipId = "clip" + id;
  var clipTag = $(mkSVG("clipPath")).attr("id", clipId);
  var clipPath = $(mkSVG("path")).attr("d", $(region).attr("d"));
  clipTag.append(clipPath);
  $(svg).find("defs").append(clipTag);
  
  // find center
  var box = region.getBBox();
  this.cx = cx;
  this.cy = cy;
  this.r = Math.max(box.width, box.height);
  
  // make sectors
  var group = $(mkSVG("g")).attr("clip-path", "url(#" + clipId + ")");
  for(var i = 0; i < companies.length; i++) {
    var path = $(mkSVG("path"))
        .attr("fill", companies[i].color)
        .attr("fill-opacity", "0.3");
    group.append(path);
  }
  $(svg).append(group);
  this.g = group;
  this.updateValues([0.3, 0.4, 0.1]);
  
};

MapMarketShare.prototype.updateValues = function(values) {
  function getSectorPath(cx, cy, r, startAngle, endAngle) {
    var x1 = cx + r * Math.cos(-startAngle),
        x2 = cx + r * Math.cos(-endAngle),
        y1 = cy + r * Math.sin(-startAngle),
        y2 = cy + r * Math.sin(-endAngle);
    var anglePositive = +(endAngle - startAngle > Math.PI);
    var resArr = [
      "M", cx, cy, "L", x1, y1, "A", r, r,
      0, anglePositive, 0, x2, y2, "z"
    ];
    return resArr.join(" ");
  }
  
  var sectors = $(this.g).find("path");
  var angleSum = 0;
  for(var i = 0; i < values.length; i++) {
    var aFrom = angleSum;
    var aTo = angleSum + 2 * Math.PI * values[i];
    $(sectors[i]).attr(
      "d", getSectorPath(this.cx, this.cy, this.r, aFrom, aTo)
    );
    angleSum = aTo;
  }
};