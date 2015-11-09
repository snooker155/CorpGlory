//
// Created by ees on 11/5/15.
//

#include "Action.hpp"
#include "GameElement.hpp"

void Action::visit(ActionAcceptor* element)
{
  element->acceptAction(*this);
}
