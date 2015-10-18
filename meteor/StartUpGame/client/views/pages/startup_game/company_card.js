if(Meteor.isClient) {
	
	Template.company_card.companyBalance = function() {
		console.log()
		var money = Session.get('world').companies[0].money;
		return money > 0 ? Math.round(money) : 0;
	};
	
	Template.company_card.marketShare = function () {
		var users = Session.get('world').users;
		var market_share = Session.get('world').companies[0].product_model.users + 0.0;
		
		console.log(market_share, users.length);
		
		return Math.round((market_share / users.length) * 100);
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