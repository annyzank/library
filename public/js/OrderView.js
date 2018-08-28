function OrderView() {
	this._flag = false;

}

OrderView.prototype.setMainLabel = function(count) {
	$$("labelOrders").setValue("Всего действующих заказов: " + count)
}

OrderView.prototype.error = function(errText) {	
	webix.message({
	    text: errText,
	    type:"error"
	});
}

OrderView.prototype.showOrders = function(orderList) {
	var ordrTable = $$("orders");
	ordrTable.clearAll();	

	console.log(orderList);

	if (orderList != null) {
		var ordrsUI = [];
		for (var i = 0; i < orderList.length; i++) {
			var ordUI = new OrderForUI("Список книг", orderList[i].Reader.Name, 
				orderList[i].Reader.Surname, null, orderList[i].LastDay);
			ordUI.Id =  orderList[i].Id;
			var bksUI = [];

			for (var j = 0; j < orderList[i].Book.length; j++) {
				bksUI[j] = new BookForUI(orderList[i].Book[j].Name, 
					orderList[i].Book[j].Author, orderList[i].Book[j].Year);
			}
			ordUI.data = bksUI;
			ordUI.id = ordUI.Id;
			ordrsUI[i] = ordUI;
		}
	}

	if (!this._flag) {
		ordrTable.define("columns",[
	        { id:"Id", header:"", width:50},
	        { id:"ReaderName", header:"Имя читателя", width:150},
	        { id:"ReaderSurname", header:"Фамилия читателя", width:150},
	        { id:"Name", header:"Наименование книги", width:250, 
	        	template:"{common.treetable()} #Name#", fillspace:true}, 
	        { id:"Author", header:"Автор(ы)", fillspace:true}, 
	        { id:"LastDay", header:"Дата возвращения", width:150}
	    ]);	
	    this._flag = true;	
	}
	ordrTable.define("data", ordrsUI);
	ordrTable.refresh();
}

OrderView.prototype.showWindowOrder = function() {
    newOrderWin.show();
    $$("changeOrderConfirm").hide();
	$$("addOrderConfirm").show();
}

OrderView.prototype.addOrder = function() {

	var form = $$("orderForm");

    if (form.validate()) {

		var selBook = $$("booksForOrder").getSelectedItem();
		var selReader = $$("readersForOrder").getSelectedItem();

		if (selBook != undefined && selReader != undefined) {
			for (var i = 0; i < selBook.length; i++) {
				selBook[i].Year = Number(selBook[i].Year); 
			}
			selReader.Year = Number(selReader.Year);
			var selBooks = [];
			if (selBook.length == undefined) {
				selBooks[0] = selBook;
			} else {
				selBooks = selBook;
			}

			var dt = $$("lastDay").getValue();

			$$("booksForOrder").unselectAll();
			$$("readersForOrder").unselectAll();
			$$("lastDay").setValue("");

			newOrderWin.hide();

			var obj = new Order(selReader, selBooks, dt);
			return obj;
		} else {
			webix.alert({
	    		type: "alert-error",
	    		text: "Выберите книгу и читателя!",
    		});
    		return null;
		}
	} else {
		return null;
	}
} 

OrderView.prototype.deleteOrder = function() {
	var selDelO = $$("orders").getSelectedItem();
	if (selDelO != undefined) {
		$$("orders").remove($$("orders").getSelectedId());

		return selDelO.Id;
	} else {
    	webix.alert({
    		type: "alert-error",
    		text: "Выберите заказ!",
    	});
    	return null;
	}
}

OrderView.prototype.showChangeWindowOrder = function() {
	var selChO = $$("orders").getSelectedItem();

	if (selChO != undefined) {
		newOrderWin.show();
	    $$("changeOrderConfirm").show();
		$$("addOrderConfirm").hide();

		$$("lastDay").setValue(selChO.LastDay);

	} else {
    	webix.alert({
    		type: "alert-error",
    		text: "Выберите заказ!",
    	});
	}
}

