  Meteor.methods({




////////// User methods ///////////////


    // setUsername: function(id,username){
    //   Meteor.setUsername(id, username);
    // },


    deleteUser: function(id){
      Meteor.users.remove(id);
    },



////////// Object methods ///////////////

    addObject: function(name){
    
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Objects.insert({
        name: name,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        editable: false
      });
    },
    
    deleteObject: function(id){
      Objects.remove(id);
    },

    editObject: function(id){
      Objects.update(id, {
        $set: { editable: true }
      });
    },

    saveObject: function(id, name){
      Objects.update(id,{
        $set: {
          name: name,
          editable: false
        }
      });
    },



////////// Company methods ///////////////

    addCompany: function(
      name, 
      org_structure, 
      sphere, 
      segment, 
      country 
      //address
      ){
    
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }


      //console.log(name+" # "+org_structure+" # "+sphere+" # "+segment+" # "+country+" # "+address);


      Companies.insert({
        company_name: name,
        company_org_structure: org_structure,
        company_money: 10000,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        sphere: sphere,
        segment: segment,
        country: country,
        //address: address
      });

    },
    
    deleteCompany: function(id){
      Companies.remove(id);
    },

    editCompany: function(id){
      Companies.update(id, {
        $set: { editable_big: true }
      });
    },

    saveCompany: function(id, name, money){
      Companies.update(id,{
        $set: {
          company_name: name,
          company_money: money,
          editable_big: false
        }
      });
    },



////////// Sphere methods ///////////////

    addSphere: function(sphere_name, inputs){
    
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }


      // console.log(sphere_name);
      // console.log(inputs);


      Spheres.insert({
        sphere_name: sphere_name,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });

      var this_sphere = Spheres.findOne({sphere_name: sphere_name});

      inputs.forEach(function (input) {
        //console.log(input);
        Segments.insert({
          segment_name: input.segment_name,
          sphere_id: this_sphere._id,
          sphere_name: this_sphere.sphere_name,
          createdAt: new Date(),
          owner: Meteor.userId(),
          username: Meteor.user().username
        });
      });

    },
    
    deleteSphere: function(id){

      var segments = Segments.find({sphere_id: id}).fetch();

      segments.forEach(function (segment) {
        Segments.remove(segment._id);
      });

      Spheres.remove(id);
    },


    saveSphere: function(id, sphere_name){
      console.log(id+" # "+sphere_name);

      var sphere = Spheres.findOne({_id: id}); 
      console.log(sphere);

      var segments = Segments.find({sphere_id: id}).fetch();

      console.log(segments);

      segments.forEach(function (segment) {
        console.log(segment._id+" # "+sphere_name);
        Segments.update(segment._id, {
          $set: {
            sphere_name: sphere_name,
          }
        });
      });

      Spheres.update(id,{
        $set: {
          sphere_name: sphere_name,
        }
      });
    },



////////// Segments methods ///////////////

    addSegment: function(segment_name){
    
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Segments.insert({
        segment_name: segment_name,
        sphere_id: null,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });

    },
    
    deleteSegment: function(id){
      Segments.remove(id);
    },


    saveSegment: function(id, segment_name){

      Segments.update(id,{
        $set: {
          segment_name: segment_name,
        }
      });

    },



////////// Country methods ///////////////

    addCountry: function(country_name){
    
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Countries.insert({
        country_name: country_name,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });

    },
    
    deleteCountry: function(id){
      Countries.remove(id);
    },


    saveCountry: function(id, country_name){

      Countries.update(id,{
        $set: {
          country_name: country_name,
        }
      });

    },



////////// Department methods ///////////////

    addDepartment: function(department_name, employee_price){
    
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Departments.insert({
        department_name: department_name,
        employee_price: employee_price,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });

    },
    
    deleteDepartment: function(id){
      Departments.remove(id);
    },


    saveDepartment: function(id, department_name, employee_price){

      Departments.update(id,{
        $set: {
          department_name: department_name,
          employee_price: employee_price,
        }
      });

    },



