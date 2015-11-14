var max_tech_level_number = new ReactiveVar(5);
var tech_level_number = new ReactiveVar(1);

var max_design_level_number = new ReactiveVar(3);
var design_level_number = new ReactiveVar(0);

Template.product.helpers({
	tech_level_number: function(){
		return tech_level_number.get();
	},

	max_tech_level_number: function(){
		return max_tech_level_number.get();
	},

	tech_level_plus_enabled:function(){
		return tech_level_number.get()<max_tech_level_number.get()?"":"disabled";
	},

	tech_level_minus_enabled:function(){
		return tech_level_number.get()>0?"":"disabled";
	},

	design_level_number: function(){
		return design_level_number.get();
	},

	max_design_level_number: function(){
		return max_design_level_number.get();
	},

	design_level_plus_enabled:function(){
		return design_level_number.get()<max_design_level_number.get()?"":"disabled";
	},

	design_level_minus_enabled:function(){
		return design_level_number.get()>0?"":"disabled";
	},

	has_product: function(){
		var company = Companies.findOne({owner: Meteor.userId()});
	    if (Product.findOne({company_name: company.company_name})){
	      return true;
	    }
	}
});

Template.product.events({
	"click #tech_level_minus": function(event){
			tech_level_number.set(tech_level_number.get() - 1);
			var obj = {
				"feature": "tech_level",
				"value": tech_level_number.get()
			};
			Communication.send('company_change', obj);
			console.log(obj);
	},

	"click #tech_level_plus": function(event){
			tech_level_number.set(tech_level_number.get() + 1);
			var obj = {
				"feature": "tech_level",
				"value": tech_level_number.get()
			};
			Communication.send('company_change', obj);
			console.log(obj);
	},

	"click #design_level_minus": function(event){
			design_level_number.set(design_level_number.get() - 1);
			var obj = {
				"feature": "design_level",
				"value": design_level_number.get()
			};
			Communication.send('company_change', obj);
			console.log(obj);
	},

	"click #design_level_plus": function(event){
			design_level_number.set(design_level_number.get() + 1);
			var obj = {
				"feature": "design_level",
				"value": design_level_number.get()
			};
			Communication.send('company_change', obj);
			console.log(obj);
	}
});
