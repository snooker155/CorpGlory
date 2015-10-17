Template.getTime.helpers({
	getTime: function(){
		return Meteor.call('getTime');
	}
})