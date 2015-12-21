Template.gameScreen.onRendered(function () {
  Communication.open();
});

Template.gameScreen.init = function(data) {
  // set colors
  data[0].color = "#0f5b78";
  data[1].color = "#a2b86c";
  data[2].color = "#ef8b2c";

  // bind events
  WorldMap.onRegionClick = Template.gameScreen.onRegionClick;

  // init game elements
  WorldMap.init(data);
  MarketShare.init(data);
};

Template.gameScreen.onRegionClick = function(regionId) {
  Communication.userAction(
    'regionClick', {id: regionId}
  );
}

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

