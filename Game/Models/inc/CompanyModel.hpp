//
// Created by ees on 11/7/15.
//

#ifndef CORPGLORYGAME_COMPANYMODEL_HPP
#define CORPGLORYGAME_COMPANYMODEL_HPP

#include "Model.hpp"

#include <memory>
#include <vector>
#include <string>
#include <set>

#include "cereal/archives/json.hpp"

struct UserModel;

const int MAX_TEAM_LEVEL = 5;
const int MAX_MARKETING_LEVEL = 5;

struct CompanyModel: Model
{
  std::string m_name;
  int64_t m_money;

  int m_teamLevel = 0;
  int m_marketingLevel = 0;

  double m_marketShare;
  size_t m_totalUsers;

  //TODO Sphere, Industry, various company options, stats, team, marketing
  std::set<std::weak_ptr<UserModel>, std::owner_less<std::weak_ptr<UserModel>>> m_users; // Ordering by owner

  template <class Archive>
  void serialize(Archive& ar)
  {
    ar(cereal::make_nvp("name", m_name),
       cereal::make_nvp("money", m_money),
       cereal::make_nvp("team", m_teamLevel),
       cereal::make_nvp("marketing", m_marketingLevel),
       cereal::make_nvp("users", m_users.size()),
       cereal::make_nvp("market_share", m_marketShare));
  }
};


#endif //CORPGLORYGAME_COMPANYMODEL_HPP
