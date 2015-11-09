//
// Created by ees on 11/6/15.
//

#ifndef CORPGLORYGAME_USERMODEL_HPP
#define CORPGLORYGAME_USERMODEL_HPP

#include "Model.hpp"

#include <vector>
#include <string>
#include <memory>
#include <map>

struct CompanyModel;
struct UserModel;

struct Friend
{
  std::shared_ptr<UserModel> m_user;
  double m_weight;
};

struct UserModel: Model
{
  uint64_t m_id;
  std::string m_name;

  bool m_isCeo;

  double m_threshold = 0.5;
  double m_selfish;
  double m_loyalty;
  double m_loyaltyDecrease;
  double m_maxLoyalty = 1;
  double c1 = 1;
  double c2 = 1;
  double c3 = 1;

  std::vector<Friend> m_friends;
  std::map<std::shared_ptr<CompanyModel>, double> m_confidence;

  std::shared_ptr<CompanyModel> m_usingProduct; //TODO Check for weak_ptr
};


#endif //CORPGLORYGAME_USERMODEL_HPP
