PlayersList = { };

function PlayersListItem(name) {
  this.li = $("<div class='row'>");
  var nm = $("<div class='col-md-6'>");
  nm.text(name);
  
  this.stat = $(
    "<div class='col-md-6 text-right wait'>"
  );
  this.stat.text('wait');
  this.currentState = 'wait';
  
  this.li.append(nm);
  this.li.append(this.stat);
}

PlayersListItem.prototype.setState = function(state) {
  var text = state;
  if(text === 'disconnect') {
    text = 'fail';
  }
  this.stat
    .removeClass(this.currentState)
    .addClass(state).text(text);
  this.currentState = state;
}

PlayersList.users = {};

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
  var listItem = new PlayersListItem(user.name);

  if(PlayersList.users[user.name] !== undefined) {
    PlayersList.users[user.name].setState(
      user.ready ? 'ready': 'wait'
    );
    return;
  }
  
  PlayersList.users[user.name] = listItem;
  
  $("#playersListHolderList").append(listItem.li);
  
  if(user.ready) {
    listItem.setState('ready');
  }
}

PlayersList.disconnectUser = function(userName) {
  if(PlayersList.users[userName] === undefined) return;
  PlayersList.users[userName].setState('disconnect');
}

PlayersList.readyUser = function(userName) {
  if(PlayersList.users[userName] === undefined) return;
  PlayersList.users[userName].setState('ready');
}

PlayersList.destroy = function() {
  $("#playersListHolder").remove();
}

$(function() {
  $("#playersListHolder").hide();
})