var status = new ReactiveVar(true);

Template.product.helpers({
	status: function(){
		console.log(status.get());
		return status.get();
	}
});

Template.product.events({
	"click #disable": function(event){
		status.set(status.get() === false? true:false);
	}
});
