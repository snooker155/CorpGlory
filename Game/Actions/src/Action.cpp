//
// Created by ees on 11/5/15.
//

#include "Action.hpp"
#include "TeamActions.hpp"

#include <memory>

std::shared_ptr<ActionBase> createAction(const std::string& actionName, const ActionParams& params)
{
  if (actionName == "team") {
    return std::make_shared<TeamImproveAction>(params);
  } else if (actionName == "marketing") {
    return std::make_shared<MarketingImprove>(params);
  }
  return nullptr;
}
