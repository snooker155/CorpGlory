Template.test_header.onRendered(function () {

    var self = this;
    if (self.view.isRendered) {
        var body = $('body');
            body.removeClass();
            body.addClass("skin-blu");

        $(function () {
            MeteorAdminLTE.run()
        });
    }
});