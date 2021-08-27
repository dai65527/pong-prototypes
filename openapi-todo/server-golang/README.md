## Run server
On port 4000 (for example.)
```sh
$ go run openapi/cmd/todo-server/main.go --port=4000
```

## Request by curl from local
Following example is gathered in req-local.sh

### Add a item
```sh
$ curl -XPOST -d '{"name": "item1", "comment": "This is first todo item."}' -H "Content-Type: application/json" localhost:4000/item
{"comment":"This is first todo item.","created_at":1629634868,"done":false,"id":1,"name":"item1","updated_at":1629634868}
$ curl -XPOST -d '{"name": "item2", "comment": "This is second todo item."}' -H "Content-Type: application/json" localhost:4000/item
{"comment":"This is second todo item.","created_at":1629634922,"done":false,"id":2,"name":"item2","updated_at":1629634922}
$ curl -XPOST -d '{"name": "item3", "comment": "This is third todo item."}' -H "Content-Type: application/json" localhost:4000/item
{"comment":"This is third todo item.","created_at":1629634935,"done":false,"id":3,"name":"item3","updated_at":1629634935}
```

### Get all items
```sh
$ curl localhost:4000/item | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   369  100   369    0     0  52714      0 --:--:-- --:--:-- --:--:-- 52714
[
  {
    "comment": "This is first todo item.",
    "created_at": 1629634868,
    "done": false,
    "id": 1,
    "name": "item1",
    "updated_at": 1629634868
  },
  {
    "comment": "This is second todo item.",
    "created_at": 1629634922,
    "done": false,
    "id": 2,
    "name": "item2",
    "updated_at": 1629634922
  },
  {
    "comment": "This is third todo item.",
    "created_at": 1629634935,
    "done": false,
    "id": 3,
    "name": "item3",
    "updated_at": 1629634935
  }
]
```

### Update a item
```sh
# change item name
$ curl -XPUT -d '{"id": 1, "name": "アイテム1", "done": false, "comment": "This is first todo item."}' -H "Content-Type: application/json" localhost:4000/item 
{"comment":"This is first todo item.","created_at":1629634868,"done":false,"id":1,"name":"アイテム1","updated_at":1629637690}
# change to done
$ curl -XPUT -d '{"id": 2, "name": "item2", "done": true, "comment": "This is second todo item."}' -H "Content-Type: application/json" localhost:4000/item    
{"comment":"This is second todo item.","created_at":1629634922,"done":true,"id":2,"name":"item2","updated_at":1629635234}
# change comment
$ curl -XPUT -d '{"id": 3, "name": "item3", "done": false, "comment": "I like SUSHI."}' -H "Content-Type: application/json" localhost:4000/item           
{"comment":"I like SUSHI.","created_at":1629634935,"done":true,"id":3,"name":"item3","updated_at":1629637755}
```

### Delete done items
```sh
$ curl -XDELETE localhost:4000/item
null
```

### Delete by id
```sh
$ curl -XDELETE localhost:4000/item/3
```

### Get by id
```sh
$ curl localhost:4000/item/1
{"comment":"This is first todo item.","created_at":1630070994,"done":false,"id":1,"name":"アイテム1","updated_at":1630070994}
```
