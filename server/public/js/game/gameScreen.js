
GameScreen = {};

GameScreen.init = function(data) {
  
  $("#gameScreenHolder").fadeIn();
  
  // set colors
  data.players[0].color = "#0f5b78";
  data.players[1].color = "#a2b86c";
  data.players[2].color = "#ef8b2c";

  // bind events
  WorldMap.onRegionClick = GameScreen.onRegionClick;

  // init game elements
  WorldMap.init(data);
  MarketShare.init(data);
};

GameScreen.onRegionClick = function(regionId) {
  Communication.userAction(
    'regionClick', { id: regionId }
  );
}

GameScreen.update = function(data) {
  var money = data.player.money;
  var companies = {};
  var shares = {};
  for(var i = 0; i < companies.length; i++) {
    shares[companies[i].ptr_wrapper.data.name] = companies[i]
      .ptr_wrapper.data.market_share;
  }
  MarketShare.updateBalance(money);
  MarketShare.updateCompanyShares(shares);
};

$(function() {
  $("#gameScreenHolder").hide();
});