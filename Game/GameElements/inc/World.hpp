//
// Created by ees on 11/5/15.
//

#ifndef CORPGLORYGAME_WORLD_HPP
#define CORPGLORYGAME_WORLD_HPP

#include <memory>

#include "GameElement.hpp"

struct WorldModel;

class World: public GameElement<WorldModel>
{
  using super = GameElement<WorldModel>;
public:
  World(const std::shared_ptr<WorldModel>& model, ParentObject* parent = nullptr);

protected:
  virtual void updateSelf() override;
  virtual bool processAction(const Action& action) override;
};


#endif //CORPGLORYGAME_WORLD_HPP
