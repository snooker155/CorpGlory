//
// Created by ees on 11/6/15.
//

#ifndef CORPGLORYGAME_WORLDMODEL_HPP
#define CORPGLORYGAME_WORLDMODEL_HPP

#include "Model.hpp"

#include <vector>
#include <memory>
#include <algorithm>

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
    // TODO SERIALIZATION HACKS
    std::vector<CompanyModel> companies(m_companies.size());
    std::transform(m_companies.begin(), m_companies.end(), companies.begin(), [&](const std::shared_ptr<CompanyModel>& ptr) {
      return *ptr;
    });

    ar(cereal::make_nvp("companies", companies));
  }
};


#endif //CORPGLORYGAME_WORLDMODEL_HPP
