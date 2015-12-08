//
// Created by ees on 11/9/15.
//

#ifndef CORPGLORYGAME_TEAMACTIONS_HPP
#define CORPGLORYGAME_TEAMACTIONS_HPP

#include "Action.hpp"
#include "CompanyModel.hpp"

#include <string>

class TeamImproveAction: public Action<CompanyModel>
{
public:
  TeamImproveAction(const std::string& companyName);
  virtual bool visit(CompanyModel* model) const override;

private:
  std::string m_companyName;
};

class MarketingImprove: public Action<CompanyModel>
{
public:
  MarketingImprove(const std::string& companyName);
  virtual bool visit(CompanyModel* model) const override;

private:
  std::string m_companyName;
};


#endif //CORPGLORYGAME_TEAMACTIONS_HPP
