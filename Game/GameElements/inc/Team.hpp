//
// Created by ees on 11/9/15.
//

#ifndef CORPGLORYGAME_TEAM_HPP
#define CORPGLORYGAME_TEAM_HPP


#include "GameElement.hpp"

struct TeamModel;

class Team: public GameElement<TeamModel>
{
public:
  Team(const std::shared_ptr<GameElementImpl<TeamModel>>& impl, ParentObject* parent);


protected:
};


#endif //CORPGLORYGAME_TEAM_HPP
