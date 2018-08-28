package book

import (
    "application/app/lib"
)

//var books []Book = []Book{{Id: 1, Name: "qwerty", Author: "asd", Year: 1234},
//	{Id: 2, Name: "asdxc", Author: "qqqq", Year: 432},
//	{Id: 3, Name: "eee", Author: "hrtfg", Year: 634},
//	{Id: 4, Name: "aaa", Author: "qqqq", Year: 456},
//	{Id: 5, Name: "zzz", Author: "gfdf", Year: 785}}

type BookProvider struct {
    dbwrk *lib.DbWork
}

func New() *BookProvider {
	return new(BookProvider)
}

func (p *BookProvider) Initialization() error  {
    var err error
    p.dbwrk, err = lib.Open()
    if err != nil {
        return err
    } else {
        return nil
    }
}

func (p *BookProvider) ReadAll() ([]Book, error) {
    p.Initialization()
    rows, err := p.dbwrk.DB.Query("SELECT id, name, author, year, access FROM t_book ORDER BY id")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var bks []Book
    for rows.Next() {
        var bk Book
        err := rows.Scan(&bk.Id, &bk.Name, &bk.Author, &bk.Year, &bk.Access)
        if err != nil {
            return nil, err
        }
        bks = append(bks, bk)
    }
    //p.dbwrk.DB.Close()
	return bks, nil
}

func (p *BookProvider) ReadById(id int) (Book, error) {
    p.Initialization()
    var ID int
    var name string
    var author string
    var year int
    var access bool
    rows, err := p.dbwrk.DB.Query("SELECT id, name, author, year, access FROM t_book WHERE id=$1", id)
    //наверное надо использовать QueryRow
    if err != nil {
        return Book{}, err
    }
    defer rows.Close()
    for rows.Next() {
        err := rows.Scan(&ID, &name, &author, &year, &access)
        if err != nil {
            return Book{}, err
        }
    }
    return Book{ID, name, author, year, access}, nil
}

func (p *BookProvider) Create(book Book) (Book, error) {
    p.Initialization()
    var id int
    err := p.dbwrk.DB.QueryRow("INSERT INTO t_book(name, author, year, access) VALUES($1, " +
        "$2, $3, $4) RETURNING id", book.Name, book.Author, book.Year, true).Scan(&id)
    if err != nil {
        return Book{}, err
    }
    b, err := p.ReadById(id)
    if err != nil {
        return Book{}, err
    } else {
        return b, nil
    }
}

func (p *BookProvider) Update(id int, book Book) error {
    p.Initialization()
    _, err := p.dbwrk.DB.Exec("UPDATE t_book SET name = $1, author = $2, " +
        "year=$3 WHERE id=$4", book.Name, book.Author, book.Year, id)
    if err != nil {
        return err
    } else {
        return nil
    }
}

func (p *BookProvider) DeleteById(id int) error {
    p.Initialization()
    _, err := p.dbwrk.DB.Exec("DELETE FROM toc_book_in_order WHERE fk_book=$1", id)
    if err != nil {
        return err
    }

    _, err = p.dbwrk.DB.Exec("DELETE FROM t_book WHERE id=$1", id)
    if err != nil {
        return err
    } else {
        return nil
    }
}
