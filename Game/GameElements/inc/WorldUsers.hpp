//
// Created by ees on 11/7/15.
//

#ifndef CORPGLORYGAME_USERCONTROLLER_HPP
#define CORPGLORYGAME_USERCONTROLLER_HPP

#include <memory>
#include "GameElement.hpp"

struct WorldUsersModel;

class WorldUsers: GameElement<WorldUsersModel>
{
  using super = GameElement<WorldUsersModel>;
public:
  // TODO Should
  WorldUsers(const std::shared_ptr<WorldUsersModel>& model, ParentObject* parent);
};

#endif //CORPGLORYGAME_USERCONTROLLER_HPP
