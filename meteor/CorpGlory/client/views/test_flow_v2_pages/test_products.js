Template.test_products.onRendered(function () {

    $(".select2-sphere").select2();
    $(".select2-country").select2();
    $(".select2-city").select2();
    $(".select2-org_structure").select2();
});



var new_product = new ReactiveVar(false);

  Template.test_products.helpers({
    products: function (){
      return Products.find();
    },

    has_company: function (){
      if (Companies.findOne({owner: Meteor.userId()})){
        return Companies.findOne({owner: Meteor.userId()});
      }
    }, 

    new_product: function(){
      return new_product.get();
    },

  });


  Template.test_products.events({
    'submit #add_product': function (event) {
      event.preventDefault();

      var name = event.target.name.value;


      Meteor.call('addProduct', name);

      event.target.name.value = "";
      new_product.set(false);
    },

    'click #new_product': function(){
      new_product.set(true);
    },

  });