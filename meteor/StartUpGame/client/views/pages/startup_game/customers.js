var user_array = new ReactiveArray()

$(function() {
	var i = 0;
	var first = true
	Communication.addSubscriber("users", function(users) {
		user_array.get().length = 0;
		if (first){
		users.forEach(function (user) {
			// if (user_array.get().length <= 98){
				user.product = "hello"+i;
		 		user_array.push(user);
		 		console.log(user);
		 		console.log(user_array.get().length);
		 	// }else{
		 	// 	if(i<=99) {
		 	// 		console.log(user);
				// 	var user_array_new = new ReactiveArray();
			 // 		user_array[i].set(user);
			 // 		console.log(user_array[i]);
			 // 		user_array[i].product = "hello"+i;
		 	// 		console.log(user_array[i].product);
			 // 		console.log(i);
			 // 		i++;
			 // 		console.log(user_array.get().length);
			 // 		console.log(i);
		 	// 	};
		 	// }
		 	i++;
		});
		first = false;
		}else{
			users.forEach(function (user) {
				user.product = "hello"+i;
		 		user_array.push({
		 			id: 10,
		 			name: 2313,
		 			product: 13123,
		 			loyalty: "23dfdsf",
		 			liberal: "dfsdfs",
		 			selfish: "ddsfdsf",
		 			threshold: "ddsfdsfs",
		 			friends: "dfdsfsdf"
		 		});
		 		console.log(user);
		 		console.log(user_array.get().length);
		 	i++;
			});
			first = true;
		}
		i = 0;
	});
});

Template.customers.helpers ({
	customers: function(){
		console.log(user_array.get());
		return user_array.get();
	},
});
