package controllers

import "github.com/revel/revel"
import "application/app/models/order"
import "io/ioutil"
import "encoding/json"
import "application/app/response"

type COrder struct {
	*revel.Controller
	provider *order.OrderProvider
}

func (c *COrder) GetAll() revel.Result {
	c.provider = order.New()
	ordrs, err := c.provider.ReadAll()
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(ordrs))
}

func (c *COrder) GetByID(orderID int) revel.Result {
	c.provider = order.New()
	ordr, err := c.provider.ReadById(orderID)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(ordr))
}

func (c *COrder) Put() revel.Result {
	c.provider = order.New()
	bodyBytes, _ := ioutil.ReadAll(c.Request.Body)
	var o order.Order
	err := json.Unmarshal(bodyBytes, &o)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	id, err := c.provider.Create(o)
	o.Id = id
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(o))
}

func (c *COrder) Post(orderID int) revel.Result {
	c.provider = order.New()
	bodyBytes, _ := ioutil.ReadAll(c.Request.Body)
	var o order.Order
	err := json.Unmarshal(bodyBytes, &o)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	o.Id = orderID
	err = c.provider.Update(orderID, o)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(o))
}

func (c *COrder) DeleteByID(orderID int) revel.Result {
	c.provider = order.New()
	err := c.provider.DeleteById(orderID)
	if err != nil {
		return c.RenderJson(response.Fail(err.Error()))
	}
	return c.RenderJson(response.Success(nil))
}
