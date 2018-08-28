package order

import "application/app/models/book"
import (
    "application/app/models/reader"
    "application/app/lib"
    "fmt"
)

//var orders []Order = []Order{{
//	Id:      1,
//	Book:    []book.Book{{Id: 2, Name: "asdxc", Author: "qqqq", Year: 432}, {Id: 4, Name: "gdfgte", Author: "ww", Year: 34}},
//	Reader:  reader.Reader{Id: 3, Name: "eee", Surname: "hrtfg", Year: 634},
//	LastDay: "1234"},{
//	Id:      2,
//	Book:    []book.Book{{Id: 1, Name: "dfd", Author: "ttt", Year: 543}, {Id: 3, Name: "gdfv", Author: "we", Year: 6321}},
//	Reader:  reader.Reader{Id: 2, Name: "Ann", Surname: "Red", Year: 545},
//	LastDay: "5643"}}

type OrderProvider struct {
    dbwrk *lib.DbWork
}

func New() *OrderProvider {
	return new(OrderProvider)
}

func (p *OrderProvider) Initialization() error  {
    var err error
    p.dbwrk, err = lib.Open()
    if err != nil {
        return err
    } else {
        return nil
    }
}

func (p *OrderProvider) ReadAll() ([]Order, error) {
    p.Initialization()

    rows, err := p.dbwrk.DB.Query("SELECT t_order.id, t_reader.id, t_reader.name, t_reader.surname, " +
    "t_reader.year, t_order.last_day FROM t_order, t_reader WHERE t_order.fk_reader=t_reader.id ORDER BY t_order.id")
    if err != nil {
       return nil, err
    }
    defer rows.Close()

    var ordrs []Order
    var rdr reader.Reader
    for rows.Next() {
       var ordr Order
       err := rows.Scan(&ordr.Id, &rdr.Id, &rdr.Name, &rdr.Surname, &rdr.Year, &ordr.LastDay)
       if err != nil {
           return nil, err
       }
       ordr.Reader = rdr
       ordrs = append(ordrs, ordr)
    }

    for i, o := range ordrs {
        rows, err := p.dbwrk.DB.Query("SELECT t_book.id, t_book.name, t_book.author, t_book.year FROM t_book, " +
        "toc_book_in_order WHERE toc_book_in_order.fk_order=$1 AND t_book.id=toc_book_in_order.fk_book", o.Id)
        if err != nil {
            return nil, err
        }
        var bks []book.Book
        defer rows.Close()
        for rows.Next() {
            var bk book.Book
            err := rows.Scan(&bk.Id, &bk.Name, &bk.Author, &bk.Year)
            if err != nil {
                return nil, err
            }
            bks = append(bks, bk)
        }
        if len(bks) > 0 {
            ordrs[i].Book = bks
        } else {
            _, err := p.dbwrk.DB.Exec("DELETE FROM t_order WHERE id=$1", ordrs[i].Id)
            if err != nil {
                return nil, err
            }
        }

    }
    return ordrs, nil
}

func (p *OrderProvider) ReadById(id int) (Order, error) {
    p.Initialization()
    rows, err := p.dbwrk.DB.Query("SELECT t_order.id, t_reader.id, t_reader.name, t_reader.surname, " +
        "t_reader.year, t_order.last_day FROM t_order, t_reader WHERE t_order.fk_reader=t_reader.id AND t_order.id=$1", id)
    if err != nil {
        return Order{}, err
    }
    defer rows.Close()
// исправить scan в промежуточные переменные
    var ordr Order
    var rdr reader.Reader
    for rows.Next() {
        err := rows.Scan(&ordr.Id, &rdr.Id, &rdr.Name, &rdr.Surname, &rdr.Year, &ordr.LastDay)
        if err != nil {
            return Order{}, err
        }
    }
    ordr.Reader = rdr

    rows, err = p.dbwrk.DB.Query("SELECT t_book.id, t_book.name, t_book.author, t_book.year FROM t_book, " +
        "toc_book_in_order WHERE toc_book_in_order.fk_order=$1 AND t_book.id=toc_book_in_order.fk_book", ordr.Id)
    if err != nil {
        return Order{}, err
    }
    var bks []book.Book
    defer rows.Close()
    for rows.Next() {
        var bk book.Book
        err := rows.Scan(&bk.Id, &bk.Name, &bk.Author, &bk.Year)
        if err != nil {
            return Order{}, err
        }
        bks = append(bks, bk)
    }
    if len(bks) > 0 {
        ordr.Book = bks
    } else {
        _, err := p.dbwrk.DB.Exec("DELETE FROM t_order WHERE id=$1", ordr.Id)
        if err != nil {
            return Order{}, err
        }
    }
    return ordr, nil
}

func (p *OrderProvider) Create(order Order) (int, error) {
    p.Initialization()
    var id int
    err := p.dbwrk.DB.QueryRow("INSERT INTO t_order(fk_reader, last_day) VALUES($1, " +
        "$2) RETURNING id", order.Reader.Id, order.LastDay).Scan(&id)
    order.Id = id

    if err != nil {
        return 0, err
    }
    fmt.Println(order.Book)

    for _, x := range order.Book {
        _, err := p.dbwrk.DB.Exec("INSERT INTO toc_book_in_order(fk_book, fk_order) VALUES($1, " +
            "$2)", x.Id, order.Id)
        if err != nil {
            return 0, err
        }
    }
    return id, nil
}

func (p *OrderProvider) Update(id int, order Order) error {
    p.Initialization()
    _, err := p.dbwrk.DB.Exec("UPDATE t_order SET fk_reader=$1, " +
        "last_day=$2 WHERE id=$3", order.Reader.Id, order.LastDay, id)
    if err != nil {
        return err
    }
    fmt.Println(order.Reader.Id)
    fmt.Println(order.LastDay)

    _, err = p.dbwrk.DB.Exec("DELETE FROM toc_book_in_order WHERE fk_order=$1", order.Id)
    if err != nil {
        return err
    }

    for _, x := range order.Book {
        fmt.Println(x.Id)
        fmt.Println(order.Id)
        _, err = p.dbwrk.DB.Exec("INSERT INTO toc_book_in_order(fk_book, fk_order) VALUES($1, " +
            "$2)", x.Id, order.Id)
        if err != nil {
            return err
        }
    }
    return nil
}

func (p *OrderProvider) DeleteById(id int) error {
    p.Initialization()

    _, err := p.dbwrk.DB.Exec("DELETE FROM toc_book_in_order WHERE fk_order=$1", id)
    if err != nil {
        return err
    }

    _, err = p.dbwrk.DB.Exec("DELETE FROM t_order WHERE id=$1", id)
    if err != nil {
        return err
    } else {
        return nil
    }
}
