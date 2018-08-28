function OrderModel(listOrders) {
	this._listOrders = listOrders;
	for (var i = 0; i < this._listOrders.length; i++) {
		this._listOrders[i].id = i + 1;
	}

}

OrderModel.prototype.getOrders = function(show, error) {
	$.ajax({
        type: "GET",
        url: "/orders",
		success: function(data, status){
			console.log(data);
			if (!data.Status) {
				error(data.ErrText);
				return;
			} else {
				if (data.Data != null) {
		    		for (var i = 0; i < data.Data.length; i++) {
		    			data.Data[i].id = data.Data[i].Id
		    		}
	    		}
	    		show(data.Data);
	    	}
		}
	});	
};


OrderModel.prototype.addOrder = function(order, showAdded, error) {
	if (order != null) {
		$.ajax({
		    type: "PUT",
		    url: "/orders",
			data: JSON.stringify({
				Book: order.Book,
				Reader: order.Reader,
				LastDay: order.LastDay
			}),
			contentType: "application/json",
			success: function(data, status){
	    		console.log(data);
				if (!data.Status) {
					error(data.ErrText);
					return;
				} else {	
					data.Data.id = data.Data.Id;
					showAdded();
				}
			}
		});
	}
};

OrderModel.prototype.deleteOrder = function(id, show, error) {
	if (id != null) {
		$.ajax({
	        type: "DELETE",
	        url: "/orders/" + id,
			success: function(data, status){
	    		console.log(data);
				if (!data.Status) {
					error(data.ErrText);
					return;
				} else {
					show();
				}
			}
		});
	}
};



OrderModel.prototype.changeOrder = function(newOrder, show, error) {
	$.ajax({
        type: "POST",
        url: "/orders/" + newOrder.Id,
		data: JSON.stringify({
			Book: newOrder.Book,
			Reader: newOrder.Reader,
			LastDay: newOrder.LastDay
		}),
		contentType: "application/json",
		success: function(data, status){
    		console.log(data);
    		if (!data.Status) {
				error(data.ErrText);
				return;
			} else {
				show();
			}
		}
	});
};

// OrderModel.prototype.returnWantedId = function() {
// 	if (this._listOrders.length > 0) {
// 		return this._listOrders[this._listOrders.length - 1].id + 1;
// 	}
// 	else return 1;
// };

// OrderModel.prototype.getSpecialOrders = function() {
// 	var orderData = [];
// 	for (var i = 0; i < this._listOrders.length; i++) {
// 		orderData[i] = new OrderForDT(this._listOrders[i].orderReader.readerName, this._listOrders[i].orderReader.readerSurname, 
// 			this._listOrders[i].orderBook.bookName, this._listOrders[i].orderBook.author, this._listOrders[i].lastDay);
// 		orderData[i].id = i + 1;
// 	}

// 	return orderData;
// };

// OrderModel.prototype.handling = function() {
// 	for (var i = 0; i < this._listOrders.length; i++) {
// 		if (this._listOrders[i].orderReader.deleted && !this._listOrders[i].orderBook.access) {
// 			this._listOrders[i].orderBook.access = true;
// 			this._listOrders[i].deleted = true;
// 			this._listOrders.splice(i, 1);
// 			i--;
// 		} else
// 		if (this._listOrders[i].orderReader.deleted || this._listOrders[i].orderBook.deleted) {
// 			this._listOrders[i].deleted = true;

// 			this._listOrders.splice(i, 1);
// 			i--;
// 		}
// 	}
// 	return this._listOrders;
// }

// OrderModel.prototype.deleteUnavailableOrders = function(ids) {
// 	var i = 0;
// 	while(i < this._listOrders.length) {
// 		for (var j = 0; j < ids.length; j++) {
// 			if (this._listOrders[i].id == ids[j]) {
// 				this._listOrders.splice(i, 1);
// 				i--;
// 				break;
// 			}
// 		}
// 		i++;
// 	}
// }
