//
// Created by ees on 11/3/15.
//

#ifndef CORPGLORYGAME_GAME_HPP
#define CORPGLORYGAME_GAME_HPP

#include <memory>
#include <string>

#include <vector>
#include <Action.hpp>
#include "Player.hpp"

//Probably creates World, WorldModel and goes on
class Game {
public:
  Game(const std::vector<Player>& players);
  ~Game();
  std::string state();
  void processAction(const std::shared_ptr<ActionBase>& action);
private:
  struct GameImpl;
  std::shared_ptr<GameImpl> m_impl;
};


#endif //CORPGLORYGAME_GAME_HPP
