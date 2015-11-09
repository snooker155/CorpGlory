//
// Created by ees on 11/6/15.
//

#include <cassert>
#include "User.hpp"
#include "UserModel.hpp"
#include "Random.hpp"
#include "CompanyModel.hpp"

struct UserImpl: public GameElementImpl<UserModel>
{
  using super = GameElementImpl<UserModel>;

  UserImpl(const std::shared_ptr<UserModel>& model);

  void updateInner();
  void updateFriends();
  void updateProduct();
  void switchProduct(const std::shared_ptr<CompanyModel>& company = nullptr);
};

User::User(const std::shared_ptr<UserModel>& model, ParentObject* parent)
  : super(std::make_shared<UserImpl>(model), parent)
{
}

UserImpl::UserImpl(const std::shared_ptr<UserModel>& model)
  : super(model)
{
}

void User::updateSelf()
{
  auto impl = std::static_pointer_cast<UserImpl>(m_impl);
  impl->updateInner();
  impl->updateFriends();
  impl->updateProduct();
}

void UserImpl::updateInner()
{
  if (m_model->m_usingProduct)
  {
    assert(m_model->m_usingProduct->m_users.count(m_model));

    m_model->m_loyalty -= m_model->m_loyaltyDecrease;
    if (m_model->m_loyalty <= 0)
    {
      switchProduct();

      m_model->c1 *= 0.95;
      m_model->c2 *= 0.95;
      m_model->c3 *= 0.95;
    }
    return;
  }

  for (auto& prod : m_model->m_confidence)
  {
    double& companyConfidence = prod.second;

    if (m_model->m_isCeo || companyConfidence == 0)
      continue;

    companyConfidence += Random::normal() * m_model->c3;
  }
}

void UserImpl::updateFriends()
{
  if (m_model->m_usingProduct)
    return;

  for (auto& prod : m_model->m_confidence)
  {
    auto& company = prod.first;

    double w = 0;
    for (auto& myFriend : m_model->m_friends)
    {
      auto& friendModel = myFriend.m_user;
      double& friendWeight = myFriend.m_weight;

      if (friendModel->m_confidence[company] > 0)
      {
        bool friendUsingSameProduct = friendModel->m_usingProduct == m_model->m_usingProduct;
        w += friendWeight * m_model->c1 * 0.1 * (friendUsingSameProduct ? 1 : -1);
      }
    }

    double selfishness = m_model->m_selfish;
    m_model->m_confidence[company] = (selfishness * m_model->m_confidence[company] + (1 - selfishness) * w);
  }
}

void UserImpl::updateProduct()
{
  if (m_model->m_isCeo)
    return;

  double maxValue = 0;
  std::shared_ptr<CompanyModel> bestProduct = nullptr;
  for (auto& prod : m_model->m_confidence)
  {
    auto& product = prod.first;
    double& confidence = prod.second;
    if (confidence > maxValue)
    {
      maxValue = confidence;
      bestProduct = product;
    }
  }

  bool canSwitchProduct = m_model->m_confidence[bestProduct] > m_model->m_threshold;
  if (bestProduct && m_model->m_usingProduct != bestProduct && canSwitchProduct)
  {
    switchProduct(bestProduct);
    m_model->m_usingProduct = bestProduct;
    m_model->m_loyalty = m_model->m_maxLoyalty;
  }
}

void UserImpl::switchProduct(const std::shared_ptr<CompanyModel>& company)
{
  if (m_model->m_usingProduct)
  {
	size_t userCountBefore = m_model->m_usingProduct->m_users.size();

	m_model->m_usingProduct->m_users.erase(m_model);

	size_t userCountAfter = m_model->m_usingProduct->m_users.size();
	assert(userCountBefore == userCountAfter + 1);
	assert(!m_model->m_usingProduct->m_users.count(m_model));
  }

  m_model->m_usingProduct = company;
  if (company)
  { 
	m_model->m_usingProduct->m_users.insert(m_model);
  }
}
