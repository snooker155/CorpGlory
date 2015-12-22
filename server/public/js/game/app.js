App = {};

App.main = function() {
  Communication.open();
}

App.onEnterRoom = function(players) {
  PlayersList.init(players);
}

App.onAddPlayer = function(player) {
  PlayersList.addUser(player);
}

App.onEnterGame = function(data) {
  GameScreen.init(data);
}




$(App.main);