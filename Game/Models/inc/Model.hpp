//
// Created by ees on 11/8/15.
//

#ifndef CORPGLORYGAME_MODEL_HPP
#define CORPGLORYGAME_MODEL_HPP

#include <memory>

struct Model
{
  Model() = default;
  virtual ~Model() = default;

  Model(const Model&) = delete;
  const Model& operator=(const Model&) = delete;
};


#endif //CORPGLORYGAME_MODEL_HPP
