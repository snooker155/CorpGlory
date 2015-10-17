var money = new ReactiveVar (1);

Communication.addSubscriber('money_model', function(value) {
  console.log(value);
});

Template.main.helpers({
	money: function () {
		return money.get();
	}
});

Template.main.events({
  "click #mainButton": function foo() {
    send('getMoney');
  }
});