//
// Created by ees on 11/8/15.
//

#include "Game.hpp"

#include <thread>
#include <chrono>
#include <iostream>

int main()
{
  std::vector<std::string> names {"Vasya", "Petya", "Velikiy"};
  std::vector<Player> players;
  for (auto& name : names)
  {
    players.push_back(Player(name));
  }

  Game game(players);
  while (true)
  {
    std::cout << game.state() << std::endl;
    std::map<std::string, std::string> params;
    params["action"] = "team";
    params["company_name"] = "PlayerCompany";
    params["level"] = "1";
    game.processAction(createAction(params["action"], params));
    std::this_thread::sleep_for(std::chrono::seconds(1));
  }
}