package repository

import "github.com/dai65527/pong-prototypes/openapi-todo/server-golang/domain/model"

type ItemRepository interface {
	FindAll() ([]*model.Item, error)
}
