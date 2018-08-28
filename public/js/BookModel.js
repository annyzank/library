function BookModel(listBooks) {
	this._listBooks = listBooks;
	for (var i = 0; i < this._listBooks.length; i++) {
		this._listBooks[i].id = i + 1;
	}
}

BookModel.prototype.getBooks = function(show, error) {	
	$.ajax({
        type: "GET",
        url: "/books",
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

BookModel.prototype.addBook = function(book, showAdded, error) {
	if (book != null) {
		$.ajax({
		    type: "PUT",
		    url: "/books",
			data: JSON.stringify({
				Name: book.Name,
				Author: book.Author,
				Year: book.Year
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


BookModel.prototype.deleteBook = function(id, error) {
	if (id != null) {
		$.ajax({
	        type: "DELETE",
	        url: "/books/" + id,
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


BookModel.prototype.changeBook = function(newBook) {
	$.ajax({
        type: "POST",
        url: "/books/" + newBook.Id,
		data: JSON.stringify({
			Name: newBook.Name,
			Author: newBook.Author,
			Year: newBook.Year
		}),
		contentType: "application/json",
		success: function(data, status){
    		console.log(data);
	    	if (!data.Status) {
				error(data.ErrText);
				return;
			}
		}
	});
};

// BookModel.prototype.returnWantedId = function() {
// 	return this._listBooks[this._listBooks.length - 1].id + 1;
// };