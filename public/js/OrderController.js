function OrderController() {
	this._orderView = new OrderView();
	this._orderModel = new OrderModel(orders);
	//this._orderView.setMainLabel(this._orderModel.getOrders().length);
}

OrderController.prototype.attachOrderEvents = function() {
	var self = this;

	
	$$("tabbar").attachEvent("onItemClick", function(id, e) {	
		var show = function(data) {
			self._orderView.showOrders(data);
		}
		var error = function(text) {
			self._orderView.error(text);
		}
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._orderModel.getOrders(show, error);
		}
	});

	$$("add-button").attachEvent("onItemClick", function(id, e) {	
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._orderView.showWindowOrder();
		}
	});


	$$("delete-button").attachEvent("onItemClick", function(id, e) {
		var error = function(text) {
			self._orderView.error(text);
		}
		var show = function() {
			var showUpd = function(dataList) {
				self._orderView.showOrders(dataList);
			}
			self._orderModel.getOrders(showUpd, error);
		}
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._orderModel.deleteOrder(self._orderView.deleteOrder(), show, error);
		}	
	});



	$$("addOrderConfirm").attachEvent("onItemClick", function(id, e) {	
		var showAdded = function() {
			var show = function(dataList) {
				self._orderView.showOrders(dataList);
			}
			self._orderModel.getOrders(show, error);
		}
		var error = function(text) {
			self._orderView.error(text);
		}
		self._orderModel.addOrder(self._orderView.addOrder(), showAdded, error);

	});

	$$("change-button").attachEvent("onItemClick", function(id, e) {	
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._orderView.showChangeWindowOrder();
		}
	});


	$$("changeOrderConfirm").attachEvent("onItemClick", function(id, e) {
		var error = function(text) {
			self._orderView.error(text);
		}	
		var show = function() {
			var showUpd = function(dataList) {
				self._orderView.showOrders(dataList);
			}
			self._orderModel.getOrders(showUpd, error);
		}
		self._orderModel.changeOrder(self._orderView.changeOrderInfo(), show, error);
	});

}