//
// Created by ees on 11/6/15.
//

#include "Company.hpp"
#include "CompanyModel.hpp"

struct CompanyImpl: public GameElementImpl<CompanyModel>
{
  using super = GameElementImpl<CompanyModel>;

  CompanyImpl(const std::shared_ptr<CompanyModel>& model);

  void updateSelf();
  uint64_t usersPenalty(size_t users) const;
};

Company::Company(const std::shared_ptr<CompanyModel>& companyModel, ParentObject* parent)
  : super(std::make_shared<CompanyImpl>(companyModel), parent)
{
}

CompanyImpl::CompanyImpl(const std::shared_ptr<CompanyModel>& model)
  : super(model)
{
}

void Company::updateSelf()
{
  auto impl = std::static_pointer_cast<CompanyImpl>(m_impl);
  impl->updateSelf();
}

void CompanyImpl::updateSelf()
{
  auto money = m_model->m_money;
  m_model->m_money = money - (500 - usersPenalty(m_model->m_users.size()));
}

uint64_t CompanyImpl::usersPenalty(size_t users) const
{
  const int WORLD_USERS = 300;
  return (3200 / WORLD_USERS) * users;
}
