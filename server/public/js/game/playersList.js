PlayersList = { };

PlayersList.init = function(players) {
  $("#playersListHolder").show();
  for(var p in players) {
    this.addUser(players[p]);
  }
}

PlayersList.addUser = function(user) {
  var li = $("<li>");
  li.text(user.name);
  $("#playersListHolderList").append(li);
}

$(function() {
  $("#playersListHolder").hide();
})