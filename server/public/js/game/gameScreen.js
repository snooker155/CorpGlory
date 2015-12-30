
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
    'regionClick', { regionId: regionId }
  );
}

GameScreen.update = function(data) {
  var money = data.player.money;
  var shares = data.regions['EU'].shares;
  MarketShare.updateBalance(money);
  MarketShare.updateCompanyShares(shares);
  WorldMap.update(data);
};

$(function() {
  $("#gameScreenHolder").hide();
});