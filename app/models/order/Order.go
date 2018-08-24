package order

import "application/app/models/book"
import "application/app/models/reader"

type Order struct {
	Id      int
	Book    []book.Book
	Reader  reader.Reader
	LastDay string
}
