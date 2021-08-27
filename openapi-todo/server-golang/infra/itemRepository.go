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

func (repo *itemRepository) FindAll() ([]*model.Item, error) {
	var items []*model.Item
	err := repo.db.Find(&items).Error
	if err != nil {
		return nil, fmt.Errorf("gorm.db.Find: %w", err)
	}
	return items, nil
}

func (repo *itemRepository) FindById(id int64) (*model.Item, error) {
	var item model.Item
	err := repo.db.First(&item, id).Error
	if err != nil {
		return nil, fmt.Errorf("gorm.db.First: %w", err)
	}
	return &item, nil
}

func (repo *itemRepository) Save(item *model.Item) (*model.Item, error) {
	err := repo.db.Save(item).Error
	if err != nil {
		return nil, fmt.Errorf("gorm.db.Save: %w", err)
	}
	return item, nil
}

func (repo *itemRepository) DeleteDone() error {
	err := repo.db.Where("done = ?", true).Delete(model.Item{}).Error
	if err != nil {
		return fmt.Errorf("gorm.db.Delete: %w", err)
	}
	return nil
}
