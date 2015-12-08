//
// Created by ees on 11/7/15.
//

#include "WorldUsers.hpp"
#include "User.hpp"
#include "UserModel.hpp"
#include "WorldUsersModel.hpp"

struct WorldUsersImpl: GameElementImpl<WorldUsersModel>
{
  using super = GameElementImpl<WorldUsersModel>;
  WorldUsersImpl(const std::shared_ptr<WorldUsersModel>& users);
  
  void init(ParentObject* parent);

  std::vector<User*> m_users;
};

WorldUsersImpl::WorldUsersImpl(const std::shared_ptr<WorldUsersModel>& users)
  : super(users)
{
}

void WorldUsersImpl::init(ParentObject* parent)
{
	for (auto& user : m_model->m_people)
	{
		m_users.push_back(new User(user, parent));
	}
}

WorldUsers::WorldUsers(const std::shared_ptr<WorldUsersModel>& model, ParentObject* parent)
  : super(std::make_shared<WorldUsersImpl>(model), parent)
{
	std::static_pointer_cast<WorldUsersImpl>(m_impl)->init(this);
}
