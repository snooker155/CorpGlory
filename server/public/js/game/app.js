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

App.onDisconnectPlayer = function(playerName) {
  PlayersList.disconnectUser(playerName);
}

App.onReadyPlayer = function(playerName) {
  PlayersList.readyUser(playerName);
}

App.onEnterGame = function(data) {
  PlayersList.destroy();
  GameScreen.init(data);
}

App.onUpdate = function(data) {
  GameScreen.update(data);
}




$(App.main);