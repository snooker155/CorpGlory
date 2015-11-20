  Template.menu.helpers({
    resources_new_count: function(){
      return Resources.find().count();
    },

    orders_new_count: function(){
      return Orders.find().count();
    },

    sales_new_count: function(){
      return inSales.find().count();
    },

    production_new_count: function(){
      return inProduction.find().count();
    },

    orders_count: function (){
      return Orders.find({ owner: Meteor.userId() }).count();
    },

    has_company: function (){
      if (Companies.findOne({owner: Meteor.userId()})){
        return Companies.findOne({owner: Meteor.userId()});
      }
    },
    
  });