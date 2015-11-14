Template.test_sidebar.onRendered(function () {

    var self = this;
    if (self.view.isRendered) {
        var body = $('body');
            body.removeClass();
            body.addClass("skin-blue");

        $(function () {
            MeteorAdminLTE.run()
        });
    }
});