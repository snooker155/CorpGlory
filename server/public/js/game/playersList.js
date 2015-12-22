PlayersList = { };

PlayersList.init = function(players) {
  $("#playersListHolder").show();
  for(var p in players) {
    this.addUser(p);
  }
}

PlayersList.addUser = function(user) {
  for(var user in users) {
    var li = $("<li>");
    li.text(user.name);
    $("#playersListHolderList").append(li);
  }
}


$(function() {
  $("#playersListHolder").hide();
})