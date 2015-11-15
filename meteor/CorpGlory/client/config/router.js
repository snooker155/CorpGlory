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





//////////////////////////////////////////////////////












//////////////////////////////////////////////////////









//
// Dashboards routes
//

Router.route('/dashboard1', function () {
    this.render('dashboard1');
});
Router.route('/dashboard2', function () {
    this.render('dashboard2');
});
Router.route('/dashboard3', function () {
    this.render('dashboard3');
});
Router.route('/dashboard4', function () {
    this.render('dashboard4');
    this.layout('layout2');
});
Router.route('/dashboard4l', function () {
    this.render('dashboard4l');
});


//
// Layouts route
//

Router.route('/layouts', function () {
    this.render('layouts');
});

//
// Graphs routes
//

Router.route('/graphFlot', function () {
    this.render('graphFlot');
});

Router.route('/graphRickshaw', function () {
    this.render('graphRickshaw');
});

Router.route('/graphChartJs', function () {
    this.render('graphChartJs');
});

Router.route('/graphPeity', function () {
    this.render('graphPeity');
});

Router.route('/graphSparkline', function () {
    this.render('graphSparkline');
});

//
// Mailbox
//

Router.route('/mailbox', function () {
    this.render('mailbox');
});

Router.route('/emailView', function () {
    this.render('emailView');
});

Router.route('/emailCompose', function () {
    this.render('emailCompose');
});

Router.route('/emailTemplates', function () {
    this.render('emailTemplates');
});

//
// Widgets
//

Router.route('/widgets', function () {
    this.render('widgets');
});

//
// Forms
//

Router.route('/formBasic', function () {
    this.render('formBasic');
});

Router.route('/formAdvanced', function () {
    this.render('formAdvanced');
});

Router.route('/formWizard', function () {
    this.render('formWizard');
});

Router.route('/formUpload', function () {
    this.render('formUpload');
});

Router.route('/textEditor', function () {
    this.render('textEditor');
});

//
// App Views
//

Router.route('/contacts', function () {
    this.render('contacts');
});

Router.route('/profile', function () {
    this.render('profile');
});

Router.route('/projects', function () {
    this.render('projects');
});

Router.route('/projectDetail', function () {
    this.render('projectDetail');
});

Router.route('/teamsBoard', function () {
    this.render('teamsBoard');
});

Router.route('/clients', function () {
    this.render('clients');
});

Router.route('/fullHeight', function () {
    this.render('fullHeight');
});

Router.route('/offCanvas', function () {
    this.render('offCanvas');
});

Router.route('/fileManager', function () {
    this.render('fileManager');
});

Router.route('/calendar', function () {
    this.render('calendar');
});

Router.route('/issueTracker', function () {
    this.render('issueTracker');
});

Router.route('/blog', function () {
    this.render('blog');
});

Router.route('/article', function () {
    this.render('article');
});

Router.route('/faq', function () {
    this.render('faq');
});

Router.route('/timelineOne', function () {
    this.render('timelineOne');
});

Router.route('/pinBoard', function () {
    this.render('pinBoard');
});

//
// Other pages
//

Router.route('/searchResult', function () {
    this.render('searchResult');
});

Router.route('/lockScreen', function () {
    this.render('lockScreen');
    this.layout('blankLayout')
});

Router.route('/invoice', function () {
    this.render('invoice');
});

Router.route('/invoicePrint', function () {
    this.render('invoicePrint');
    this.layout('blankLayout')
});

Router.route('/login', function () {
    this.render('login');
    this.layout('blankLayout')
});

Router.route('/loginTwo', function () {
    this.render('loginTwo');
    this.layout('blankLayout')
});

Router.route('/forgotPassword', function () {
    this.render('forgotPassword');
    this.layout('blankLayout')
});

Router.route('/register', function () {
    this.render('register');
    this.layout('blankLayout')
});

Router.route('/errorOne', function () {
    this.render('errorOne');
    this.layout('blankLayout')
});

Router.route('/errorTwo', function () {
    this.render('errorTwo');
    this.layout('blankLayout')
});

Router.route('/emptyPage', function () {
    this.render('emptyPage');
});

//
// Miscellaneous
//

Router.route('/toastrNotification', function () {
    this.render('toastrNotification');
});

Router.route('/nestableList', function () {
    this.render('nestableList');
});

Router.route('/agileBoard', function () {
    this.render('agileBoard');
});

Router.route('/timelineTwo', function () {
    this.render('timelineTwo');
});

Router.route('/diff', function () {
    this.render('diff');
});

Router.route('/idleTimer', function () {
    this.render('idleTimer');
});

Router.route('/spinners', function () {
    this.render('spinners');
});

Router.route('/liveFavicon', function () {
    this.render('liveFavicon');
});

Router.route('/googleMaps', function () {
    this.render('googleMaps');
});

Router.route('/codeEditor', function () {
    this.render('codeEditor');
});

Router.route('/modalWindow', function () {
    this.render('modalWindow');
});

Router.route('/forumView', function () {
    this.render('forumView');
});

Router.route('/forumDetail', function () {
    this.render('forumDetail');
});

Router.route('/validation', function () {
    this.render('validation');
});

Router.route('/treeView', function () {
    this.render('treeView');
});

Router.route('/chatView', function () {
    this.render('chatView');
});

//
// UI Elements
//

Router.route('/typography', function () {
    this.render('typography');
});

Router.route('/icons', function () {
    this.render('icons');
});

Router.route('/draggablePanels', function () {
    this.render('draggablePanels');
});

Router.route('/buttons', function () {
    this.render('buttons');
});

Router.route('/video', function () {
    this.render('video');
});

Router.route('/tabsPanels', function () {
    this.render('tabsPanels');
});

Router.route('/notifications', function () {
    this.render('notifications');
});

Router.route('/badgesLabels', function () {
    this.render('badgesLabels');
});

//
// Grid Options
//

Router.route('/gridOptions', function () {
    this.render('gridOptions');
});

//
// Tables
//

Router.route('/tableStatic', function () {
    this.render('tableStatic');
});

Router.route('/dataTables', function () {
    this.render('dataTables');
});

//
// Gallery
//

Router.route('/gallery', function () {
    this.render('gallery');
});

Router.route('/carusela', function () {
    this.render('carusela');
});


//
// CSS Animations
//

Router.route('/cssAnimations', function () {
    this.render('cssAnimations');
});
