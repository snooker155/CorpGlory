//
// Created by ees on 11/5/15.
//

#ifndef CORPGLORYGAME_ACTION_HPP
#define CORPGLORYGAME_ACTION_HPP

class ActionAcceptor;

class Action
{
public:
  virtual void visit(ActionAcceptor* element);
};


#endif //CORPGLORYGAME_ACTION_HPP
