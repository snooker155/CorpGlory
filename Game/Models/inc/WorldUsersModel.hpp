//
// Created by ees on 11/8/15.
//

#ifndef CORPGLORYGAME_WORLDUSERS_HPP
#define CORPGLORYGAME_WORLDUSERS_HPP

#include "Model.hpp"

#include <vector>

struct UserModel;

// Maybe countries
struct WorldUsersModel: Model
{
  std::vector<std::shared_ptr<UserModel>> m_people;

  size_t size() const
  {
    return m_people.size();
  }
};


#endif //CORPGLORYGAME_WORLDUSERS_HPP
