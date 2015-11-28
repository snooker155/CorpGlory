Template.gameScreen.onRendered(function () {
  Communication.open();
});

Template.gameScreen.init = function(data) {
  var map = {};
  var regionAttr = {
    fill: "#fff",
    stroke: "#888",
    "stroke-width": .5,
    "stroke-linejoin": "round"
  };
  
  var svgHeight = 400;
  var svgWidth = 1000;
  
  var R = Raphael("worldMapHolder", "100%", "100%");
  R.setViewBox(0, 0, svgWidth, svgHeight, false);
  
  for(var c in MapData) {
    map[c] = R.path(MapData[c]).attr(regionAttr);
  }
  
  MarketShare.init();
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

