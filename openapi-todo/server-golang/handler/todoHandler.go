package handler

import (
	"log"
	"os"

	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/domain/model"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/openapi/models"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/openapi/restapi/operations"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/usecase"
	"github.com/go-openapi/runtime/middleware"
)

type TodoHandler interface {
	GetItem(params operations.GetItemParams) middleware.Responder
}

type todoHandler struct {
	l      *log.Logger
	itemUC usecase.ItemUsecase
}

func NewTodoHandler(itemUC usecase.ItemUsecase, l *log.Logger) TodoHandler {
	if l == nil {
		l = log.New(os.Stderr, "todoHandler", log.LstdFlags)
	}
	return &todoHandler{
		l:      l,
		itemUC: itemUC,
	}
}

func (h *todoHandler) GetItem(params operations.GetItemParams) middleware.Responder {
	items, err := h.itemUC.FindAll()
	if err != nil {
		h.l.Printf("todoHandler.GetItem.itemUc.FindAll: %#v", err)
		return operations.NewGetItemInternalServerError().WithPayload(&models.Error{Message: "internal server error"})
	}

	payload := itemsToPayload(items)
	return operations.NewGetItemOK().WithPayload(payload)
}

// itemsToPayload converts *model.Item to *models.Item
func itemToPayload(item *model.Item) *models.Item {
	return &models.Item{
		ID:        item.Id,
		Name:      item.Name,
		Comment:   item.Comment,
		CreatedAt: item.CreatedAt.Unix(),
		UpdatedAt: item.CreatedAt.Unix(),
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
