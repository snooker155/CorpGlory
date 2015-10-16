Template.product.helpers({
	status: function(){
		return true;
	}
});

Template.product.events({
	"click #disable": function(event){
		Meteor.call('disable');
	}
});
