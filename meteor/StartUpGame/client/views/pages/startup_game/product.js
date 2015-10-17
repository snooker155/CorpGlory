var max_level_number = new ReactiveVar(5);
var level_number = new ReactiveVar(1);

Template.product.helpers({
	level_number: function(){
		return level_number.get();
	},

	max_level_number: function(){
		return max_level_number.get();
	},

	tech_level_plus_enabled:function(){
		return level_number.get()<max_level_number.get()?"":"disabled";
	},

	tech_level_minus_enabled:function(){
		return level_number.get()>0?"":"disabled";
	},
});

Template.product.events({
	"click #tech_level_minus": function(event){
		if (!this.disabled){
			level_number.set(level_number.get() - 1);
			var obj = {
				"feature": "tech_level",
				"value": -1
			};
			send('company_change', obj);
			console.log(obj);
		}
	},

	"click #tech_level_plus": function(event){
		if (!this.disabled){
			level_number.set(level_number.get() + 1);
			var obj = {
				"feature": "tech_level",
				"value": 1
			};
			send('company_change', obj);
			console.log(obj);
		}
	}
});
