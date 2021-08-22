// This file is safe to edit. Once it exists it will not be overwritten

package restapi

import (
	"crypto/tls"
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"

	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/handler"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/infra"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/openapi/restapi/operations"
	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/usecase"
)

//go:generate swagger generate server --target ../../openapi --name Todo --spec ../../../openapi/todo.yaml --principal interface{}

func configureFlags(api *operations.TodoAPI) {
	// api.CommandLineOptionsGroups = []swag.CommandLineOptionsGroup{ ... }
}

func configureAPI(api *operations.TodoAPI) http.Handler {
	// configure the api here
	api.ServeError = errors.ServeError

	// Set your custom logger if needed. Default one is log.Printf
	// Expected interface func(string, ...interface{})
	//
	// Example:
	// api.Logger = log.Printf

	api.UseSwaggerUI()
	// To continue using redoc as your UI, uncomment the following line
	// api.UseRedoc()

	api.JSONConsumer = runtime.JSONConsumer()

	api.JSONProducer = runtime.JSONProducer()

	// create new handler
	db, err := infra.NewSqliteDB()
	if err != nil {
		panic(err)
	}
	itemRepo := infra.NewItemRepository(db)
	itemUC := usecase.NewItemUsecase(itemRepo)
	todoHandler := handler.NewTodoHandler(itemUC, nil)

	// set handler
	api.GetItemHandler = operations.GetItemHandlerFunc(todoHandler.GetItem)
	api.PostItemHandler = operations.PostItemHandlerFunc(todoHandler.PostItem)
	api.PutItemHandler = operations.PutItemHandlerFunc(todoHandler.PutItem)

	if api.DeleteItemHandler == nil {
		api.DeleteItemHandler = operations.DeleteItemHandlerFunc(func(params operations.DeleteItemParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.DeleteItem has not yet been implemented")
		})
	}
	if api.DeleteItemItemIDHandler == nil {
		api.DeleteItemItemIDHandler = operations.DeleteItemItemIDHandlerFunc(func(params operations.DeleteItemItemIDParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.DeleteItemItemID has not yet been implemented")
		})
	}
	if api.GetItemHandler == nil {
		api.GetItemHandler = operations.GetItemHandlerFunc(func(params operations.GetItemParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.GetItem has not yet been implemented")
		})
	}
	if api.GetItemItemIDHandler == nil {
		api.GetItemItemIDHandler = operations.GetItemItemIDHandlerFunc(func(params operations.GetItemItemIDParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.GetItemItemID has not yet been implemented")
		})
	}
	if api.PostItemHandler == nil {
		api.PostItemHandler = operations.PostItemHandlerFunc(func(params operations.PostItemParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.PostItem has not yet been implemented")
		})
	}
	if api.PutItemHandler == nil {
		api.PutItemHandler = operations.PutItemHandlerFunc(func(params operations.PutItemParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.PutItem has not yet been implemented")
		})
	}

	api.PreServerShutdown = func() {}

	api.ServerShutdown = func() {}

	return setupGlobalMiddleware(api.Serve(setupMiddlewares))
}

// The TLS configuration before HTTPS server starts.
func configureTLS(tlsConfig *tls.Config) {
	// Make all necessary changes to the TLS configuration here.
}

// As soon as server is initialized but not run yet, this function will be called.
// If you need to modify a config, store server instance to stop it individually later, this is the place.
// This function can be called multiple times, depending on the number of serving schemes.
// scheme value will be set accordingly: "http", "https" or "unix".
func configureServer(s *http.Server, scheme, addr string) {
}

// The middleware configuration is for the handler executors. These do not apply to the swagger.json document.
// The middleware executes after routing but before authentication, binding and validation.
func setupMiddlewares(handler http.Handler) http.Handler {
	return handler
}

// The middleware configuration happens before anything, this middleware also applies to serving the swagger.json document.
// So this is a good place to plug in a panic handling middleware, logging and metrics.
func setupGlobalMiddleware(handler http.Handler) http.Handler {
	return handler
}
