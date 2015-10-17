Meteor.methods({

	addCustomer:function(user){
		Customers.insert({
		    id: user.id,
		    name: user.name,
		    product: user.product,
		    liberal: user.liberal,
		    selfish: user.selfish,
		    threshold: user.threshold,
		    friends: user.friends
		});
	}

})