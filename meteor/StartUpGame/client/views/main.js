var money = new ReactiveVar (1);

ws.onmessage = function(event) {
  money.set(event.data);
};

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