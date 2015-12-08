//
// Created by ees on 11/9/15.
//

#include "Team.hpp"
#include "TeamModel.hpp"

struct TeamImpl: public GameElementImpl<TeamModel>
{
  TeamImpl(const std::shared_ptr<TeamModel>& model);
};

TeamImpl::TeamImpl(const std::shared_ptr<TeamModel>& model)
  : GameElementImpl(model)
{
}

Team::Team(const std::shared_ptr<GameElementImpl<TeamModel>>& impl, ParentObject* parent) : GameElement(impl, parent) { }
