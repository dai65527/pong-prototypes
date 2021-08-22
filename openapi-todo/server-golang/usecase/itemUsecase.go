package usecase

import (
	"errors"
	"fmt"

	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/domain/model"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/domain/repository"
	"github.com/go-openapi/swag"
)

var (
	ErrNotFound = errors.New("item not found")
)

type ItemUsecase interface {
	FindAll() ([]*model.Item, error)
	SaveNewItem(*model.Item) (*model.Item, error)
	UpdateItem(*model.Item) (*model.Item, error)
}

type itemUsecase struct {
	repo repository.ItemRepository
}

func NewItemUsecase(repo repository.ItemRepository) ItemUsecase {
	return &itemUsecase{
		repo: repo,
	}
}

func (uc *itemUsecase) FindAll() ([]*model.Item, error) {
	items, err := uc.repo.FindAll()
	if err != nil {
		return nil, fmt.Errorf("itemRepository.FindAll: %w", err)
	}
	return items, nil
}

func (uc *itemUsecase) SaveNewItem(item *model.Item) (*model.Item, error) {
	item, err := uc.repo.Save(item)
	if err != nil {
		return nil, fmt.Errorf("itemRepository.Save: %w", err)
	}
	return item, nil
}

func (uc *itemUsecase) UpdateItem(item *model.Item) (*model.Item, error) {
	// check if item exists
	orig, _ := uc.repo.FindById(item.Id)
	if orig == nil {
		return nil, ErrNotFound
	}

	// update item
	item.CreatedAt = swag.Time(*orig.CreatedAt)
	item, err := uc.repo.Save(item)
	if err != nil {
		return nil, fmt.Errorf("itemRepository.Save: %w", err)
	}

	return item, nil
}
