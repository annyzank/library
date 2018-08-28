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
		var error = function(text) {
			self._bookView.error(text);
		}
		if ($$('tabbar').getValue().localeCompare("books") == 0) {
			self._bookModel.getBooks(show, error)
		}
	});

	$$("add-button").attachEvent("onItemClick", function(id, e) {	
		var showFO = function(data) {
			self._bookView.showBooksForOrders(data);
		}
		var error = function(text) {
			self._bookView.error(text);
		}
		if ($$('tabbar').getValue().localeCompare("books") == 0) {
			self._bookView.showWindowBook();
		} else 
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._bookModel.getBooks(showFO, error);
		}
	});

	$$("delete-button").attachEvent("onItemClick", function(id, e) {
		var error = function(text) {
			self._bookView.error(text);
		}
		if ($$('tabbar').getValue().localeCompare("books") == 0) {
			self._bookModel.deleteBook(self._bookView.deleteBook(), error);
		}
	});

	$$("addBookConfirm").attachEvent("onItemClick", function(id, e) {	
		var show = function(data) {
			self._bookView.showAddedBook(data);
		}
		var error = function(text) {
			self._bookView.error(text);
		}
		self._bookModel.addBook(self._bookView.addBook(), show, error);
	});

	$$("change-button").attachEvent("onItemClick", function(id, e) {	
		var showFO = function(data) {
			self._bookView.showBooksForOrders(data);
		}
		var error = function(text) {
			self._bookView.error(text);
		}
		if ($$('tabbar').getValue().localeCompare("books") == 0) {
			self._bookView.showChangeWindowBook();
		}
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
			self._bookModel.getBooks(showFO, error);
		}
	});

	$$("changeBookConfirm").attachEvent("onItemClick", function(id, e) {	
		var error = function(text) {
			self._bookView.error(text);
		}
		self._bookModel.changeBook(self._bookView.changeBookInfo(), error);
	});
}