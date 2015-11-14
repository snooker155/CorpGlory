Template.test_orders.onRendered(function () {

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


Template.test_orders.helpers({
    orders_list: function(){
    console.log(Orders.find({}));
      return Orders.find({});
    }
});