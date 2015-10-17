var max_tech_team_level_number = new ReactiveVar(10);
var tech_team_level_number = new ReactiveVar(2);

var max_market_team_level_number = new ReactiveVar(8);
var market_team_level_number = new ReactiveVar(0);

var max_design_team_level_number = new ReactiveVar(9);
var design_team_level_number = new ReactiveVar(1);


Template.team.helpers({
	tech_team_level_number: function(){
		return tech_team_level_number.get();
	},

	max_tech_team_level_number: function(){
		return max_tech_team_level_number.get();
	},

	tech_team_level_plus_enabled:function(){
		return tech_team_level_number.get()<max_tech_team_level_number.get()?"":"disabled";
	},

	tech_team_level_minus_enabled:function(){
		return tech_team_level_number.get()>0?"":"disabled";
	},

	market_team_level_number: function(){
		return market_team_level_number.get();
	},

	max_market_team_level_number: function(){
		return max_market_team_level_number.get();
	},

	market_team_level_plus_enabled:function(){
		return market_team_level_number.get()<max_market_team_level_number.get()?"":"disabled";
	},

	market_team_level_minus_enabled:function(){
		return market_team_level_number.get()>0?"":"disabled";
	},

	design_team_level_number: function(){
		return design_team_level_number.get();
	},

	max_design_team_level_number: function(){
		return max_design_team_level_number.get();
	},

	design_team_level_plus_enabled:function(){
		return design_team_level_number.get()<max_design_team_level_number.get()?"":"disabled";
	},

	design_team_level_minus_enabled:function(){
		return design_team_level_number.get()>0?"":"disabled";
	},
});

Template.team.events({
	"click #tech_team_level_minus": function(event){
			tech_team_level_number.set(tech_team_level_number.get() - 1);
			var obj = {
				"feature": "tech_team_level",
				"value": tech_team_level_number.get()
			};
			send('company_change', obj);
			console.log(obj);
	},

	"click #tech_team_level_plus": function(event){
			tech_team_level_number.set(tech_team_level_number.get() + 1);
			var obj = {
				"feature": "tech_team_level",
				"value": tech_team_level_number.get()
			};
			send('company_change', obj);
			console.log(obj);
	},

	"click #market_team_level_minus": function(event){
			market_team_level_number.set(market_team_level_number.get() - 1);
			var obj = {
				"feature": "market_team_level",
				"value": market_team_level_number.get()
			};
			send('company_change', obj);
			console.log(obj);
	},

	"click #market_team_level_plus": function(event){
			market_team_level_number.set(market_team_level_number.get() + 1);
			var obj = {
				"feature": "market_team_level",
				"value": market_team_level_number.get()
			};
			send('company_change', obj);
			console.log(obj);
	},

	"click #design_team_level_minus": function(event){
			design_team_level_number.set(design_team_level_number.get() - 1);
			var obj = {
				"feature": "design_team_level",
				"value": design_team_level_number.get()
			};
			send('company_change', obj);
			console.log(obj);
	},

	"click #design_team_level_plus": function(event){
			design_team_level_number.set(design_team_level_number.get() + 1);
			var obj = {
				"feature": "design_team_level",
				"value": design_team_level_number.get()
			};
			send('company_change', obj);
			console.log(obj);
	}
});
