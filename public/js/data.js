var readers = [
	new Reader("Анна", "Демидова", 1996), 
	new Reader("Илон", "Маск", 1111), 
	new Reader("Гарри", "Поттер", 1234)
];

var books = [
	new Book("Сияние", "Стивен Кинг", 9999), 
	new Book("Мартин Иден", "Джек Лондон", 8888),
	new Book("Приключения Тома Сойера", "Марк Твен", 1265),
	new Book("Праздник", "Говард Лавкрафт", 2463),
	new Book("Зов Ктулху", "Говард Лавкрафт", 1876),
	new Book("Обломов", "Иван Гончаров", 1000),
	new Book("Отцы и дети", "Тургенев", 1204),
	new Book("Хорошая книга", "Никто", 5000)
];

var orders = [
	new Order(readers[1], books[3], "14.09.2018"),
	new Order(readers[1], books[1], "11.08.2018"),
	new Order(readers[0], books[2], "05.12.2018")
]

function Book(bookName, author, bookYear) {
	this.id = 0;
	this.bookName = bookName;
	this.author = author;
	this.bookYear = bookYear;
	this.access = true;
	this.deleted = false;
}

function Bok(bookName, author, bookYear) {
	this.Id = 0;
	this.Name = bookName;
	this.Author = author;
	this.Year = bookYear;
	this.Access = true;
}

function Reader(readerName, readerSurname, year) {
	this.id = 0;
	this.readerName = readerName;
	this.readerSurname = readerSurname;
	this.year = year;
	this.deleted = false;
}

function Readr(readerName, readerSurname, year) {
	this.Id = 0;
	this.Name = readerName;
	this.Surname = readerSurname;
	this.Year = year;
}

function Order(orderReader, orderBook, lastDay) {
	this.Id = 0;
	this.Reader = orderReader;
	this.Book = orderBook;
	this.LastDay = lastDay;
	this.deleted = false;
	//orderBook.access = false;
}

function OrderForUI(name, readerName, readerSurname, data, lastDay) {
	this.Id = 0;
	this.Name = name;
	this.ReaderName = readerName;
	this.ReaderSurname = readerSurname;
	this.LastDay = lastDay;
	this.data = data;
	this.deleted = false;
}

function BookForUI(bookName, author, bookYear) {
	this.id = 0;
	this.Name = bookName;
	this.Author = author;
	this.Year = bookYear;
	this.Access = true;
}