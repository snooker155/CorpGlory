Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});



Router.route('/startup', function () {
    this.render('startup');
    this.layout('blankLayout');
});


Router.route('/world', function () {
    this.render('world');
    this.layout('blankLayout');
});


Router.route('/test_dashboard', 
  // {
  // template: 'test_dashboard',
  // onBeforeAction: function () {
  //   var currentUser = Meteor.userId();
  //   if(currentUser){
  //     this.next();
  //   }else{
  //     Router.go('login');
  //   }
  // }
  function(){
    this.render('test_dashboard');
});


Router.route('/product', function () {
    this.render('product');
});

Router.route('/marketing', function () {
    this.render('marketing');
});

Router.route('/team', function () {
    this.render('team');
});

Router.route('/investments', function () {
    this.render('investments');
});

Router.route('/customers', function () {
    this.render('customers');
});


//////////////  TEST ENV Routers  ///////////////////

Router.route('/admin_panel', function(){
   this.render('admin_panel');
});

Router.route('/test_companies', 
  // {
  // template: 'test_companies',
  // onBeforeAction: function () {
  //   var currentUser = Meteor.userId();
  //   if(currentUser){
  //     this.next();
  //   }else{
  //     Router.go('login');
  //   }
  // }
  function(){
    this.render('test_companies');
});

Router.route('/test_company', 
  // {
  // template: 'test_company',
  // onBeforeAction: function () {
  //   var currentUser = Meteor.userId();
  //   if(currentUser){
  //     this.next();
  //   }else{
  //     Router.go('login');
  //   }
  // }
  function(){
    this.render('test_company');
});

Router.route('/test_company_2', 
  // {
  // template: 'test_company_2',
  // onBeforeAction: function () {
  //   var currentUser = Meteor.userId();
  //   if(currentUser){
  //     this.next();
  //   }else{
  //     Router.go('login');
  //   }
  // }
  function(){
    this.render('test_company_2');
});

Router.route('/test_company_edit', function () {
  this.render('test_company_edit');
});

Router.route('/test_employee', function () {
  this.render('test_employee');
});

Router.route('/test_employee_edit', function () {
  this.render('test_employee_edit');
});

Router.route('/test_projects', 
  // {
  // template: 'test_projects',
  // onBeforeAction: function () {
  //   var currentUser = Meteor.userId();
  //   if(currentUser){
  //     this.next();
  //   }else{
  //     Router.go('login');
  //   }
  // }
  function(){
    this.render('test_projects');
});

Router.route('/test_project', function () {
  this.render('test_project');
});

Router.route('/test_products', 
  // {
  // template: 'test_products',
  // onBeforeAction: function () {
  //   var currentUser = Meteor.userId();
  //   if(currentUser){
  //     this.next();
  //   }else{
  //     Router.go('login');
  //   }
  // }
  function(){
    this.render('test_products');
});

Router.route('/test_product', function () {
  this.render('test_product');
});

Router.route('/test_product_admin', function () {
  this.render('test_product_admin');
});

Router.route('/test_product_edit', function () {
  this.render('test_product_edit');
});

Router.route('/test_product_positions', function () {
  this.render('test_product_positions');
});

Router.route('/test_product_position', function () {
  this.render('test_product_position');
});

Router.route('/test_orders', function () {
  this.render('test_orders');
});

Router.route('/test_order', function () {
  this.render('test_order');
});

Router.route('/test_order_edit', function () {
  this.render('test_order_edit');
});

Router.route('/test_technologies', function () {
  this.render('test_technologies');
});

Router.route('/test_technology', function () {
  this.render('test_technology');
});

Router.route('/test_technology_edit', function () {
  this.render('test_technology_edit');
});

Router.route('/test_resources', function () {
  this.render('test_resources');
});

Router.route('/test_resource', function () {
  this.render('test_resource');
});

Router.route('/test_resource_edit', function () {
  this.render('test_resource_edit');
});

Router.route('/test_in_productions', function () {
  this.render('test_in_productions');
});

Router.route('/test_in_production', function () {
  this.render('test_in_production');
});

Router.route('/test_in_storehouses', function () {
  this.render('test_in_storehouses');
});

Router.route('/test_in_storehouse', function () {
  this.render('test_in_storehouse');
});

Router.route('/test_in_sales', function () {
  this.render('test_in_sales');
});

Router.route('/test_in_sale', function () {
  this.render('test_in_sale');
});



//
// Other pages routes
//
Router.route('/notFound', function () {
    this.render('notFound');
});



// Default route
// You can use direct this.render('template')
// We use Router.go method because dashboard1 is our nested view in menu
Router.route('/', 
  // Router.go('test_dashboard'),{
  // onBeforeAction: function () {
  //   var currentUser = Meteor.userId();
  //   if(currentUser){
  //     this.next();
  //   }else{
  //     Router.go('login');
  //   }
  // }
  function(){
    this.render('gameScreen');
    this.layout('blankLayout');
});


//
// CSS Animations
//

Router.route('/cssAnimations', function () {
    this.render('cssAnimations');
});
