package usecase

import (
	"fmt"

	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/domain/model"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/domain/repository"
)

type ItemUsecase interface {
	FindAll() ([]*model.Item, error)
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
		return nil, fmt.Errorf("itemRepository.FindAll: %#v", err)
	}
	return items, nil
}