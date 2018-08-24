package lib

import (
    _ "github.com/lib/pq"
    "database/sql"
    "fmt"
    "sync"
)

type DbWork struct {
    DB *sql.DB
}

var instance *DbWork
var once sync.Once
var err error

func Open() (*DbWork, error)  {
    once.Do(func() {
        fmt.Println("i'm here")
        var db *sql.DB
        connStr := "host=localhost port=5432 user=postgres dbname=lib password=123 sslmode=disable"
        db, err = sql.Open("postgres", connStr)
        if err != nil {
            fmt.Println(err)
        }
        instance = &DbWork{db}
    })
    return instance, err
}

func Close(db *sql.DB)  {
    db.Close()
}