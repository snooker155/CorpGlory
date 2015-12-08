//
// Created by ees on 11/6/15.
//

#ifndef CORPGLORYGAME_USER_HPP
#define CORPGLORYGAME_USER_HPP

#include "GameElement.hpp"

struct UserModel;

class User : GameElement<UserModel>
{
  using super = GameElement<UserModel>;
public:
  User(const std::shared_ptr<UserModel>& model, ParentObject* parent = nullptr);

protected:
  virtual void updateSelf() override;
};


#endif //CORPGLORYGAME_USER_HPP
