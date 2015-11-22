//
// Created by ees on 11/5/15.
//

#ifndef CORPGLORYGAME_ACTION_HPP
#define CORPGLORYGAME_ACTION_HPP

#include <iostream>
#include <map>
#include <memory>

struct Model;
class ActionAcceptor;

using ActionParams = std::map<std::string, std::string>;

class ActionBase
{
public:
  virtual bool visit(Model* model) const = 0;
};

template <class ModelType>
class Action: public ActionBase
{
public:
  Action(const ActionParams& params)
    : m_params(params)
  {
  }

  virtual bool visit(Model* model) const override;

protected:
  virtual bool visit(ModelType* element) const;

  ActionParams m_params;
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

std::shared_ptr<ActionBase> createAction(const std::string& action, const ActionParams& params);


#endif //CORPGLORYGAME_ACTION_HPP
