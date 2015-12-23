PlayersList = { };

PlayersList.init = function(players) {
  $("#playersListHolder").show();
  for(var p in players) {
    this.addUser(players[p]);
  }
}

PlayersList.addUser = function(user) {
  var li = $("<li>");
  li.attr("id", "li-" + user.name);
  li.text(user.name);
  $("#playersListHolderList").append(li);
}

PlayersList.removeUser = function(userName) {
  $("#li-" + userName).remove();
}

$(function() {
  $("#playersListHolder").hide();
})