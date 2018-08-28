function BookView() {
	this._flag = false;
}

BookView.prototype.setMainLabel = function(count) {
	$$("labelBooks").setValue("Всего книг в библиотеке: " + count)
}

BookView.prototype.error = function(errText) {	
	webix.message({
	    text: errText,
	    type:"error"
	});
}

BookView.prototype.showBooks = function(bookList) {	

	var bkTable = $$("books");
	if(!this._flag) {
		bkTable.define("columns",[
	        { id:"Id", header:"", width:50},
	        { id:"Name",  header:"Наименование", fillspace:true},
	        { id:"Author",  header:"Автор(ы)", fillspace:true},
	        { id:"Year", header:"Год выпуска", width:100}
	    ]);
		this._flag = true;
	}
	console.log(bookList);
	bkTable.define("data", bookList);
	bkTable.refresh();
	console.log(324);
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
		$$("bookName").setValue(selChB.Name);
		$$("author").setValue(selChB.Author);
		$$("bookYear").setValue(selChB.Year);
	} else {
    	webix.alert({
    		type: "alert-error",
    		text: "Выберите книгу!",
    	});
	}

}

BookView.prototype.changeBookInfo = function() {
	var newBN = $$("bookName").getValue();
	var newAN = $$("author").getValue();
	var newY = $$("bookYear").getValue();
	newY = Number(newY);

	var chBk = $$("books").getSelectedItem();
	var newBookObj = new Bok(newBN, newAN, newY);
	newBookObj.Id = chBk.Id;
	newBookObj.id = chBk.Id;
	$$("books").updateItem(chBk.Id, newBookObj);

	newBookWin.hide();

	return newBookObj;
}

BookView.prototype.showBooksForOrders = function(bookList) {
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

	for (var i = 0; i < tableForOrders.count(); i++) {
		if (!tableForOrders.getItem(tableForOrders.getIdByIndex(i)).Access) {
			tableForOrders.remove(tableForOrders.getIdByIndex(i));
			i--;
		} 
	}
}

