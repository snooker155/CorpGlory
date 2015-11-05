//
// Created by ees on 11/5/15.
//

#include "Player.hpp"

Player::Player(int id)
  : m_id(id)
{
}

int Player::id() const
{
  return m_id;
}