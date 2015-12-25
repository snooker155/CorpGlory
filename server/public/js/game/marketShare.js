MarketShare = {};

MarketShare.init = function(data) {
  $("#marketShareHolder").show();
};

MarketShare.updateBalance = function(value) {
  $("#balanceHolderValue").text(value + "$");
};

MarketShare.updateCompanyShares = function(shares) {
  // shares {Company->Share}
  var styles = [
    "progress-bar-success", "progress-bar-warning",
    "progress-bar-danger", ""
  ];
  var i = 0;
  var html = "";
  
  var listTempalte =  _.template(
    '<h5><%= name %></h5>' +
    '<div class="progress progress-mini">' +
    '<div style="width: <%= percentage %>%" aria-valuemax="100" ' + 
       'aria-valuemin="0" aria-valuenow="<%= percentage %>"' +
       ' role="progressbar" class="progress-bar <%= style %>">' +
    '</div> </div> '
  )
  
  for(var c in shares) {
    html += listTempalte({
      name: c, 
      percentage: shares[c] * 100,
      style: styles[i]
    });
    i++;
  }

  $("#marketShareHolderProgresses").html(html);
};
