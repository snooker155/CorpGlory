var user_array = new ReactiveArray()

var iillkkk = 0;

$(function() {
	var i = 0;
	var first = true;
	Communication.addSubscriber("users", function(users) {
		$("#userstablebody").html();
		
		var hh = "";
		iillkkk++;
		
		for(var i in users) {
			var u = users[i];
			hh += "<tr>";
			hh += "<td>" + u.id + "</td>";
			hh += "<td>" + u.name + "</td>";
			hh += "<td>" + u.product + "</td>";
			hh += "<td>" + u.loyalty + "</td>";
			hh += "<td>" + iillkkk + "</td>"
			hh += "<td>" + u.selfish + "</td>";
			hh += "<td>" + u.threshold + "</td>";
			
			
			hh += "<td>" + u.friends + "</td>";
			

			hh += "</tr>";
		}
		
		$("#userstablebody").html(hh);
		
		
	});
});

Template.customers.helpers ({
	customers: function(){
		console.log(user_array.get());
		return user_array.get();
	},
});
