function OrderView() {
	this._flag = false;

}

OrderView.prototype.setMainLabel = function(count) {
	$$("labelOrders").setValue("Всего действующих заказов: " + count)
}

OrderView.prototype.showOrders = function(orderList) {

	var ordrTable = $$("orders");
	for (var i = 0; i < ordrTable.count(); i++) {
		if (ordrTable.getItem(ordrTable.getIdByIndex(i)).deleted) {
			
			ordrTable.remove(ordrTable.getIdByIndex(i));
			i--;
		}	
	}

	if(!this._flag) {
		ordrTable.define("data", orderList);
		ordrTable.define("columns",[
	        { id:"Id", template:"#Id#",    header:"", width:50},
	        { id:"Reader.Name", template:"#Reader.Name#", header:"Имя читателя", width:150},
	        { id:"Reader.Surname", template:"#Reader.Surname#",  header:"Фамилия читателя", width:150},
	        { id:"Book.Name", template:"#Book[0].Name#", header:"Наименование книги", fillspace:true}, //!!!book
	        { id:"Book.Author", template:"#Book[0].Author#", header:"Автор(ы)", fillspace:true}, //!!!book
	        { id:"LastDay", template:"#LastDay#", header:"Дата возвращения", width:150}
	    ]);	
	    this._flag = true;

	}

	//ordrTable.define("template", '#id#. Читатель: #orderReader.readerName# #orderReader.readerSurname#. Книга: ' +
	//			         '"#orderBook.bookName#", #orderBook.author#. Дата возвращения: #lastDay#.');

	ordrTable.refresh();
}

OrderView.prototype.showWindowOrder = function() {
    newOrderWin.show();
    $$("changeOrderConfirm").hide();
	$$("addOrderConfirm").show();
}

OrderView.prototype.addOrder = function(wantedId) {

	var form = $$("orderForm");

    if (form.validate()) {

		var selBook = $$("booksForOrder").getSelectedItem();
		var selReader = $$("readersForOrder").getSelectedItem();

		if (selBook != undefined && selReader != undefined) {

			var dt = $$("lastDay").getValue();


			$$("booksForOrder").unselectAll();
			$$("readersForOrder").unselectAll();
			$$("lastDay").setValue("");

			newOrderWin.hide();

			var obj = new Order(selReader, selBook, dt);
			obj.id = wantedId;
			$$("orders").add(obj);
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
		return selDelO.id;
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

		$$("lastDay").setValue(selChO.lastDay);

		//$$("booksForOrder").select(selChO.orderBook.id);
		$$("readersForOrder").select(selChO.orderReader.id);
	} else {
    	webix.alert({
    		type: "alert-error",
    		text: "Выберите заказ!",
    	});
	}
}

OrderView.prototype.changeOrderInfo = function() {
	var selBk = $$("booksForOrder").getSelectedItem();
	var selRdr = $$("readersForOrder").getSelectedItem();
	var dt = $$("lastDay").getValue();

	var chOrdr = $$("orders").getSelectedItem();
	chOrdr.orderBook.access = true;
	var newOrderObj = new Order(selRdr, selBk, dt);
	newOrderObj.id = chOrdr.id;
	$$("orders").updateItem(chOrdr.id, newOrderObj);

	newOrderWin.hide();

	return newOrderObj;
}