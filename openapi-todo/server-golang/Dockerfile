FROM golang:1.16 as build-env

WORKDIR /go/src/github.com/dai65527/pong-prototypes/openapi-todo/server-golang 
ADD . .

RUN go mod download
# https://stackoverflow.com/questions/57921746/binary-was-compiled-with-cgo-enabled-0-go-sqlite3-requires-cgo-to-work-this
RUN GOOS=linux go build -a -ldflags "-linkmode external -extldflags '-static' -s -w" -o todo-server openapi/cmd/todo-server/main.go

FROM alpine:latest
COPY --from=build-env /go/src/github.com/dai65527/pong-prototypes/openapi-todo/server-golang/todo-server  .

EXPOSE 80

CMD [ "./todo-server", "--host", "0.0.0.0", "--port", "80" ]
