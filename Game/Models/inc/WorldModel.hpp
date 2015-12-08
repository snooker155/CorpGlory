//
// Created by ees on 11/6/15.
//

#ifndef CORPGLORYGAME_WORLDMODEL_HPP
#define CORPGLORYGAME_WORLDMODEL_HPP

#include "Model.hpp"

#include <vector>
#include <memory>

#include "cereal/types/vector.hpp"
#include "cereal/types/memory.hpp"
#include "cereal/archives/json.hpp"
#include "WorldUsersModel.hpp"

struct CompanyModel;
struct WorldUsersModel;

struct WorldModel: Model
{
  uint64_t m_ticks = 0;
  std::vector<std::shared_ptr<CompanyModel>> m_companies;

  size_t m_usersCount;
  std::shared_ptr<WorldUsersModel> m_population;

  template <class Archive>
  void serialize(Archive& ar)
  {
    ar(cereal::make_nvp("companies", m_companies));
  }
};


#endif //CORPGLORYGAME_WORLDMODEL_HPP
