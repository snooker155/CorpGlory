//
// Created by ees on 11/6/15.
//

#ifndef CORPGLORYGAME_COMPANY_HPP
#define CORPGLORYGAME_COMPANY_HPP

#include "GameElement.hpp"


struct CompanyModel;

class Company : public GameElement<CompanyModel>
{
  using super = GameElement<CompanyModel>;
public:
  Company(const std::shared_ptr<CompanyModel>& companyModel, ParentObject* parent = nullptr);
  
protected:
  virtual void updateSelf() override;
  bool processAction(const ActionBase* const action) override;
};

#endif //CORPGLORYGAME_COMPANY_HPP
