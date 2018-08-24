function ReaderModel(listReaders) {
	this._listReaders = listReaders;
	for (var i = 0; i < this._listReaders.length; i++) {
		this._listReaders[i].id = i + 1;
	}
}

ReaderModel.prototype.getReaders = function(a) {
	$.ajax({
        type: "GET",
        url: "/readers",
		success: function(data, status){
    		for (var i = 0; i < data.length; i++) {
    			data[i].id = data[i].Id
    		}
    		a(data);
		}
	});
};

ReaderModel.prototype.addReader = function(reader, a) {

	if (reader != null) {
		$.ajax({
		    type: "PUT",
		    url: "/readers",
			data: JSON.stringify({
				Name: reader.Name,
				Surname: reader.Surname,
				Year: reader.Year
			}),
			contentType: "application/json",
			success: function(data, status){
				console.log(data);
				a(data.Data);
			}
		});
	}

	// if (reader != null) {
	// 	this._listReaders.push(reader);
	// }
};

ReaderModel.prototype.deleteReader = function(id) {
	if (id != null) {
		$.ajax({
	        type: "DELETE",
	        url: "/readers/" + id,
			success: function(data, status){
	    		console.log(data);
			}
		});
	}
	// if (id != null) {
	// 	var delIndex;
	// 	for (var i = 0; i < this._listReaders.length; i++) {
	// 		if (this._listReaders[i].id == id) {
	// 			delIndex = i;
	// 		}
	// 	}
	// 	this._listReaders[delIndex].deleted = true;
	// 	this._listReaders.splice(delIndex, 1);
	// }
};

ReaderModel.prototype.returnWantedId = function() {
	return this._listReaders[this._listReaders.length - 1].id + 1;
};

ReaderModel.prototype.changeReader = function(newReader) {
	for (var i = 0; i < this._listReaders.length; i++) {
		if (this._listReaders[i].id == newReader.id) {
			var index = i;
		}
	}
	this._listReaders[index] = newReader;
};

