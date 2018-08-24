function OrderModel(listOrders) {
	this._listOrders = listOrders;
	for (var i = 0; i < this._listOrders.length; i++) {
		this._listOrders[i].id = i + 1;
	}

}

OrderModel.prototype.getOrders = function(a) {
	$.ajax({
        type: "GET",
        url: "/orders",
		success: function(data, status){
    		for (var i = 0; i < data.length; i++) {
    			data[i].id = data[i].Id
    		}
    		a(data);
		}
	});	
	//return this._listOrders;
};

OrderModel.prototype.getSpecialOrders = function() {
	var orderData = [];
	for (var i = 0; i < this._listOrders.length; i++) {
		orderData[i] = new OrderForDT(this._listOrders[i].orderReader.readerName, this._listOrders[i].orderReader.readerSurname, 
			this._listOrders[i].orderBook.bookName, this._listOrders[i].orderBook.author, this._listOrders[i].lastDay);
		orderData[i].id = i + 1;
	}

	return orderData;
};

OrderModel.prototype.addOrder = function(order) {
	if (order != null) {
		this._listOrders.push(order);

	}
};

OrderModel.prototype.deleteOrder = function(id) {
	if (id != null) {
		var delIndex;
		for (var i = 0; i < this._listOrders.length; i++) {
			if (this._listOrders[i].id == id) {
				delIndex = i;
			}
		}
		this._listOrders[delIndex].orderBook.access = true;
		this._listOrders.splice(delIndex, 1);
	}
};

OrderModel.prototype.returnWantedId = function() {
	if (this._listOrders.length > 0) {
		return this._listOrders[this._listOrders.length - 1].id + 1;
	}
	else return 1;
};

OrderModel.prototype.changeOrder = function(newOrder) {
	for (var i = 0; i < this._listOrders.length; i++) {
		if (this._listOrders[i].id == newOrder.id) {
			var index = i;
		}
	}

	this._listOrders[index] = newOrder;
};

OrderModel.prototype.handling = function() {
	for (var i = 0; i < this._listOrders.length; i++) {
		if (this._listOrders[i].orderReader.deleted && !this._listOrders[i].orderBook.access) {
			this._listOrders[i].orderBook.access = true;
			this._listOrders[i].deleted = true;
			this._listOrders.splice(i, 1);
			i--;
		} else
		if (this._listOrders[i].orderReader.deleted || this._listOrders[i].orderBook.deleted) {
			this._listOrders[i].deleted = true;

			this._listOrders.splice(i, 1);
			i--;
		}
	}
	return this._listOrders;
}

OrderModel.prototype.deleteUnavailableOrders = function(ids) {
	var i = 0;
	while(i < this._listOrders.length) {
		for (var j = 0; j < ids.length; j++) {
			if (this._listOrders[i].id == ids[j]) {
				this._listOrders.splice(i, 1);
				i--;
				break;
			}
		}
		i++;
	}
}
