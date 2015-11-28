Template.gameScreen.onRendered(function () {
  
  // [x, y] -> [x, y]
  function svgPosToPagePos(pos) {
    var svgObj = $("#worldMapHolder svg");
    var vbArray = svgObj[0].getAttribute("viewBox").split(/\s+|,/);
    var xScale =  svgObj.width() / parseFloat(vbArray[2]);
    var yScale = svgObj.height() / parseFloat(vbArray[3]);
    var scale = Math.min(xScale, yScale);
    var svgPos = svgObj.offset();
    
    var xRes = pos[0] * scale +  svgPos.left;
    var yRes = pos[1] * scale +  svgPos.top;
    
    return [xRes, yRes];
    
  }
  
  $(window).resize(function() {
    console.log($("#worldMapHolder svg").width());
    console.log($("#worldMapHolder svg").height());
  });
  
  function render_map(R, map, attr) {
    for(var c in MapData) {
      map[c] = R.path(MapData[c]).attr(attr);
    }
  }
  
  var current = null;
  var currentSelectedEvent = undefined;
  var map = {};
  var m = {};
  var attr = {
    fill: "#fff",
    stroke: "#888",
    "stroke-width": .5,
    "stroke-linejoin": "round"
  };
  
  
  var svgHeight = 400;
  var svgWidth = 1000;
  var left_offset = $("#worldMapHolder").offset().left * (-1);
  
  var R = Raphael("worldMapHolder", "100%", "100%");
  
  R.setViewBox(0, 0, svgWidth, svgHeight, false);
  
  render_map(R, map, attr);
  for (var state in map) {
    map[state].color = Raphael.getColor();
    (function (st, state) {
      st[0].style.cursor = "pointer";
      st[0].onmouseover = function () {
        current && map[current].animate({fill: "#fff", stroke: "#666"}, 300);
        st.animate({fill: st.color, stroke: "#ccc"}, 300);
        R.safari();
        current = state;
      };
      st[0].onmouseout = function () {
        st.animate({fill: "#fff", stroke: "#666"}, 300);
        R.safari();
      };
      
      st[0].onclick = function (e) {
        alert(state);
      };
    })(map[state], state);
  }
  
  function lon2x(lon) {
    var xfactor = 2.752;
    var xoffset = 473.75;
    var x = (lon * xfactor) + xoffset;
    return x;
  }
  
  function lat2y(lat) {
    var yfactor = -2.753;
    var yoffset = 231;
    var y = (lat * yfactor) + yoffset;
    return y;
  }
  
  var city_attr = {
    fill: "#0f0",
    stroke: "#000",
    opacity: .3
  };
  
  function plot(lat, lon, size, lifetime) {
    size = size * .5 + 4;
    var circle = R.circle(lon2x(lon), lat2y(lat), size).attr(city_attr);
    return circle;
  }
  
  // Communications
  Communication.onNextState = function(stage) {
    var money = stage.world.ptr_wrapper.data.model.ptr_wrapper.data.companies[0].ptr_wrapper.data.money;
    var companies = stage.world.ptr_wrapper.data.model.ptr_wrapper.data.companies;
    var shares = {};
    for(var i = 0; i < companies.length; i++) {
      shares[companies[i].ptr_wrapper.data.name] = companies[i].ptr_wrapper.data.market_share;
    }
    MarketShare.updateBalance(money);
    MarketShare.updateCompanyShares(shares);
  };
  
  Communication.open();
  
});