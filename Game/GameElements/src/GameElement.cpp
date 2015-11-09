//
// Created by ees on 11/8/15.
//

#ifndef CORPGLORYGAME_GAMEELEMENT1_HPP
#define CORPGLORYGAME_GAMEELEMENT1_HPP

#include "GameElement.hpp"

void ParentObject::addChild(ParentObject* element)
{
  m_children.push_back(element);
}

ParentObject::~ParentObject()
{
}

#endif //CORPGLORYGAME_GAMEELEMENT1_HPP
