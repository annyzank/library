package controllers

import "github.com/revel/revel"
import "application/app/models/reader"
import "io/ioutil"
import "encoding/json"
import "application/app/response"

type CReader struct {
	*revel.Controller
	provider *reader.ReaderProvider
}

func (c *CReader) GetAll() revel.Result {
	c.provider = reader.New()
	rdrs, err := c.provider.ReadAll()
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(rdrs))
}

func (c *CReader) GetByID(readerID int) revel.Result {
	c.provider = reader.New()
	rdr, err := c.provider.ReadById(readerID)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(rdr))
}

func (c *CReader) Put() revel.Result {
	c.provider = reader.New()
	bodyBytes, _ := ioutil.ReadAll(c.Request.Body)
	var r reader.Reader
	err := json.Unmarshal(bodyBytes, &r)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	crReader, err := c.provider.Create(r)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(crReader))
}

func (c *CReader) Post(readerID int) revel.Result {
	c.provider = reader.New()
	bodyBytes, _ := ioutil.ReadAll(c.Request.Body)
	var r reader.Reader
	err := json.Unmarshal(bodyBytes, &r)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	err = c.provider.Update(readerID, r)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(r))
}

func (c *CReader) DeleteByID(readerID int) revel.Result {
	c.provider = reader.New()
	err := c.provider.DeleteById(readerID)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(nil))
}
