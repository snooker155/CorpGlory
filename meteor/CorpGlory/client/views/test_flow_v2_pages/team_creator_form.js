

var result = [];
var resultDep = new Tracker.Dependency();


var n = Departments.find().count()-1;
var price_for_employee = 0;
var employee_number = 0;
var max_employee_number = 10;
for (i=0; i<n; i++){
    result.push({
        id: i,
        value: i+1,
        price_for_employee: price_for_employee,
        employee_number: employee_number,
        max_employee_number: max_employee_number,
        sum_of_department: price_for_employee * employee_number,
    });
}






var tech_team_level_number = new ReactiveVar(0);

var market_team_level_number = new ReactiveVar(0);

var design_team_level_number = new ReactiveVar(0);



// Template.team_creator_form.onRendered(function(){

// 	var form = $("#team_creator_form");
 
//     form.validate({
//         errorPlacement: function errorPlacement(error, element) { element.before(error); },
//         rules: {
//             confirm: {
//                 equalTo: "#password"
//             }
//         }
//     });


// });



Template.team_creator_form.helpers({

    available_departments: function(){
        resultDep.depend();
        return result;
    },

    departments: function(){
        return Departments.find();
    },

    // price_for_employee: function(){
    //     return price_for_employee.get();
    // },

    // sum_of_department: function(){
    //     return price_for_employee.get() * employee_number.get();
    // },

    // employee_number: function(){
    //     return employee_number.get();
    // },

    // max_employee_number: function(){
    //     return max_employee_number.get();
    // },

    employee_number_increase_enabled:function(){
        return this.employee_number<this.max_employee_number?"":"disabled";
    },

    employee_number_decrease_enabled:function(){
        return this.employee_number>0?"":"disabled";
    },

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

    has_team: function(){
        var company = Companies.findOne({owner: Meteor.userId()});
        if (Employees.findOne({company_name: company.company_name})){
          return true;
        }
    }
});





Template.team_creator_form.events({
    'change #department_name': function(event, template){
        event.preventDefault();
        var department_name = event.target.value;
        var department = Departments.findOne({department_name: department_name});
        if (department){
            this.price_for_employee = department.employee_price;
            this.sum_of_department = this.price_for_employee * this.employee_number;
            resultDep.changed();
        }else{
            this.price_for_employee = 0;
            this.sum_of_department = this.price_for_employee * this.employee_number;
            resultDep.changed();
        }
    },

    "click #employee_increase": function(){
        this.employee_number += 1;
        this.sum_of_department = this.price_for_employee * this.employee_number;
        resultDep.changed();
    },

    "click #employee_decrease": function(){
        this.employee_number -= 1;
        this.sum_of_department = this.price_for_employee * this.employee_number;
        resultDep.changed();
    },

    "click #tech_team_level_minus": function(event){
            tech_team_level_number.set(tech_team_level_number.get() - 1);
            var obj = {
                "feature": "tech_team_level",
                "value": tech_team_level_number.get()
            };
            //Communication.send('company_change', obj);
    },

    "click #tech_team_level_plus": function(event){
            tech_team_level_number.set(tech_team_level_number.get() + 1);
            var obj = {
                "feature": "tech_team_level",
                "value": tech_team_level_number.get()
            };
            Communication.send('company_change', obj);
            console.log(obj);
    },

    "click #market_team_level_minus": function(event){
            market_team_level_number.set(market_team_level_number.get() - 1);
            var obj = {
                "feature": "market_team_level",
                "value": market_team_level_number.get()
            };
            Communication.send('company_change', obj);
            console.log(obj);
    },

    "click #market_team_level_plus": function(event){
            market_team_level_number.set(market_team_level_number.get() + 1);
            var obj = {
                "feature": "market_team_level",
                "value": market_team_level_number.get()
            };
            Communication.send('company_change', obj);
            console.log(obj);
    },

    "click #design_team_level_minus": function(event){
            design_team_level_number.set(design_team_level_number.get() - 1);
            var obj = {
                "feature": "design_team_level",
                "value": design_team_level_number.get()
            };
            Communication.send('company_change', obj);
            console.log(obj);
    },

    "click #design_team_level_plus": function(event){
            design_team_level_number.set(design_team_level_number.get() + 1);
            var obj = {
                "feature": "design_team_level",
                "value": design_team_level_number.get()
            };
            Communication.send('company_change', obj);
            console.log(obj);
    }
});
