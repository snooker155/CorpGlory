//
// Created by ees on 11/3/15.
//

#include "Game.hpp"

#include "cereal/types/polymorphic.hpp"
#include "cereal/types/memory.hpp"
#include "cereal/types/vector.hpp"
#include "cereal/archives/json.hpp"

#include <iostream>
#include <thread>
#include <functional>
#include <atomic>
#include <condition_variable>
#include <mutex>
#include <chrono>
#include <cassert>
#include <algorithm>

#include "Action.hpp"
#include "TeamActions.hpp"
#include "CompanyModel.hpp"
#include "UserModel.hpp"
#include "Player.hpp"
#include "WorldModel.hpp"
#include "World.hpp"
#include "WorldUsersModel.hpp"
#include "Random.hpp"
#include "ProducerConsumerQueue.hpp"


struct Game::GameImpl
{
  GameImpl(const std::vector<Player>& players);

  std::unique_ptr<std::thread> m_stateRecalcThread;
  std::vector<Player> m_players;
  std::shared_ptr<World> m_world;
  ProducerConsumerQueue<ActionBase*> m_actions;

  size_t calcUserCount(size_t playersCount) const;

  void createDefaultGame(const std::shared_ptr<WorldModel>& model);
  void createCompanies(const std::shared_ptr<WorldModel>& model);
  void createUsers(size_t usersCount,
                   const std::shared_ptr<WorldUsersModel>& model,
                   const std::vector<std::shared_ptr<CompanyModel>>& companies);
  void createCEOs(const std::shared_ptr<WorldModel>& model);
  void recalcState();
};

Game::GameImpl::GameImpl(const std::vector<Player>& players) : m_players(players),
                                                               m_world(nullptr)
{
  auto worldModel = std::make_shared<WorldModel>();
  worldModel->m_usersCount = calcUserCount(players.size());

  createDefaultGame(worldModel);
  m_world = std::make_shared<World>(worldModel);
  m_stateRecalcThread.reset(new std::thread(std::bind(&Game::GameImpl::recalcState, this)));
}

Game::Game(const std::vector<Player>& players)
  : m_impl(std::make_shared<GameImpl>(players))
{
  std::cout << "Game constructing with ";
  for (auto&& player : players)
  {
    std::cout << player.name() << " ";
  }
  std::cout << std::endl;
}

std::string Game::state()
{
  std::ostringstream ss;
  {
    cereal::JSONOutputArchive ar(ss);
    ar(cereal::make_nvp("world", m_impl->m_world));
  } // cereal archives are RAII
  return ss.str();
}

void Game::GameImpl::recalcState()
{
  using std::chrono::steady_clock;
  using std::chrono::duration;
  using std::chrono::duration_cast;

  while (true)
  {
    auto before = steady_clock::now();

    ActionBase* actions[] = {new TeamImproveAction("PlayerCompany"), new MarketingImprove("twitter")};
    auto action = *Random::choice(actions, actions + 2);

    m_actions.push(action);

    while (!m_actions.empty())
    {
      m_world->acceptAction(m_actions.pop());
    }
    m_world->update();

    auto after = std::chrono::steady_clock::now();

    double timeSpan = duration_cast<duration<double>>(after - before).count();
    std::cerr << "Update took: " << timeSpan << " seconds!" << std::endl;
    std::cerr << "World ticks: " << m_world->model()->m_ticks << std::endl;

	  for (auto& company : m_world->model()->m_companies)
  	{
	  	std::cerr << company->m_name << ": " << company->m_money << "$" << std::endl;
	  }
    assert(timeSpan <= 1);

    int64_t millisToSleep = 1000 - static_cast<int64_t>(timeSpan * 1000);
    std::this_thread::sleep_for(std::chrono::milliseconds(millisToSleep));
  }
}

Game::~Game()
{
  std::cout << "Game destructing!" << std::endl;
}

void Game::GameImpl::createDefaultGame(const std::shared_ptr<WorldModel>& model)
{
  auto worldUsers = std::make_shared<WorldUsersModel>();
  model->m_population = worldUsers;

  createCompanies(model);
  createUsers(model->m_usersCount, worldUsers, model->m_companies);
  createCEOs(model);
}

void Game::GameImpl::createUsers(size_t usersCount,
                                 const std::shared_ptr<WorldUsersModel>& model,
                                 const std::vector<std::shared_ptr<CompanyModel>>& companies)
{
  auto randomName = [](size_t n)
  {
    int min = static_cast<int>('a'), max = static_cast<int>('z');
    auto chars = Random::uniform<int>(n, {min, max});
    return std::string {chars.begin(), chars.end()};
  };

  auto createUser = [&]()
  {
    static uint64_t nextId = 0;
    auto user = std::make_shared<UserModel>();
    user->m_name = randomName(5);
    user->m_id = ++nextId;
    user->m_selfish = Random::uniform<double>({0, 1}) * 0.5;

    for (auto company: companies)
    {
      user->m_confidence[company] = 0;
    }
    return user;
  };

  auto setupRelations = [&](const std::vector<std::shared_ptr<UserModel>>& users, int averageConnections)
  {
    double weightMax = 1;
    auto followersSizes = Random::poisson(users.size(), averageConnections);

    std::vector<int> indexes(users.size());
    std::iota(indexes.begin(), indexes.end(), 0);

    for (size_t i = 0; i < users.size(); ++i)
    {
      std::shuffle(indexes.begin(), indexes.end(), Random::gen());
      for (int j = 0; j < followersSizes[i]; ++j)
        users[i]->m_friends.push_back({users[indexes[j]], Random::uniform<double>({0, 1}) * weightMax});
    }
  };

  std::vector<std::shared_ptr<UserModel>> result(usersCount);
  std::generate(result.begin(), result.end(), createUser);
  setupRelations(result, 20);

  model->m_people = std::move(result);
}


// TODO CONFIGS
void Game::GameImpl::createCompanies(const std::shared_ptr<WorldModel>& model)
{
  std::vector<std::shared_ptr<CompanyModel>> result;

  std::vector<std::string> names {"PlayerCompany", "facebook", "twitter"};

  for (auto& name: names)
  {
    auto company = std::make_shared<CompanyModel>();
    company->m_name = name;
    company->m_money = 5000;
    company->m_totalUsers = model->m_usersCount;
    result.push_back(company);
  }

  model->m_companies = std::move(result);
}

void Game::GameImpl::createCEOs(const std::shared_ptr<WorldModel>& model)
{
  for (auto& product: model->m_companies)
    while (true)
    {
      auto users = model->m_population->m_people;
      auto user = *Random::choice(users.begin(), users.end());

      if (!user->m_isCeo)
      {
        user->m_isCeo = true;
        user->m_selfish = 1;

        for (auto& prod: user->m_confidence)
        {
          user->m_confidence[prod.first] = 0;
        }

        user->m_confidence[product] = 1;
        user->m_usingProduct = product;
		    product->m_users.insert(user);

        break;
      }
    }
}

size_t Game::GameImpl::calcUserCount(size_t playersCount) const
{
  return playersCount * 3;
}
