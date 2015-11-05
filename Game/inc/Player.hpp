//
// Created by ees on 11/5/15.
//

#ifndef CORPGLORYGAME_PLAYER_HPP
#define CORPGLORYGAME_PLAYER_HPP

#include <string>

class Player
{
public:
  Player(const std::string& name);
  const std::string& name() const;

private:
  std::string m_name;
};


#endif //CORPGLORYGAME_PLAYER_HPP
