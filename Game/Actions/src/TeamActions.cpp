//
// Created by ees on 11/9/15.
//

#include "TeamActions.hpp"

TeamImproveAction::TeamImproveAction(const ActionParams& params)
  : Action(params),
    m_companyName(params.at("company_name")),
    m_level(std::stoi(params.at("level")))
{
}


bool TeamImproveAction::visit(CompanyModel* model) const
{
  Action<CompanyModel>::visit(model);
  if (model->m_name == m_companyName)
  {
    std::cerr << "TeamImproveAction: " << model->m_teamLevel << " -> ";
    if (model->m_teamLevel < MAX_TEAM_LEVEL)
      model->m_teamLevel += m_level;
    std::cerr << model->m_teamLevel << "!" << std::endl;
    return true;
  }
  else
  {
    std::cerr << m_companyName << "TeamImprove called with " << model->m_name << std::endl;
  }
  return false;
}

MarketingImprove::MarketingImprove(const ActionParams& params)
  : Action(params),
    m_companyName(params.at("company_name")),
    m_level(std::stoi(params.at("level")))
{
}

bool MarketingImprove::visit(CompanyModel* model) const
{
  Action<CompanyModel>::visit(model);
  if (model->m_name == m_companyName)
  {
    std::cerr << "MarketingImproveAction: " << model->m_marketingLevel << " -> ";
    if (model->m_marketingLevel < MAX_TEAM_LEVEL)
      model->m_marketingLevel += m_level;
    std::cerr << model->m_marketingLevel << "!" << std::endl;
    return true;
  }
  else
  {
    std::cerr << m_companyName << "MarketingImprove called with " << model->m_name << std::endl;
  }
  return false;
}