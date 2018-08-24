function ReaderView() {
	this._flag = false;
}

ReaderView.prototype.setMainLabel = function(count) {
	$$("labelReaders").setValue("Всего читателей библиотеки: " + count)
}

ReaderView.prototype.showReaders = function(readerList) {	
	if(!this._flag) {
		var rdrTable = $$("readers");
		rdrTable.define("data", readerList);
		rdrTable.define("columns",[
	        { id:"Id",    header:"", width:50},
	        { id:"Name",   header:"Имя", fillspace:true},
	        { id:"Surname",    header:"Фамилия", fillspace:true},
	        { id:"Year",   header:"Год рождения", width:100}
	    ]);
		//rdrTable.define("template", "#id#. Имя: #readerName#, фамилия: #readerSurname#, год рождения: #year#.");

		this._flag = true;
	}
	rdrTable.refresh();
}

ReaderView.prototype.showWindowReader = function() {
    newReaderWin.show();
	$$("changeReaderConfirm").hide();
	$$("addReaderConfirm").show();

	$$("readerName").setValue("");
	$$("readerSurname").setValue("");
	$$("year").setValue("");
}

ReaderView.prototype.addReader = function() {
    
    var form = $$("readerForm");
    if (form.validate()){
    	//webix.alert("Читатель добавлен");
    	var rn = $$("readerName").getValue();
		var rs = $$("readerSurname").getValue();
		var ry = $$("year").getValue();
		ry = Number(ry);

		$$("readerName").setValue("");
		$$("readerSurname").setValue("");
		$$("year").setValue("");

		newReaderWin.hide();

		var obj = new Readr(rn, rs, ry);
		return obj;
    } else {
    	return null;
    }
}

ReaderView.prototype.showAddedReader = function(data) {
	$$("readers").add(data);
}

ReaderView.prototype.deleteReader = function() {

	var selDelR = $$("readers").getSelectedItem();
	if (selDelR != undefined) {
		$$("readers").remove($$("readers").getSelectedId());
		return selDelR.id;
	} else {
    	webix.alert({
    		type: "alert-error",
    		text: "Выберите читателя!",
    	});
    	return null;
	}
}

ReaderView.prototype.showChangeWindowReader = function() {
	var selChR = $$("readers").getSelectedItem();
	if (selChR != undefined) {
		newReaderWin.show();
		$$("changeReaderConfirm").show();
		$$("addReaderConfirm").hide();

		
		$$("readerName").setValue(selChR.readerName);
		$$("readerSurname").setValue(selChR.readerSurname);
		$$("year").setValue(selChR.year);
	} else {
	    webix.alert({
			type: "alert-error",
			text: "Выберите читателя!",
		});
	}
}

ReaderView.prototype.changeReaderInfo = function() {
	var newRN = $$("readerName").getValue();
	var newRS = $$("readerSurname").getValue();
	var newY = $$("year").getValue();

	var chRdr = $$("readers").getSelectedItem();
	var newReaderObj = new Reader(newRN, newRS, newY);
	newReaderObj.id = chRdr.id;
	$$("readers").updateItem(chRdr.id, newReaderObj);

	newReaderWin.hide();

	return newReaderObj;
}

ReaderView.prototype.showReadersForOrders = function(readerList) {
	var tableForOrders = $$("readersForOrder");
	tableForOrders.clearAll();
	tableForOrders.define("data", readerList);
	tableForOrders.define("columns",[
        { id:"Id",    header:"", width:50},
        { id:"Name",   header:"Имя", fillspace:true},
        { id:"Surname",    header:"Фамилия", fillspace:true},
        { id:"Year",   header:"Год рождения", width:100}
    ]);
	tableForOrders.refresh();

	// for (var i = 0; i < tableForOrders.count(); i++) {
	// 	if (tableForOrders.getItem(tableForOrders.getIdByIndex(i)).deleted) {
	// 		tableForOrders.remove(tableForOrders.getIdByIndex(i));
	// 		i--;
	// 	}	
	// }

}