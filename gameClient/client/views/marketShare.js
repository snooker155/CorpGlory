MarketShare = {
  updateBalance: function(value) {
    $("#balanceHolderValue").text(value + "$");
  },
  updateCompanyShares: function(shares) {
    // shares {Company->Share}
    var styles = [
      "progress-bar-success", "progress-bar-warning", "progress-bar-danger", ""
    ];
    var i = 0;
    var html = "";
    for(var c in shares) {
      var percentage = shares[c] * 100;
      html += 
          '<h5>' + c + '</h5>' +
          '<div class="progress progress-mini">' +
          '<div style="width: ' + percentage + '%" aria-valuemax="100" ' + 
             'aria-valuemin="0" aria-valuenow="' + percentage + '"' +
             ' role="progressbar" class="progress-bar ' + styles[i] + '">' +
          '</div> </div> ';
      i++;
    }
  
    $("#marketShareHolderProgresses").html(html);
  }
};
