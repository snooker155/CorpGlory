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

struct UserModel;

struct CompanyModel: Model
{
  std::string m_name;
  uint64_t m_money;

  //TODO Sphere, Industry, various company options, stats, team, marketing
  std::set<std::weak_ptr<UserModel>, std::owner_less<std::weak_ptr<UserModel>>> m_users; // Ordering by owner
};


#endif //CORPGLORYGAME_COMPANYMODEL_HPP
