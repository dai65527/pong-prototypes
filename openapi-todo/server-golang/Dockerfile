FROM golang:1.16 as build-env

WORKDIR /go/src/github.com/dai65527/pong-prototypes/openapi-todo/server-golang 
ADD go.mod go.mod
ADD go.sum go.sum
RUN go mod download

ADD . .

# https://stackoverflow.com/questions/57921746/binary-was-compiled-with-cgo-enabled-0-go-sqlite3-requires-cgo-to-work-this
RUN go build -o todo-server openapi/cmd/todo-server/main.go
#RUN GOOS=linux go build -a -ldflags "-linkmode external -extldflags '-static' -s -w" -o todo-server openapi/cmd/todo-server/main.go

CMD [ "./todo-server", "--host", "0.0.0.0", "--port", "4000" ]

#FROM alpine:latest
#COPY --from=build-env /go/src/github.com/dai65527/pong-prototypes/openapi-todo/server-golang/todo-server  .
#
#EXPOSE 4000
#
#CMD [ "./todo-server", "--host", "0.0.0.0", "--port", "4000" ]
