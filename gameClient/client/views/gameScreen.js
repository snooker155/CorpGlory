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
  
  var dot = R.circle().attr({fill: "r#FE7727:50-#F57124:100", stroke: "#fff", "stroke-width": 2, r: 0});
  
  var cities = {};
  
  cities.Afghanistan = plot(33.93911, 67.709953, 20, 5);
  cities.Azerbaijan = plot(40.143105, 47.576927, 2, 5);
  cities.Bolivia = plot(-16.290154, -63.588653, 1, 5);
  cities.Brazil = plot(-14.235004, -51.92528, 3, 5);
  cities.Cameroon = plot(7.369722, 12.354722, 1, 5);
  cities.Colombia = plot(4.570868, -74.297333, 1, 5);
  cities.DRC = plot(-4.038333, 21.758664, 2, 5);
  cities.DR = plot(18.735693, -70.162651, 1, 5);
  cities.Ecuador = plot(-1.831239, -78.183406, 1, 5);
  cities.Georgia = plot(42.315407, 43.356892, 1, 5);
  cities.Guatemala = plot(15.783471, -90.230759, 1, 5);
  cities.Indonesia = plot(-0.789275, 113.921327, 3, 5);
  cities.Iraq = plot(33.223191, 43.679291, 25, 5);
  cities.Ivory_Coast = plot(7.539989, -5.54708, 1, 5);
  cities.Kazakhstan = plot(48.019573, 66.923684, 1, 5);
  cities.Kenya = plot(-0.023559, 37.906193, 1, 5);
  cities.Kyrgyzstan = plot(41.20438, 74.766098, 1, 5);
  cities.Libya = plot(26.3351, 17.228331, 7, 5);
  cities.Mexico = plot(23.634501, -102.552784, 24, 5);
  cities.Nepal = plot(28.394857, 84.124008, 4, 5);
  cities.Nigeria = plot(9.081999, 8.675277, 3, 5);
  cities.Pakistan = plot(30.375321, 69.345116, 17, 5);
  cities.Philippines = plot(12.879721, 121.774017, 35, 5);
  cities.Russia = plot(66.416667, 94.25, 70, 5);
  cities.Moscow = plot(55.755833, 37.617778, 40, 5);
  cities.Somalia = plot(5.152149, 46.199616, 11, 5);
  cities.Sri_Lanka = plot(7.873054, 80.771797, 6, 5);
  cities.Syria = plot(34.802075, 38.996815, 1, 5);
  cities.Tunisia = plot(33.886917, 9.537499, 1, 5);
  cities.Turkmenistan = plot(38.969719, 59.556278, 1, 5);
  cities.Uganda = plot(1.373333, 32.290275, 1, 5);
  cities.Venezuela = plot(6.42375, -66.58973, 1, 5);
  cities.Yemen = plot(15.552727, 48.516388, 5, 5);
  cities.Zimbabwe = plot(-19.015438, 29.154857, 2, 5);
  
  // Tooltip
  function activateEvent(ev) {
    diactivateEvent();
    currentSelectedEvent = ev;
    var svgObj = cities[ev][0];
    svgObj.style.display = "none";
    var cPos = [
      parseFloat($(svgObj).attr('cx')),
      parseFloat($(svgObj).attr('cy'))
    ];
    var resPos = svgPosToPagePos(cPos);
    $("#tooltip")
        .show()
        .css("left", resPos[0] + "px")
        .css("top", resPos[1] + "px");
  }
  
  function diactivateEvent() {
    $("#tooltip").hide();
    if (currentSelectedEvent === undefined) {
      return;
    }
    cities[currentSelectedEvent][0].style.display = "";
    currentSelectedEvent = undefined;
  }
  
  $("#tooltip #tooltipCancel").click(diactivateEvent);
  
  // Bind events to tooltip
  for (var city in cities) {
    map[state].color = Raphael.getColor();
    (function (st, city) {
      st[0].style.cursor = "pointer";
      st[0].onclick = function (e) {
        activateEvent(city);
      };
    })(cities[city], city);
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