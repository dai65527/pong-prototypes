package handler

import (
	"errors"
	"log"
	"os"

	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/domain/model"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/openapi/models"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/openapi/restapi/operations"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/usecase"
	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/swag"
)

type TodoHandler interface {
	GetItem(operations.GetItemParams) middleware.Responder
	PostItem(operations.PostItemParams) middleware.Responder
	PutItem(operations.PutItemParams) middleware.Responder
	DeleteItem(operations.DeleteItemParams) middleware.Responder
}

type todoHandler struct {
	l      *log.Logger
	itemUC usecase.ItemUsecase
}

func NewTodoHandler(itemUC usecase.ItemUsecase, l *log.Logger) TodoHandler {
	if l == nil {
		l = log.New(os.Stderr, "todoHandler: ", log.LstdFlags)
	}
	return &todoHandler{
		l:      l,
		itemUC: itemUC,
	}
}

func (h *todoHandler) GetItem(params operations.GetItemParams) middleware.Responder {
	items, err := h.itemUC.FindAll()
	if err != nil {
		h.l.Printf("todoHandler.GetItem: itemUC.FindAll: %v", err)
		return operations.NewGetItemInternalServerError().WithPayload(&models.Error{Message: swag.String("internal server error")})
	}

	payload := itemsToPayload(items)
	return operations.NewGetItemOK().WithPayload(payload)
}

func (h *todoHandler) PostItem(params operations.PostItemParams) middleware.Responder {
	item := newItemFromPostItemBody(&params.Body)
	item, err := h.itemUC.SaveNewItem(item)
	if err != nil {
		h.l.Printf("todoHandler.PostItem: itemUC.SaveNewItem: %v", err)
		return operations.NewPostItemInternalServerError().WithPayload(&models.Error{Message: swag.String("internal server error")})
	}
	return operations.NewPostItemCreated().WithPayload(itemToPayload(item))
}

func (h *todoHandler) PutItem(params operations.PutItemParams) middleware.Responder {
	item := newItemFromPutItemBody(&params.Body)
	item, err := h.itemUC.UpdateItem(item)
	if errors.Is(err, usecase.ErrNotFound) {
		h.l.Printf("no item found")
		return operations.NewPutItemNotFound().WithPayload(&models.Error{Message: swag.String("no item found")})
	} else if err != nil {
		h.l.Printf("todoHandler.PutItem: itemUC.UpdateItem: %v", err)
		return operations.NewPutItemInternalServerError().WithPayload(&models.Error{Message: swag.String("internal server error")})
	}

	return operations.NewPutItemOK().WithPayload(itemToPayload(item))
}

func (h *todoHandler) DeleteItem(params operations.DeleteItemParams) middleware.Responder {
	err := h.itemUC.DeleteDoneItem()
	if err != nil {
		h.l.Printf("todoHandler.DeleteItem: itemUC.DeleteDoneItem: %v", err)
		return operations.NewDeleteItemInternalServerError().WithPayload(&models.Error{Message: swag.String("internal server error")})
	}
	return operations.NewDeleteItemOK()
}

// itemsToPayload converts *model.Item to *models.Item
func itemToPayload(item *model.Item) *models.Item {
	var createdAt *int64
	if item.CreatedAt != nil {
		createdAt = swag.Int64(item.CreatedAt.Unix())
	}

	var updatedAt *int64
	if item.CreatedAt != nil {
		updatedAt = swag.Int64(item.UpdatedAt.Unix())
	}

	return &models.Item{
		ID:        swag.Int64(item.Id),
		Name:      swag.String(item.Name),
		Comment:   swag.String(item.Comment),
		Done:      swag.Bool(item.Done),
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
	}
}

// itemsToPayload converts []*model.Item to []*models.Item
func itemsToPayload(items []*model.Item) []*models.Item {
	payload := make([]*models.Item, 0, len(items))
	for i := range items {
		payload = append(payload, itemToPayload(items[i]))
	}
	return payload
}

// newItem converts *postItemBody to *model.Item
func newItemFromPostItemBody(body *operations.PostItemBody) *model.Item {
	return &model.Item{
		Name:    swag.StringValue(body.Name),
		Comment: swag.StringValue(body.Comment),
	}
}

// newItemFromPostItemBody
func newItemFromPutItemBody(body *operations.PutItemBody) *model.Item {
	return &model.Item{
		Id:      swag.Int64Value(body.ID),
		Name:    swag.StringValue(body.Name),
		Comment: swag.StringValue(body.Comment),
		Done:    swag.BoolValue(body.Done),
	}
}
