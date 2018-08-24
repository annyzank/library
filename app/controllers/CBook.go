package controllers

import "github.com/revel/revel"
import "application/app/models/book"
import "io/ioutil"
import "encoding/json"
import (
    "application/app/response"
)

type CBook struct {
	*revel.Controller
	provider *book.BookProvider
}

func (c *CBook) GetAll() revel.Result {
	c.provider = book.New()
	bks, err := c.provider.ReadAll()
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(bks)
}

func (c *CBook) GetByID(bookID int) revel.Result {
	c.provider = book.New()
	bk, err := c.provider.ReadById(bookID)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(bk)
}

func (c *CBook) Put() revel.Result {
	c.provider = book.New()
	bodyBytes, _ := ioutil.ReadAll(c.Request.Body)
	var b book.Book
	err := json.Unmarshal(bodyBytes, &b)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	id, err := c.provider.Create(b)
	b.Id = id
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(b))
}

func (c *CBook) Post(bookID int) revel.Result {
	c.provider = book.New()
	bodyBytes, _ := ioutil.ReadAll(c.Request.Body)
	var b book.Book
	err := json.Unmarshal(bodyBytes, &b)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	err = c.provider.Update(bookID, b)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(b))
}

func (c *CBook) DeleteByID(bookID int) revel.Result {
	c.provider = book.New()
	err := c.provider.DeleteById(bookID)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(nil))
}
