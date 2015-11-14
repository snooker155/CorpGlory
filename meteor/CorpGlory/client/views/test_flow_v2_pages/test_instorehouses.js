Template.test_in_storehouses.onRendered(function () {

    var self = this;
    if (self.view.isRendered) {
        var body = $('body');
            body.removeClass();
            body.addClass("skin-blue");

        $(function () {
            MeteorAdminLTE.run()
        });
    }

    $(".select2-sphere").select2();
    $(".select2-country").select2();
    $(".select2-city").select2();

    
});