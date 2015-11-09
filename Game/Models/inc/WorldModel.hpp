//
// Created by ees on 11/6/15.
//

#ifndef CORPGLORYGAME_WORLDMODEL_HPP
#define CORPGLORYGAME_WORLDMODEL_HPP

#include "Model.hpp"

#include <vector>
#include <memory>

struct CompanyModel;
struct WorldUsersModel;

struct WorldModel: Model
{
  uint64_t m_ticks = 0;
  std::vector<std::shared_ptr<CompanyModel>> m_companies;
  std::shared_ptr<WorldUsersModel> m_population;
};


#endif //CORPGLORYGAME_WORLDMODEL_HPP
