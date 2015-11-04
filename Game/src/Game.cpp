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
  GameImpl()
    : m_stateRecalcThread(std::bind(&Game::GameImpl::recalcState, this)),
      m_state(0)
  {
  }

  std::thread m_stateRecalcThread;
  std::atomic<int> m_state;

  void recalcState();
};

Game::Game()
  : m_impl(std::make_shared<GameImpl>())
{
  std::cout << "Game constructing!" << std::endl;
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
