//
// Created by ees on 11/3/15.
//

#include "Game.hpp"

#include <iostream>
#include <thread>
#include <chrono>
#include <functional>
#include <atomic>

struct Game::GameImpl
{
  GameImpl(const std::vector<Player>& players)
    : m_stateRecalcThread(std::bind(&Game::GameImpl::recalcState, this)),
      m_players(players),
      m_state(0)
  {
  }

  std::thread m_stateRecalcThread;
  std::vector<Player> m_players;
  std::atomic<int> m_state;

  void recalcState();
};

Game::Game(const std::vector<Player>& players)
  : m_impl(std::make_shared<GameImpl>(players))
{
  std::cout << "Game constructing with ";
  for (auto&& player : players)
  {
    std::cout << player.name() << " ";
  }
  std::cout << std::endl;
}

void Game::hello()
{
  std::cout << "Hello" << std::endl;
}

int Game::state()
{
  return m_impl->m_state;
}

void Game::GameImpl::recalcState()
{
  while (true)
  {
    m_state += 1;
    std::this_thread::sleep_for(std::chrono::seconds(1));
  }
}

Game::~Game()
{
  std::cout << "Game destructing!" << std::endl;
}
