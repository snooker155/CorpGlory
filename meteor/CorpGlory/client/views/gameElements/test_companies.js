Template.test_companies.onRendered(function () {

    $(".select2-sphere").select2();
    $(".select2-country").select2();
    $(".select2-city").select2();
    $(".select2-org_structure").select2();
});



Template.test_companies.helpers({
	companies: function(){
		return Companies.find();
	},

	number_of_companies: function(){
		return Companies.find().count();
	},
});
