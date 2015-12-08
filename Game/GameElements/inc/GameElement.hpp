//
// Created by ees on 11/5/15.
//

#ifndef CORPGLORYGAME_GAMEELEMENT_HPP
#define CORPGLORYGAME_GAMEELEMENT_HPP

#include <vector>
#include <memory>

#include "Action.hpp"
#include "cereal/types/memory.hpp"

class ActionBase;


//TODO Probably need this to have updateSelf and processAction
template <class Model>
struct GameElementImpl
{
  GameElementImpl(const std::shared_ptr<Model>& model);
  std::shared_ptr<Model> m_model;
};

template <class Model>
GameElementImpl<Model>::GameElementImpl(const std::shared_ptr<Model>& model)
  : m_model(model)
{
}

class ActionAcceptor
{
public:
  virtual void acceptAction(const ActionBase* const action) = 0;
};

class Updatable
{
public:
  virtual void update() = 0;
};

class ParentObject: public Updatable,
                    public ActionAcceptor
{
public:
  virtual ~ParentObject();
  void addChild(ParentObject* element);
  std::vector<ParentObject*> m_children;
};

template <class Model>
class GameElement: public ParentObject
{
public:
  virtual void update() final;
  virtual void acceptAction(const ActionBase* const action) final;

  std::shared_ptr<Model> model() const;

protected:
  GameElement(const std::shared_ptr<GameElementImpl<Model>>& impl, ParentObject* parent = nullptr);
  virtual ~GameElement();

  virtual void updateSelf();
  virtual bool processAction(const ActionBase* const action);

  std::shared_ptr<GameElementImpl<Model>> m_impl;
};

template <class Model>
GameElement<Model>::GameElement(const std::shared_ptr<GameElementImpl<Model>>& impl, ParentObject* parent)
  : m_impl(impl)
{
  if (parent != nullptr)
  {
    parent->addChild(this);
  }
}

template <class Model>
GameElement<Model>::~GameElement()
{
  for (auto child : m_children)
  {
    delete child;
  }
}

template <class Model>
void GameElement<Model>::update()
{
  updateSelf();
  for (auto child : m_children)
  {
    child->update();
  }
}

template <class Model>
void GameElement<Model>::acceptAction(const ActionBase* const action)
{
  if (processAction(action))
  {
    for (auto child : m_children)
    {
      child->acceptAction(action);
    }
  }
}


template <class Model>
bool GameElement<Model>::processAction(const ActionBase* const action)
{
  return action->visit(model().get());
}

template <class Model>
void GameElement<Model>::updateSelf()
{
}

template <class Model>
std::shared_ptr<Model> GameElement<Model>::model() const
{
  return m_impl->m_model;
}

#endif //CORPGLORYGAME_GAMEELEMENT_HPP
