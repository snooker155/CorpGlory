Template.marketing.events({
	"click #social_market": function(event){
			var obj = {
				"feature": "social_market",
				"value": 1500
			};
			Communication.send('company_change', obj);
			console.log(obj);
	},

	"click #conference_market": function(event){
			var obj = {
				"feature": "conference_market",
				"value": 300
			};
			Communication.send('company_change', obj);
			console.log(obj);
	},

	"click #article_market": function(event){
			var obj = {
				"feature": "article_market",
				"value": 700
			};
			Communication.send('company_change', obj);
			console.log(obj);
	},

});
