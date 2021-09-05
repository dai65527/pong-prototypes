## how to try

### server
If Go runtime is available.
```sh
go run server-golang/openapi/cmd/todo-server --port 4000
```

If you use docker.
```
cd server-golang
docker build -t openapi-todo-server .
docker run --rm -it -p 4000:4000 openapi-todo-server
```

### client
```
cd client-react
npm run start
```

### access
to http://localhost:3000
