package infra

import (
	"log"
	"os"

	"gorm.io/gorm/logger"
)

func GormLogger() logger.Interface {
	return logger.New(
		log.New(os.Stderr, "\n", log.LstdFlags),
		logger.Config{
			IgnoreRecordNotFoundError: true,
			Colorful:                  false,
		},
	)
}
