function ReaderModel(listReaders) {
	this._listReaders = listReaders;
	for (var i = 0; i < this._listReaders.length; i++) {
		this._listReaders[i].id = i + 1;
	}
}

ReaderModel.prototype.getReaders = function(show, error) {
	$.ajax({
        type: "GET",
        url: "/readers",
		success: function(data, status){
			console.log(data);
			if (!data.Status) {
				error(data.ErrText);
				return;
			} else {
				if (data.Data != null) {
		    		for (var i = 0; i < data.Data.length; i++) {
		    			data.Data[i].id = data.Data[i].Id
		    		}
		    	}
	    		show(data.Data);
	    	}
		}
	});
};

ReaderModel.prototype.addReader = function(reader, showAdded, error) {

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
				if (!data.Status) {
					error(data.ErrText);
					return;
				} else {
					data.Data.id = data.Data.Id;
					showAdded(data.Data);
				}
			}
		});
	}
};

ReaderModel.prototype.deleteReader = function(id, error) {
	if (id != null) {
		$.ajax({
	        type: "DELETE",
	        url: "/readers/" + id,
			success: function(data, status){
	    		console.log(data);
				if (!data.Status) {
					error(data.ErrText);
					return;
				}
			}
		});
	}
};


ReaderModel.prototype.changeReader = function(newReader, error) {
	$.ajax({
        type: "POST",
        url: "/readers/" + newReader.Id,
		data: JSON.stringify({
			Name: newReader.Name,
			Surname: newReader.Surname,
			Year: newReader.Year
		}),
		contentType: "application/json",
		success: function(data, status) {
    		console.log(data);
			if (!data.Status) {
				error(data.ErrText);
				return;
			}
		}
	});
};


// ReaderModel.prototype.returnWantedId = function() {
// 	return this._listReaders[this._listReaders.length - 1].id + 1;
// };