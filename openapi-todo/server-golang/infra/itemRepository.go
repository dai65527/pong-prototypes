package infra

import (
	"fmt"

	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/domain/model"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/domain/repository"
	"gorm.io/gorm"
)

type itemRepository struct {
	db *gorm.DB
}

func NewItemRepository(db *gorm.DB) repository.ItemRepository {
	return &itemRepository{
		db: db,
	}
}

func (repo itemRepository) FindAll() ([]*model.Item, error) {
	var items []*model.Item
	err := repo.db.Find(&items).Error
	if err != nil {
		return nil, fmt.Errorf("gorm.db.Find: %#v", err)
	}
	return items, nil
}
