#!/bin/bash -eu

# new item
curl -XPOST -d '{"name": "item1", "comment": "This is first todo item."}' -H "Content-Type: application/json" localhost:4000/item
curl -XPOST -d '{"name": "item2", "comment": "This is second todo item."}' -H "Content-Type: application/json" localhost:4000/item
curl -XPOST -d '{"name": "item3", "comment": "This is third todo item."}' -H "Content-Type: application/json" localhost:4000/item

# show all items
curl localhost:4000/item | jq

# update items
curl -XPUT -d '{"id": 1, "name": "アイテム1", "done": false, "comment": "This is first todo item."}' -H "Content-Type: application/json" localhost:4000/item 
curl -XPUT -d '{"id": 2, "name": "item2", "done": true, "comment": "This is second todo item."}' -H "Content-Type: application/json" localhost:4000/item    
curl -XPUT -d '{"id": 3, "name": "item3", "done": false, "comment": "I like SUSHI."}' -H "Content-Type: application/json" localhost:4000/item

# show all items
curl localhost:4000/item | jq

# delete done items
curl -XDELETE localhost:4000/item

# show all items
curl localhost:4000/item | jq

# delete item by id
curl localhost

# get item by id
curl localhost:4000/item/1 | jq

# delete done items
curl -XDELETE localhost:4000/item

# show all items
curl localhost:4000/item | jq