OrderView.prototype.changeOrderInfo = function() {
	var form = $$("orderForm");

    if (form.validate()) {

		var selBook = $$("booksForOrder").getSelectedItem();
		var selReader = $$("readersForOrder").getSelectedItem();
		var chOrdr = $$("orders").getSelectedItem();

		if (selBook != undefined && selReader != undefined && chOrdr != undefined) {
			for (var i = 0; i < selBook.length; i++) {
				selBook[i].Year = Number(selBook[i].Year); 
			}
			selReader.Year = Number(selReader.Year);
			var selBooks = [];
			if (selBook.length == undefined) {
				selBooks[0] = selBook;
			} else {
				selBooks = selBook;
			}

			var dt = $$("lastDay").getValue();

			$$("booksForOrder").unselectAll();
			$$("readersForOrder").unselectAll();
			$$("lastDay").setValue("");

			newOrderWin.hide();

			var obj = new Order(selReader, selBooks, dt);
			obj.Id = chOrdr.Id;


			return obj;
		} else {
			webix.alert({
	    		type: "alert-error",
	    		text: "Выберите книгу и читателя!",
    		});
    		return null;
		}
	} else {
		return null;
	}
}



// OrderView.prototype.showAddedOrder = function(data, dataList) {
// 	this._orderList.push(data);
// 	var bksUI = [];
// 	for (var i = 0; i < data.Book.length; i++) {
// 		bksUI[i] = new BookForUI(data.Book[i].Name, data.Book[i].Author, data.Book[i].Year);
// 	}
	
// 	var dataUI = new OrderForUI("Список книг", data.Reader.Name, 
// 		data.Reader.Surname, bksUI, data.LastDay);
// 	dataUI.Id = data.Id;

// 	var ordrTable = $$("orders");
// 	ordrTable.clearAll();	

// 	if (dataList != null) {
// 		var ordrsUI = [];
// 		for (var i = 0; i < dataList.length; i++) {
// 			var ordUI = new OrderForUI("Список книг", dataList[i].Reader.Name, 
// 				dataList[i].Reader.Surname, null, dataList[i].LastDay);
// 			ordUI.Id =  dataList[i].Id;
// 			var bksUI = [];

// 			for (var j = 0; j < dataList[i].Book.length; j++) {
// 				bksUI[j] = new BookForUI(dataList[i].Book[j].Name, 
// 					dataList[i].Book[j].Author, dataList[i].Book[j].Year);
// 			}
// 			ordUI.data = bksUI;
// 			ordUI.id = ordUI.Id;
// 			ordrsUI[i] = ordUI;
// 		}
// 	}
// 	ordrsUI.push(dataUI);

// 	ordrTable.define("data", ordrsUI);
// 	ordrTable.refresh();
// };
//showChanged
// for (var i = 0; i < this._orderList.length; i++) {
// 	if (this._orderList[i].Id = chOrdr.Id) {
// 		this._orderList[i] = obj;
// 	}
// }

// var bksUI = [];
// for (var i = 0; i < obj.Book.length; i++) {
// 	bksUI[i] = new BookForUI(obj.Book[i].Name, obj.Book[i].Author, obj.Book[i].Year);
// }
// var objUI = new OrderForUI("Список книг", obj.Reader.Name, 
// 	obj.Reader.Surname, bksUI, obj.LastDay);
// objUI.Id = obj.Id;

// var ordrTable = $$("orders");
// ordrTable.clearAll();

// if (this._orderList != null) {
// 	var ordrsUI = [];
// 	for (var i = 0; i < this._orderList.length; i++) {
// 		var ordUI = new OrderForUI("Список книг", this._orderList[i].Reader.Name, 
// 			this._orderList[i].Reader.Surname, null, this._orderList[i].LastDay);
// 		ordUI.Id =  this._orderList[i].Id;
// 		var bksUI = [];

// 		for (var j = 0; j < this._orderList[i].Book.length; j++) {
// 			bksUI[j] = new BookForUI(this._orderList[i].Book[j].Name, 
// 				this._orderList[i].Book[j].Author, this._orderList[i].Book[j].Year);
// 		}
// 		ordUI.data = bksUI;
// 		ordUI.id = ordUI.Id;
// 		ordrsUI[i] = ordUI;
// 	}
// }

// for (var i = 0; i < ordrsUI.length; i++) {
// 	if (ordrsUI[i].id = chOrdr.id) {
// 		ordrsUI[i] = objUI;
// 	}
// }

// ordrTable.define("data", ordrsUI);
// ordrTable.refresh();
// $$("orders").updateItem(chOrdr.id, objUI);	

// location.reload();