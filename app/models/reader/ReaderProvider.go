package reader

import (
	"application/app/lib"
)

//var readers []Reader = []Reader{{Id: 1, Name: "qwerty", Surname: "asd", Year: 1234},
//	{Id: 2, Name: "asdxc", Surname: "qqqq", Year: 432},
//	{Id: 3, Name: "eee", Surname: "hrtfg", Year: 634},
//	{Id: 4, Name: "aaa", Surname: "qqqq", Year: 456},
//	{Id: 5, Name: "zzz", Surname: "gfdf", Year: 785},
//	{Id: 6, Name: "qazxsw", Surname: "Werty", Year: 9008}}

type ReaderProvider struct {
	dbwrk *lib.DbWork
}

func New() *ReaderProvider {
	return new(ReaderProvider)
}

func (p *ReaderProvider) Initialization() error {
	var err error
	p.dbwrk, err = lib.Open()
	if err != nil {
		return err
	} else {
		return nil
	}
}

func (p *ReaderProvider) ReadAll() ([]Reader, error) {
	p.Initialization()
	rows, err := p.dbwrk.DB.Query("SELECT id, name, surname, year FROM t_reader ORDER BY id")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var rdrs []Reader
	for rows.Next() {
		var rdr Reader
		err := rows.Scan(&rdr.Id, &rdr.Name, &rdr.Surname, &rdr.Year)
		if err != nil {
			return nil, err
		}
		rdrs = append(rdrs, rdr)
	}
	return rdrs, nil
}

func (p *ReaderProvider) ReadById(id int) (Reader, error) {
	p.Initialization()
	var ID int
	var name string
	var surname string
	var year int
	rows, err := p.dbwrk.DB.Query("SELECT id, name, surname, year FROM t_reader WHERE id=$1", id)
	//наверное надо использовать QueryRow
	if err != nil {
		return Reader{}, err
	}
	defer rows.Close()
	for rows.Next() {
		err := rows.Scan(&ID, &name, &surname, &year)
		if err != nil {
			return Reader{}, err
		}
	}
	return Reader{ID, name, surname, year}, nil
}

func (p *ReaderProvider) Create(reader Reader) (Reader, error) {
	p.Initialization()

    var id int
	err := p.dbwrk.DB.QueryRow("INSERT INTO t_reader(name, surname, year) VALUES($1, " +
		"$2, $3) RETURNING id", reader.Name, reader.Surname, reader.Year).Scan(&id)

    if err != nil {
        return Reader{}, err
    }
	r, err := p.ReadById(id)
	if err != nil {
		return Reader{}, err
	} else {
        return r, nil
    }
}

func (p *ReaderProvider) Update(id int, reader Reader) error {
	p.Initialization()
	_, err := p.dbwrk.DB.Exec("UPDATE t_reader SET name = $1, surname = $2, " +
		"year=$3 WHERE id=$4", reader.Name, reader.Surname, reader.Year, id)
	if err != nil {
		return err
	} else {
		return nil
	}
}

func (p *ReaderProvider) DeleteById(id int) error {
	p.Initialization()
	rows, err := p.dbwrk.DB.Query("SELECT id FROM t_order WHERE fk_reader=$1", id)
	if err != nil {
		return err
	}
	defer rows.Close()

	var ids []int
	for rows.Next() {
		var i int
		err := rows.Scan(&i)
		if err != nil {
			return err
		}
		ids = append(ids, i)
	}

	for _, x := range ids {
		_, err := p.dbwrk.DB.Exec("DELETE FROM toc_book_in_order WHERE fk_order=$1", x)
		if err != nil {
			return err
		}
	}
	_, err = p.dbwrk.DB.Exec("DELETE FROM t_order WHERE fk_reader=$1", id)
	if err != nil {
		return err
	}

	_, err = p.dbwrk.DB.Exec("DELETE FROM t_reader WHERE id=$1", id)
	if err != nil {
		return err
	} else {
		return nil
	}
}