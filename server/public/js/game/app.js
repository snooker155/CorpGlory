App = {};

App.onEnterRoom = function(data) {
  PlayersList.init(data);
}

App.onEnterGame = function(data) {
  GameScreen.init(data);
}

