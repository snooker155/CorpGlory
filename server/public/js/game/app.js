App = {};

App.main = function() {
  Communication.open();
}

// EVENTS

App.onEnterRoom = function(players) {
  PlayersList.init(players);
}

App.onAddPlayer = function(player) {
  PlayersList.addUser(player);
}

App.onRemovePlayer = function(playerName) {
  PlayersList.removeUser(playerName);
}

App.onReadyPlayer = function(playerName) {
  PlayersList.readyUser(playerName);
}

App.onEnterGame = function(data) {
  GameScreen.init(data);
}




$(App.main);