Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'
});


Router.route('/',
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
