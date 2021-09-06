# To generate go file from openapi definition

SRCNAME = todo.yaml
SRCDIR = ./openapi
SRC = $(SRCDIR)/$(SRCNAME)

GOSWAGGER = docker run --rm -it  --user $(shell id -u):$(shell id -g) -e GOPATH=$(HOME)/go:/go -v $(HOME):$(HOME) -w $(shell pwd) quay.io/goswagger/swagger:v0.27.0
OPENAPIGENERATOR = docker run --rm -it -v ${PWD}:/local -w /local openapitools/openapi-generator-cli
#   -i /local/petstore.yaml \
#   -g go \
#   -o /local/out/go

GOOUTDIR	= server-golang/openapi
REACTOUTDIR = client-react/src/openapi

.PHONY: go-server
go-server: 
	$(info generate go code for server)
	@ $(GOSWAGGER) generate server  --strict-additional-properties --target $(GOOUTDIR) -f $(SRC)

.PHONY: react-client
react-client:
	$(info generate react code for client)
	@ $(OPENAPIGENERATOR) generate -g typescript-fetch --additional-properties=typescriptThreePlus=true -i $(SRC) -o $(REACTOUTDIR)
	# @ $(OPENAPIGENERATOR) help generate
