//
// Created by ees on 11/5/15.
//

#include "Company.hpp"
#include "World.hpp"
#include "WorldModel.hpp"
#include "WorldUsers.hpp"

struct WorldImpl: public GameElementImpl<WorldModel>
{
  using super = GameElementImpl<WorldModel>;
  WorldImpl(const std::shared_ptr<WorldModel>& model);

  void updateSelf();
  void init(ParentObject* parent);

  WorldUsers* m_users;
  std::vector<Company*> m_companies;
};

World::World(const std::shared_ptr<WorldModel>& model, ParentObject* parent)
  : super(std::make_shared<WorldImpl>(model), parent)
{
	std::static_pointer_cast<WorldImpl>(m_impl)->init(this);
}

WorldImpl::WorldImpl(const std::shared_ptr<WorldModel>& model)
  : super(model)
{
}

void WorldImpl::init(ParentObject* parent)
{
	for (auto& company : m_model->m_companies)
		m_companies.push_back(new Company(company, parent));
	m_users = new WorldUsers(m_model->m_population, parent);
}


void World::updateSelf()
{
  std::static_pointer_cast<WorldImpl>(m_impl)->updateSelf();
}

bool World::processAction(const Action& action)
{
  return GameElement::processAction(action);
}

void WorldImpl::updateSelf()
{
  m_model->m_ticks += 1;
}
