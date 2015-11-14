Template.users.helpers({
    users: function (){
    	console.log(Meteor.users.find().fetch());
      	return Meteor.users.find();
    },

    number_of_users: function(){
    	return Meteor.users.find().count();
    }
});




Template.companies.helpers({
    companies: function (){
    	console.log(Companies.find().fetch());
      	return Companies.find();
    },

    number_of_companies: function(){
    	return Companies.find().count();
    }
});




Template.users.events({
    // "click #save": function (event){
    // 	var username = $("#"+this._id+"username").val();;
    // 	// var address = $("#"+this._id+"address").val();
    // 	var profile_name = $("#"+this._id+"profile_name").val();
    // 	console.log(username+" # "+profile_name);
    //   	Meteor.call("setUsername", this._id, username);
    // },

    "click #delete": function(event){
    	//console.log(Meteor.users.findOne({_id: this._id}));
    	Meteor.call("deleteUser",this._id);
    }
});





Template.companies.events({
    // "click #save": function (event){
    // 	var username = $("#"+this._id+"username").val();;
    // 	// var address = $("#"+this._id+"address").val();
    // 	var profile_name = $("#"+this._id+"profile_name").val();
    // 	console.log(username+" # "+profile_name);
    //   	Meteor.call("setUsername", this._id, username);
    // },

    "click #delete": function(event){
    	//console.log(Meteor.users.findOne({_id: this._id}));
    	Meteor.call("deleteCompany",this._id);
    }
});





var segments_list = new ReactiveVar(1);


  Template.spheres.helpers({
    spheres: function () {
      return Spheres.find();
    },


    segments_list: function(){
      console.log(segments_list.get());
      result = [];
      for(i=1; i<segments_list.get(); i++){
        result.push({value: i});
      }
      return result;
    },

    unremoveable: function(){
      return segments_list.get() > 1;
    },

    number_of_spheres: function(){
        return Spheres.find().count();
    },


  });



  Template.spheres.events({

    'submit #create_sphere': function(event, template){
      event.preventDefault();

      var sphere_name = event.target.sphere_name.value;

      console.log(segments_list.get());

      var input = [];
      for (i=0; i<segments_list.get(); i++){
        input.push({
          id: i,
          segment_name: template.$('[id=segment_name'+i+']').val(),
        });
        template.$('[id=segment_name'+i+']').val("");
      }

        console.log(sphere_name);
        console.log(input);

      Meteor.call('addSphere', sphere_name, input);

      event.target.sphere_name.value = "";
    },

    'click #add_segment': function(){
      segments_list.set(segments_list.get()+1);
    },

    'click #remove_segment': function(){
      segments_list.set(segments_list.get()-1);
    },

    'click #save': function(){
      var sphere_name = $("#"+this._id+"sphere_name").val();
      console.log(sphere_name);
      Meteor.call('saveSphere', this._id, sphere_name, function (error, result) {});
    },

    'click #delete': function(){
        Meteor.call('deleteSphere', this._id, function (error, result) {});
    }


  });


  Template.sphere.helpers({
    sphere_segments: function (){
      //console.log(Segments.find({sphere_name: this.sphere_name}).fetch());  
      return Segments.find({sphere_id: this._id});
    },


  });




  Template.segments.helpers({
    segments: function () {
      return Segments.find();
    },

    number_of_segments: function(){
        return Segments.find().count();
    },


  });



  Template.segments.events({

    'submit #create_segment': function(event, template){
      event.preventDefault();

      var segment_name = event.target.segment_name.value;

      Meteor.call('addSegment', segment_name);

      event.target.segment_name.value = "";
    },

    'click #save': function(){
      var segment_name = $("#"+this._id+"segment_name").val();
      console.log(segment_name);
      Meteor.call('saveSegment', this._id, segment_name, function (error, result) {});
    },

    'click #delete': function(){
        Meteor.call('deleteSegment', this._id, function (error, result) {});
    }


  });




  Template.countries.helpers({
    countries: function () {
      return Countries.find();
    },

    number_of_countries: function(){
        return Countries.find().count();
    },


  });



  Template.countries.events({

    'submit #create_country': function(event, template){
      event.preventDefault();

      var country_name = event.target.country_name.value;

      Meteor.call('addCountry', country_name);

      event.target.country_name.value = "";
    },

    'click #save': function(){
      var country_name = $("#"+this._id+"country_name").val();
      console.log(country_name);
      Meteor.call('saveCountry', this._id, country_name, function (error, result) {});
    },

    'click #delete': function(){
        Meteor.call('deleteCountry', this._id, function (error, result) {});
    }


  });




  Template.departments.helpers({
    departments: function () {
      return Departments.find();
    },

    number_of_departments: function(){
        return Departments.find().count();
    },


  });



  Template.departments.events({

    'submit #create_department': function(event, template){
      event.preventDefault();

      var department_name = event.target.department_name.value;
      var employee_price = event.target.employee_price.value;

      Meteor.call('addDepartment', department_name, employee_price);

      event.target.department_name.value = "";
      event.target.employee_price.value = "";
    },

    'click #save': function(){
      var department_name = $("#"+this._id+"department_name").val();
      var employee_price = $("#"+this._id+"employee_price").val();
  
      Meteor.call('saveDepartment', this._id, department_name, employee_price, function (error, result) {});
    },

    'click #delete': function(){
        Meteor.call('deleteDepartment', this._id, function (error, result) {});
    }


  });

