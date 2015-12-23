PlayersList = { };

PlayersList.init = function(players) {
  $("#playersListHolder").show();
  for(var p in players) {
    this.addUser(players[p]);
  }
  $("#buttonPlay").click(function(){
    Communication.userAction('ready');
  });
}

PlayersList.addUser = function(user) {
  var li = $("<div class='row' id='li-" + user.name + "' >");
  li.attr("id", "li-" + user.name);
  var nm = $("<div class='col-md-6'>");
  nm.text(user.name);
  li.append(nm);
  
  var stat = $("<div class='col-md-6 wait text-right'>");
  stat.text("wait");
  li.append(stat);
  
  $("#playersListHolderList").append(li);
  if(user.ready) {
    this.readyUser(user.name);
  }
  
}

PlayersList.removeUser = function(userName) {
  $("#li-" + userName).remove();
}

PlayersList.readyUser = function(userName) {
  $("#li-" + userName).find('.wait').text('ready')
                      .removeClass('wait')
                      .addClass('ready');
}

$(function() {
  $("#playersListHolder").hide();
})