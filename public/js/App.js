function App() {
	webix.ui(startUI);
	this._bookController = new BookController();
	this._readerController = new ReaderController();
	this._orderController = new OrderController();
}

App.prototype.run = function() {
	this._bookController.attachBookEvents();
	this._readerController.attachReaderEvents();
	this._orderController.attachOrderEvents();
	var b = 6;
}
