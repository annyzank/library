function BookController() {
	this._bookView = new BookView();
	this._bookModel = new BookModel(books);
	//this._bookView.setMainLabel(this._bookModel.getBooks().length);
}

BookController.prototype.attachBookEvents = function() {
	var self = this;

	$$("tabbar").attachEvent("onItemClick", function(id, e) {	
		var show = function(data) {
			self._bookView.showBooks(data);
		}
		if ($$('tabbar').getValue().localeCompare("books") == 0) {
			self._bookModel.getBooks(show)
		}
	});

	$$("add-button").attachEvent("onItemClick", function(id, e) {	
		var showFO = function(data) {
			self._bookView.showBooksForOrders(data);
		}
		if ($$('tabbar').getValue().localeCompare("books") == 0) {
			self._bookView.showWindowBook();
		} else 
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._bookModel.getBooks(showFO);
		}
	});

	$$("delete-button").attachEvent("onItemClick", function(id, e) {
		if ($$('tabbar').getValue().localeCompare("books") == 0) {
			self._bookModel.deleteBook(self._bookView.deleteBook());
		}
	});

	$$("addBookConfirm").attachEvent("onItemClick", function(id, e) {	
		var show = function(data) {
			self._bookView.showAddedBook(data);
		}
		self._bookModel.addBook(self._bookView.addBook(), show);
	});



	

	$$("change-button").attachEvent("onItemClick", function(id, e) {	
		if ($$('tabbar').getValue().localeCompare("books") == 0) {
			self._bookView.showChangeWindowBook();
		}
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._bookView.showBooksForOrders(self._bookModel.getBooks());
		}
	});

	$$("changeBookConfirm").attachEvent("onItemClick", function(id, e) {	
		self._bookModel.changeBook(self._bookView.changeBookInfo());
	});
}