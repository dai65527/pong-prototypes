# To generate go file from openapi definition

SRCNAME = todo.yaml
SRCDIR	= ./openapi
SRC     = $(SRCDIR)/$(SRCNAME)

GOSWAGGER	= docker run --rm -it  --user $(shell id -u):$(shell id -g) -e GOPATH=$(HOME)/go:/go -v $(HOME):$(HOME) -w $(shell pwd) quay.io/goswagger/swagger:v0.27.0
GOOUTDIR	= server-golang/openapi

.PHONY: go-server
go-server: 
	$(info generate go code for server)
	@ $(GOSWAGGER) generate server --exclude-main --target $(GOOUTDIR) -f $(SRC)
