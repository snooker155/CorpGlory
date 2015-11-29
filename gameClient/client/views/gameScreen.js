Template.gameScreen.onRendered(function () {
  Communication.open();
});

Template.gameScreen.init = function(data) {
  // set colors
  data[0].color = "#0f5b78";
  data[1].color = "#a2b86c";
  data[2].color = "#ef8b2c";
  
  var map = {};
  var regionAttr = {
    "fill": "#eee",
    "stroke": "#888",
    "stroke-width": 0.6,
    "stroke-linejoin": "round"
  };
  
  var svgHeight = 320;
  var svgWidth = 600;
  
  var R = Raphael("worldMapHolder", "100%", "100%");
  R.setViewBox(0, 0, svgWidth, svgHeight, false);
  
  for(var c in MapData) {
    var region = R.path(MapData[c].path).attr(regionAttr);
    map[c] = {
      region: region,
      marketShare: new MapMarketShare(
        c, MapData[c].cx, MapData[c].cy, R.canvas, region[0], data
      )
    }
  }

  MarketShare.init(data);
};

Template.gameScreen.onNextState = function(stage) {
  var money = stage.world.ptr_wrapper.data.model.ptr_wrapper.data.companies[0].ptr_wrapper.data.money;
  var companies = stage.world.ptr_wrapper.data.model.ptr_wrapper.data.companies;
  var shares = {};
  for(var i = 0; i < companies.length; i++) {
    shares[companies[i].ptr_wrapper.data.name] = companies[i].ptr_wrapper.data.market_share;
  }
  MarketShare.updateBalance(money);
  MarketShare.updateCompanyShares(shares);
};

