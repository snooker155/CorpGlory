Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

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

Router.route('/', function () {
    this.render('main');
});



