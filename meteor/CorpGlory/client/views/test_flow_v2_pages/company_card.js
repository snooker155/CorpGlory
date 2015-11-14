// if(Meteor.isClient) {
	
// 	Template.company_card.companyBalance = function() {
// 		console.log()
// 		var money = Session.get('world').companies[0].money;
// 		return money > 0 ? Math.round(money) : 0;
// 	};
	
// 	Template.company_card.marketShare = function () {
// 		var users = Session.get('world').users;
// 		var market_share = Session.get('world').companies[0].product_model.users + 0.0;
		
// 		console.log(market_share, users.length);
		
// 		return Math.round((market_share / users.length) * 100);
// 	};

// 	var first_game_over = true;
// 	var first_win = true;

// 	Template.company_card.game_over = function () {
// 		console.log(Session.get('world').game_over);
// 		if (Session.get('world').game_over && first_game_over){
// 			$("#game_over_button").click();
// 			first_game_over = false;
// 			Communication.close();
// 		}
// 	};

// 	Template.company_card.win = function () {
// 		console.log(Session.get('world').game_over);
// 		var market_share = Session.get('world').companies[0].product_model.users + 0.0;
// 		if (Math.round((market_share / users.length) * 100) > 90 && first_win){
// 			$("#win_button").click();
// 			first_win = false;
// 			Communication.close();
// 		}
// 	};
	
// 	Template.company_card.companyBalanceStat = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
// }

// Template.company_card.onRendered(function () {
// 	Tracker.autorun(function () {
// 		if(Session.get('world') === undefined) {
// 			return;
// 		}

		
// 		Template.company_card.companyBalanceStat.push(Template.company_card.companyBalance());
// 		Template.company_card.companyBalanceStat.shift();
		
// 		$("#balanceGraph").sparkline(
// 			Template.company_card.companyBalanceStat, {
// 			type: 'line',
// 			width: '180px',
// 			height: '70px',
// 			lineColor: 'green',
// 			fillColor: '#f5f5f5'});
	
		
// 	});
	
// });




Template.company_card.helpers({
	has_company: function (){
      if (Companies.findOne({owner: Meteor.userId()})){
        return Companies.findOne({owner: Meteor.userId()});
      }
    },
});
