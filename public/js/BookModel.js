function BookModel(listBooks) {
	this._listBooks = listBooks;
	for (var i = 0; i < this._listBooks.length; i++) {
		this._listBooks[i].id = i + 1;
	}
}

BookModel.prototype.getBooks = function(a) {	
	$.ajax({
        type: "GET",
        url: "/books",
		success: function(data, status){
    		for (var i = 0; i < data.length; i++) {
    			data[i].id = data[i].Id
    		}
    		a(data);
		}
	});
};

BookModel.prototype.addBook = function(book, a) {
	console.log(book);
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
				a(data.Data);
			}
		});
	}
	// if (book != null) {
	// 	this._listBooks.push(book);
	// }
};


BookModel.prototype.deleteBook = function(id) {
	if (id != null) {
		$.ajax({
	        type: "DELETE",
	        url: "/books/" + id,
			success: function(data, status){
	    		console.log(data);
			}
		});
	}

	// if (id != null) {
	// 	var delIndex;
	// 	for (var i = 0; i < this._listBooks.length; i++) {
	// 		if (this._listBooks[i].id == id) {
	// 			delIndex = i;
	// 		}
	// 	}
	// 	this._listBooks[delIndex].deleted = true; 
	// 	this._listBooks.splice(delIndex, 1);
	// }

};

BookModel.prototype.returnWantedId = function() {
	return this._listBooks[this._listBooks.length - 1].id + 1;
};

BookModel.prototype.changeBook = function(newBook) {
	for (var i = 0; i < this._listBooks.length; i++) {
		if (this._listBooks[i].id == newBook.id) {
			var index = i;
		}
	}
	this._listBooks[index] = newBook;
};
