App = {};

App.main = function() {
  Communication.open();
}

App.onEnterRoom = function(players) {
  PlayersList.init(players);
}

App.onEnterGame = function(data) {
  GameScreen.init(data);
}


$(App.main);