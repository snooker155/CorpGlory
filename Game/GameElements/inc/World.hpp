//
// Created by ees on 11/5/15.
//

#ifndef CORPGLORYGAME_WORLD_HPP
#define CORPGLORYGAME_WORLD_HPP

#include <memory>

#include "GameElement.hpp"

#include "cereal/archives/json.hpp"
#include "cereal/types/memory.hpp"

struct WorldModel;

class World: public GameElement<WorldModel>
{
  using super = GameElement<WorldModel>;
public:
  World(const std::shared_ptr<WorldModel>& model, ParentObject* parent = nullptr);

  template <class Archive>
  void serialize(Archive& ar) const
  {
    ar(cereal::make_nvp("model", *m_impl->m_model));
  }

protected:
  virtual void updateSelf() override;
};


#endif //CORPGLORYGAME_WORLD_HPP
