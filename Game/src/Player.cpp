//
// Created by ees on 11/5/15.
//

#include "Player.hpp"

Player::Player(const std::string& name)
  : m_name(name)
{
}

const std::string& Player::name() const
{
  return m_name;
}