////////// Product methods ///////////////

    addProduct: function(name){

      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Products.insert({
       // id: getNextSequenceValueProduct("productId"),
        name: name,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        creator: Companies.findOne({owner: Meteor.userId()})._id,
        editable: false
      });
    },

    deleteProduct: function(id){
      Products.remove(id);
    },

    editProduct: function(id){
      Products.update(id, {
        $set: { editable: true }
      });
    },

    saveProduct: function(id, name){
      Products.update(id,{
        $set: {
          name: name,
          editable: false
        }
      });
    },




////////// Product position methods ///////////////

    addProductPosition: function(name, price, quantity){

      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      var product = Products.findOne({ name: name, owner: Meteor.userId() });

      Product_positions.insert({
        product: product.name,
        price: price,
        quantity: quantity,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        creator: Companies.findOne({owner: Meteor.userId()})._id
      });
    },

    deleteProductPosition: function(id){
      Product_positions.remove(id);
    },

    change_quantity_select: function(id, quantity){
      var product_positions = Product_positions.findOne(id);
      Product_positions.update (product_positions._id, {
        $set: {sum: product_positions.price*quantity}
      });
    },

    // editProductPosition: function(id, field, param){
    //   console.log(id+" # "+field+" # "+param);
    //   console.log(Product_positions.findOne(id).quantity);
    //   Product_positions.update(id, {
    //     $set: {quantity: param}
    //   });
    //   console.log(Product_positions.findOne(id).quantity);
    // },


////////// Order methods ///////////////

    addOrder: function(id){

      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      var product_positions = Product_positions.findOne(id);

      Orders.insert({
        //id: getNextSequenceValueOrder("orderId"),
        name: product_positions.product,
        price: product_positions.price,
        quantity: product_positions.sum/product_positions.price,
        sum: product_positions.sum,
        createdAt: new Date(),
        progress: -1,
        owner: Meteor.userId(),
        username: Meteor.user().username,
        creator: product_positions.creator
      });

      var thisCompany = Companies.findOne({ owner: Meteor.userId() });
      Companies.update (thisCompany._id, {
        $set: {company_money: Companies.findOne({ owner: Meteor.userId() }).company_money*1 - product_positions.sum*1}
      });

      var targetCompany = Companies.findOne({ _id: product_positions.creator });
      Companies.update(targetCompany._id, {
        $set: {company_money: targetCompany.company_money*1 + product_positions.sum*1}
      });


      Product_positions.update (product_positions._id, {
        $set: {
          sum: 0,
          quantity: product_positions.quantity*1 - (product_positions.sum/product_positions.price*1)
        }
      });
    },

    deleteOrder: function(id){
      Orders.remove(id);
    },

    finish_order: function(id){

      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      var order = Orders.findOne(id);
      var resource = Resources.findOne({ name: order.name, owner: Meteor.userId() });
      console.log(order);
      console.log(resource);

      if (resource || resource == "undefined"){
        Resources.update(resource._id, {
          $set: { quantity: resource.quantity + order.quantity }
        });
      }
      else{
        Resources.insert({
          //id: order.id,
          name: order.name,
          quantity: order.quantity,
          creator: order.creator,
          createdAt: new Date(),
          owner: Meteor.userId(),
          username: Meteor.userId().username
        });
      }
    },

    orderUpdateProgress: function(id, x){
      Orders.update(id, {
        $set: {progress: x}
      });
    },




////////// Resource methods ///////////////

    deleteResource: function(id){
      Resources.remove(id);
    },



