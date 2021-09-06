package infra

import (
	"fmt"

	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/domain/model"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

const (
	dbfilename = "todo.db"
)

func NewSqliteDB() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open(dbfilename), &gorm.Config{
		Logger: GormLogger(),
	})
	db.AutoMigrate(&model.Item{})
	if err != nil {
		return nil, fmt.Errorf("gorm.Open: %w", err)
	}
	return db, nil
}
