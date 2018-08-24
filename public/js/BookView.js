function BookView() {
	this._flag = false;
}

BookView.prototype.setMainLabel = function(count) {
	$$("labelBooks").setValue("Всего книг в библиотеке: " + count)
}

BookView.prototype.showBooks = function(bookList) {	
	if(!this._flag) {
		var bkTable = $$("books");
		bkTable.define("data", bookList);
		bkTable.define("columns",[
	        { id:"Id", header:"", width:50},
	        { id:"Name",  header:"Наименование", fillspace:true},
	        { id:"Author",  header:"Автор(ы)", fillspace:true},
	        { id:"Year", header:"Год выпуска", width:100}
	    ]);
		//bkTable.define("template", '#id#. Наименование: "#bookName#", автор(ы): #author#, год выпуска: #bookYear#.');
		this._flag = true;
	}
	bkTable.refresh();
}

BookView.prototype.showWindowBook = function() {
    newBookWin.show();
    $$("changeBookConfirm").hide();
	$$("addBookConfirm").show();

	$$("bookName").setValue("");
	$$("author").setValue("");
	$$("bookYear").setValue("");
}

BookView.prototype.addBook = function() {
	var form = $$("bookForm");
    if (form.validate()){

		var bn = $$("bookName").getValue();
		var an = $$("author").getValue();
		var by = $$("bookYear").getValue();
		by = Number(by);



		$$("bookName").setValue("");
		$$("author").setValue("");
		$$("bookYear").setValue("");

		newBookWin.hide();

		var obj = new Bok(bn, an, by);

		return obj;
	} else {
		return null;
	}
}

BookView.prototype.showAddedBook = function(data) {
	$$("books").add(data);
};

BookView.prototype.deleteBook = function() {
	var selDelB = $$("books").getSelectedItem();
	if (selDelB != undefined) {
		$$("books").remove($$("books").getSelectedId());
		return selDelB.id;
	} else {
    	webix.alert({
    		type: "alert-error",
    		text: "Выберите книгу!",
    	});
    	return null;
	}
}

BookView.prototype.showChangeWindowBook = function() {

	var selChB = $$("books").getSelectedItem();
	if (selChB != undefined) {
	    newBookWin.show();
	    $$("changeBookConfirm").show();
		$$("addBookConfirm").hide();

		var selChB = $$("books").getSelectedItem();
		$$("bookName").setValue(selChB.bookName);
		$$("author").setValue(selChB.author);
		$$("bookYear").setValue(selChB.bookYear);
	} else {
    	webix.alert({
    		type: "alert-error",
    		text: "Выберите книгу!",
    	});
	}

}

BookView.prototype.changeBookInfo = function(bookList) {
	var newBN = $$("bookName").getValue();
	var newAN = $$("author").getValue();
	var newY = $$("bookYear").getValue();

	var chBk = $$("books").getSelectedItem();
	var newBookObj = new Book(newBN, newAN, newY);
	newBookObj.id = chBk.id;
	$$("books").updateItem(chBk.id, newBookObj);

	newBookWin.hide();

	return newBookObj;
}

BookView.prototype.showBooksForOrders = function(bookList) {
	console.log(bookList);
	var tableForOrders = $$("booksForOrder");
	tableForOrders.clearAll();
	tableForOrders.define("data", bookList);
	tableForOrders.define("columns",[
        { id:"Id", header:"", width:50},
        { id:"Name",  header:"Наименование", fillspace:true},
        { id:"Author",  header:"Автор(ы)", fillspace:true},
        { id:"Year", header:"Год выпуска", width:100}
    ]);
	tableForOrders.refresh();

	//Доработать!!
	console.log(tableForOrders.count());
	console.log(tableForOrders.getItem(tableForOrders.getLastId()));

	// for (var i = 0; i < tableForOrders.count(); i++) {
	// 	if (tableForOrders.getItem(tableForOrders.getIdByIndex(i)).deleted) {
	// 		tableForOrders.remove(tableForOrders.getIdByIndex(i));
	// 		i--;
	// 	} else
	// 	if (!tableForOrders.getItem(tableForOrders.getIdByIndex(i)).access) {
	// 		tableForOrders.remove(tableForOrders.getIdByIndex(i));
	// 		i--;
	// 	}	
	// }
}

