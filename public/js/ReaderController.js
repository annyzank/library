function ReaderController() {
	this._readerView = new ReaderView();
	this._readerModel = new ReaderModel(readers);
	//this._readerView.setMainLabel(this._readerModel.getReaders().length);
}

ReaderController.prototype.attachReaderEvents = function() {
	var self = this;

	$$("tabbar").attachEvent("onItemClick", function(id, e) {	
		var show = function(data) {
			self._readerView.showReaders(data);
		}
		if ($$('tabbar').getValue().localeCompare("readers") == 0) {
			self._readerModel.getReaders(show);
		}
	});

	$$("add-button").attachEvent("onItemClick", function(id, e) {	
		var showFO = function(data) {
			self._readerView.showReadersForOrders(data);
		}
		if ($$('tabbar').getValue().localeCompare("readers") == 0) {
			self._readerView.showWindowReader();
		} else
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
	 		self._readerModel.getReaders(showFO);
		}
	});

	$$("delete-button").attachEvent("onItemClick", function(id, e) {
		if ($$('tabbar').getValue().localeCompare("readers") == 0) {
			self._readerModel.deleteReader(self._readerView.deleteReader());
		}
	});

	$$("addReaderConfirm").attachEvent("onItemClick", function(id, e) {
	var showA = function(data) {
		self._readerView.showAddedReader(data);
	}	
		self._readerModel.addReader(self._readerView.addReader(), showA);
	});




	$$("change-button").attachEvent("onItemClick", function(id, e) {	
		if ($$('tabbar').getValue().localeCompare("readers") == 0) {
			self._readerView.showChangeWindowReader();
		} else
		if ($$('tabbar').getValue().localeCompare("orders") == 0) {
	 		self._readerView.showReadersForOrders(self._readerModel.getReaders());
		}
	});

	$$("changeReaderConfirm").attachEvent("onItemClick", function(id, e) {	
		self._readerModel.changeReader(self._readerView.changeReaderInfo());
	});

}