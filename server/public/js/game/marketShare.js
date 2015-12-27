MarketShare = {};

MarketShare.items = {};

MarketShare.init = function(data) {
  $("#marketShareHolder").show();
  
  var players = data.players;
  
  var styles = [
    "progress-bar-success", "progress-bar-warning",
    "progress-bar-danger", ""
  ];
  
  var listTempalte =  _.template(
    '<div>' + 
      '<h5><%= name %></h5>' +
      '<div class="progress progress-mini">' +
        '<div aria-valuemax="100" aria-valuemin="0"' + 
          ' role="progressbar" class="progress-bar <%= style %>">' +
        '</div>' + 
      '</div>' + 
    '</div>'
  );
  
  for(var i = 0; i < players.length; i++) {
    var pid = players[i];
    MarketShare.items[pid] = $(listTempalte({
      name: pid,
      style: styles[i]
    }));
    $("#marketShareHolder").append(MarketShare.items[pid]);
  }
};

MarketShare.setPercentage = function(playerId, percetage) {
  var item = MarketShare.items[playerId];
  console.log(item.find('.progress div').html());
  item.find('.progress div')
    .css({ width: percetage + '%' })
    
}

MarketShare.updateBalance = function(value) {
  $("#balanceHolderValue").text(value + "$");
};

MarketShare.updateCompanyShares = function(shares) {
  // shares {PlayerId->Share}
  
  for(var pid in shares) {
    MarketShare.setPercentage(pid, shares[pid]);
  }
  
};
