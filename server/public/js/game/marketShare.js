MarketShare = {};

MarketShare.items = {};

MarketShare.init = function(data) {
  $("#marketShareHolder").show();
  
  var players = data.players;
  
  var listTempalte =  _.template(
    '<div>' + 
      '<h5><%= name %></h5>' +
      '<div class="progress progress-mini">' +
        '<div aria-valuemax="100" aria-valuemin="0"' + 
          ' role="progressbar" class="progress-bar"' +
            'style="background-color:<%= backgroundColor %>" >' +
        '</div>' + 
      '</div>' + 
    '</div>'
  );
  
  for(var i = 0; i < players.length; i++) {
    var pid = players[i].name;
    MarketShare.items[pid] = $(listTempalte({
      name: pid,
      backgroundColor: players[i].color
    }));
    $("#marketShareHolder").append(MarketShare.items[pid]);
  }
};

MarketShare.setPercentage = function(playerId, percetage) {
  var item = MarketShare.items[playerId];
  item.find('.progress div')
    .css({ width: percetage + '%' })
}

MarketShare.updateBalance = function(value) {
  $("#balanceHolderValue").text(value + "$");
};

MarketShare.updateCompanyShares = function(shares) {
  // shares {PlayerId->Share}
  
  for(var pid in shares) {
    var percent = shares[pid] * 100;
    MarketShare.setPercentage(pid, percent);
  }
  
};
