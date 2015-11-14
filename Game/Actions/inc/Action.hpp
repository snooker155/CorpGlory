//
// Created by ees on 11/5/15.
//

#ifndef CORPGLORYGAME_ACTION_HPP
#define CORPGLORYGAME_ACTION_HPP

#include <iostream>

struct Model;
class ActionAcceptor;

class ActionBase
{
public:
  virtual bool visit(Model* model) const = 0;
};

template <class ModelType>
class Action: public ActionBase
{
public:
  virtual bool visit(Model* model) const override;
protected:
  virtual bool visit(ModelType* element) const;
};

// TODO FUCK, I DON'T FUCKING LIKE THIS FUCKING APPROACH
template <class ModelType>
bool Action<ModelType>::visit(Model* model) const
{
  auto* castedModel = dynamic_cast<ModelType*>(model);
  return castedModel ? visit(castedModel) : true;
}


template <class ModelType>
bool Action<ModelType>::visit(ModelType* model) const
{
  return true;
}



#endif //CORPGLORYGAME_ACTION_HPP
