PlayersList = { };

PlayersList.init = function(data) {
  $("#playersListHolder").show();
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