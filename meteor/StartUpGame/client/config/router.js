Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});



Router.route('/', function () {
    this.render('main');
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