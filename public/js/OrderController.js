function OrderController() {
	this._orderView = new OrderView();
	this._orderModel = new OrderModel(orders);
	//this._orderView.setMainLabel(this._orderModel.getOrders().length);
}

OrderController.prototype.attachOrderEvents = function() {
	var self = this;

	
	$$("tabbar").attachEvent("onItemClick", function(id, e) {	
		var show = function(data) {
			console.log(data)
			self._orderView.showOrders(data);
		}
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._orderModel.getOrders(show);
			//self._orderView.showOrders(self._orderModel.handling());
		}
	});

	$$("add-button").attachEvent("onItemClick", function(id, e) {	
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._orderView.showWindowOrder();
		}
	});

	$$("delete-button").attachEvent("onItemClick", function(id, e) {
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._orderModel.deleteOrder(self._orderView.deleteOrder());
		}	
	});

	$$("addOrderConfirm").attachEvent("onItemClick", function(id, e) {	
		self._orderModel.addOrder(self._orderView.addOrder(self._orderModel.returnWantedId()));
	});

	$$("change-button").attachEvent("onItemClick", function(id, e) {	
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._orderView.showChangeWindowOrder();
		}
	});

	$$("changeOrderConfirm").attachEvent("onItemClick", function(id, e) {	
		self._orderModel.changeOrder(self._orderView.changeOrderInfo());
	});

}