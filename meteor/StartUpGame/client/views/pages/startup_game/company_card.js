if(Meteor.isClient) {
	
	Template.company_card.companyBalance = function() {
		return Session.get('world').companies[0].money;
	};
	
	Template.company_card.companyBalanceStat = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	
}



Template.company_card.onRendered(function () {
	Tracker.autorun(function () {
		if(Session.get('world') === undefined) {
			return;
		}
		
		Template.company_card.companyBalanceStat.push(Template.company_card.companyBalance());
		Template.company_card.companyBalanceStat.shift();
		
		$("#balanceGraph").sparkline(
			Template.company_card.companyBalanceStat, {
			type: 'line',
			width: '180px',
			height: '70px',
			lineColor: 'green',
			fillColor: '#f5f5f5'});
	
		
	});
	
});
	
	