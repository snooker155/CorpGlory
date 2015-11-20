  Meteor.publish("users", function() {
    return Meteor.users.find();
  });
  Meteor.publish("spheres", function() {
    return Spheres.find();
  });
  Meteor.publish("segments", function() {
    return Segments.find();
  });
  Meteor.publish("countries", function() {
    return Countries.find();
  });
  Meteor.publish("products", function() {
    return Products.find();
  });
  Meteor.publish("product_positions", function() {
    return Product_positions.find();
  });
  Meteor.publish("companies", function() {
    return Companies.find();
  });
  Meteor.publish("employees", function() {
    return Employees.find();
  });
  Meteor.publish("departments", function() {
    return Departments.find();
  });
  Meteor.publish("orders", function() {
    return Orders.find({ owner: this.userId });
  });
  Meteor.publish("resources", function() {
    return Resources.find({ owner: this.userId });
  });
  Meteor.publish("technologies", function() {
    return Technologies.find({ owner: this.userId });
  });
  Meteor.publish("technology_list", function() {
    return Technology_list.find({ owner: this.userId });
  });
  Meteor.publish("inProductions", function() {
    return inProduction.find({ owner: this.userId });
  });
  Meteor.publish("inStorehouses", function() {
    return inStorehouse.find({ owner: this.userId });
  });
  Meteor.publish("inSaleses", function() {
    return inSales.find({ owner: this.userId });
  });