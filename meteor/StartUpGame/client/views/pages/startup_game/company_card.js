if(Meteor.isClient) {
	Template.company_card.companyBalance = function() {
		return Session.get('world').companies[0].money;
	}
}

Template.company_card.onRendered(function () {

	$("#sparkline1").sparkline([5,6,7,9,9,5,3,4,5,4,6,7], {
	    type: 'line',
	    width: '180px',
	    height: '70px',
	    lineColor: 'green',
	    fillColor: '#f5f5f5'});


	$("#sparkline2").sparkline([10,12,8,9,7,5,6,4,3,6,8,10], {
	    type: 'line',
	    width: '180px',
	    height: '70px',
	    lineColor: 'green',
	    fillColor: '#f5f5f5'});
});
	
	