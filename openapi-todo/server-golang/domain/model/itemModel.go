package model

import "time"

type Item struct {
	Id        int64 `gorm:"primarykey"`
	Name      string
	Comment   string
	Done      bool `gorm:"not null;default:false"`
	CreatedAt *time.Time
	UpdatedAt *time.Time
}