////////// Technology methods ///////////////

    addTechnology: function(name, output_product, input){

      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Technologies.insert({
        name: name,
        output_product: output_product,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        creator: Companies.findOne({owner: Meteor.userId()})._id
      });

      var technology = Technologies.findOne({ name: name, owner: Meteor.userId() });

      //console.log(technology);

      for (i=0; i<input.length; i++){
        //console.log(technology.name+" # "+input[i].input_product+" # "+input[i].input_quantity)
        Technology_list.insert({
          tech_name: technology.name,
          product_name: input[i].input_product,
          product_quantity: input[i].input_quantity,
          createdAt: new Date(),
          owner: Meteor.userId(),
          creator: Companies.findOne({owner: Meteor.userId()})._id
        });
        //console.log(Technology_list.findOne({ product_name: input[i].input_product}));
      }
      //console.log(Technology_list.find({ tech_name: technology.name}));
    },

    deleteTechnology: function(id){
      Technologies.remove(id);
    },

    makeProduct: function(id, quantity_for_order){
      var ready = 0;
      var count = quantity_for_order;
      var selected_technology = Technologies.findOne(id);
      var technology_list = Technology_list.find({ tech_name: selected_technology.name, owner: Meteor.userId() });
      console.log(count+"#"+technology_list.count());
      console.log(technology_list);
      technology_list.forEach(function (tech_list) {
        var selected_resources = Resources.findOne({ name: tech_list.product_name, owner: Meteor.userId() });
        console.log(selected_resources);
        if (selected_resources && selected_resources.quantity !== 0){
          if (selected_resources.quantity >= (tech_list.product_quantity*count)){
            ready +=1;
            console.log(ready);
            if (ready === technology_list.count()){
              console.log("hello"+ready);
              inProduction.insert({
                product: selected_technology.output_product,
                quantity: count,
                createdAt: new Date(),
                progress: -1,
                owner: Meteor.userId(),
                username: Meteor.userId().username,
                creator: selected_resources.creator
              });
              console.log("hello2"+ready);


              technology_list.forEach(function (techn_list) {
                var selected_resources_alt = Resources.findOne({ name: techn_list.product_name, owner: Meteor.userId() });
                Resources.update(selected_resources_alt._id,{
                  $set: {quantity: selected_resources_alt.quantity-(techn_list.product_quantity*count)}
                });
              });
            }
          }
        }else{
          throw new Meteor.Error("Not enough resources");
        }
      });

    },



////////// Technology list methods ///////////////



////////// inProduction methods ///////////////

    deleteInProduction: function(id){
      inProduction.remove(id);
    },

    finishProduction: function(id){

      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      var production = inProduction.findOne(id);
      var in_storehouse_exist = inStorehouse.findOne({ product: production.product, owner: Meteor.userId() });

      if (in_storehouse_exist){

        var sum = (in_storehouse_exist.quantity*1) + (production.quantity*1);

        inStorehouse.update(in_storehouse_exist._id, {
          $set: { quantity: sum }
        });

      }else{

        inStorehouse.insert({
          product: production.product,
          quantity: production.quantity,
          createdAt: new Date(),
          owner: Meteor.userId(),
          username: Meteor.userId().username,
          creator: production.creator
        });

      }
    },

    inProductionUpdate: function(id, x){
      inProduction.update(id, {
        $set: {progress: x}
      });
    },


////////// inStorehouse methods ///////////////

    deleteInStorehouse: function(id){
      inStorehouse.remove(id);
    },

    to_sales: function(id, price, quantity){

      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      var storehouse = inStorehouse.findOne(id);

      // inSales.insert({
      //   product: storehouse.product,
      //   price: price,
      //   quantity: quantity,
      //   createdAt: new Date(),
      //   owner: Meteor.userId(),
      //   username: Meteor.userId().username,
      //   creator: storehouse.creator,
      //   progress: -1,
      //   income: false
      // });


      Product_positions.insert({
        product: storehouse.product,
        price: price,
        quantity: quantity,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        creator: storehouse.creator,
        progress: -1,
        income: false
      });

      inStorehouse.update(storehouse._id, {
        $set: { quantity: ((storehouse.quantity*1) - (quantity*1)) }
      });
    },


////////// inSales methods ///////////////

    deleteInSales: function(id){
      Product_positions.remove(id);
    },

    salesUpdateProgress: function(id, x){
      Product_positions.update(id, {
        $set: {progress: x}
      });
    },

    soldProduct: function(id){
      var in_sales = Product_positions.findOne(id);
      var company = Companies.findOne({ owner: in_sales.owner });
      Companies.update(company._id,{
        $set: { company_money: (company.company_money*1)+(in_sales.quantity*in_sales.price*1) }
      });
      Product_positions.update(id, {
        $set: {quantity: in_sales.quantity*1-in_sales.quantity*1}
      });
    },

    salesUpdateIncome: function(id, x){
      Product_positions.update(id, {
        $set: {income: x}
      });
    },

    soldout: function(id){
      Product_positions.remove(id);
    },


  });