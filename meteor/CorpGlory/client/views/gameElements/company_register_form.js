Template.company_register_form.onRendered(function(){

	var form = $("#company_register_form");
 
    form.steps({
        headerTag: "h1",
        bodyTag: "fieldset",
        cssClass: "wizard wizard-big",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex)
        {
            // Allways allow previous action even if the current form is not valid!
            if (currentIndex > newIndex)
            {
                return true;
            }
            // Forbid next action on "Warning" step if the user is to young
            if (newIndex === 3 && Number($("#age-2").val()) < 18)
            {
                return false;
            }
            // Needed in some cases if the user went back (clean up)
            if (currentIndex < newIndex)
            {
                // To remove error styles
                form.find(".body:eq(" + newIndex + ") label.error").remove();
                form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
            }
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex)
        {
            // Used to skip the "Warning" step if the user is old enough.
            if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
            {
                form.steps("next");
            }
            // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
            if (currentIndex === 2 && priorIndex === 3)
            {
                form.steps("previous");
            }
        },
        onFinishing: function (event, currentIndex)
        {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex)
        {

            var company_name = event.target.company_name.value;
            var company_org_structure = event.target.org_structure.value;
            var company_sphere = event.target.sphere.value;
            var company_segment = event.target.segment.value;
            var company_country = event.target.country.value;
            //var company_address = event.target.address.value;

            //console.log(company_name+" # "+company_org_structure+" # "+company_sphere+" # "+company_segment+" # "+company_country+" # "+company_address);
            
            Meteor.call('addCompany', 
                company_name, 
                company_org_structure,
                company_sphere,
                company_segment,
                company_country
                //company_address
                );

        }
    }).validate({
        errorPlacement: function errorPlacement(error, element) { element.before(error); },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });



});



Template.company_register_form.helpers({
    spheres:function(){
        return Spheres.find({});
    },

    segments:function(){
        return Segments.find({sphere_name: "IT"});
    },

    countries:function(){
        return Countries.find({});
    },
});





Template.company_register_form.events({
    'change #sphere': function(event, template){
        event.preventDefault();
        var sphere_name = event.target.value;
        var segments = Segments.find({sphere_name: sphere_name}).fetch();
        var segment_list = document.getElementById("segment");
        segment_list.innerHTML = "";
        segments.forEach(function (segment) {
            var option = document.createElement("option");
            option.text = segment.segment_name;
            segment_list.add(option);
        });
    }
});