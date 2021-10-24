### 入れるパッケージ

```
yarn add -D @types/socket.io
yarn add @nestjs/websockets @nestjs/platform-socket.io
```

### 基本的な handleMessage

以下 2 つは一緒

```ts
  @SubscribeMessage("msgToServer")
  handleMessage(client: Socket, text: string): void {
    client.emit("msgToClient", text);
  }
```

```ts
  @SubscribeMessage("msgToServer")
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: "msgToClient", data: "Hello World!" };
  }
```

これもある

```ts
  @WebSocketServer() wss: Server;

  @SubscribeMessage("msgToServer")
  handleMessage(client: Socket, text: string): void {
    this.wss.emit("msgToClient", text);
  }
```

### オプション

#### ポートを変更する

サーバ

```ts
@WebSocketGateway(3001)
```

クライアント

```html
<script src="https://localhost:3001/websockets/socket.io.js"></script>
```

```js
this.socket = io("http://localhost:3001");
```

#### path ( != namespace )を指定する

サーバ

```ts
@WebSocketGateway({ path: "/websockets" })
```

クライアント

```html
<script src="/websockets/socket.io.js"></script>
```

```js
this.socket = io("http://localhost:3000", { path: "/websockets" });
```

#### docs

サーバ側のオプションはここに書いてある
https://socket.io/docs/v4/server-options/#path

### serveClient オプション

クライアントに websocket の js ソースを供給するかを設定。
https://socket.io/docs/v4/server-options/#serveclient

```ts
@WebSocketGateway({ path: "/websockets", serveClient: true }) // 供給しない
@WebSocketGateway({ path: "/websockets", serveClient: false }) // 供給する
```

#### namespace

クライアント: パスで指定。

```js
this.socket.chat = io("http://localhost:3000/chat");
```

#### nest コマンドでディレクトリ内に作る

```
$ nest g gateway chat chat
```

### room に送る

```ts
// this.wss.emit("chatToClient", message); // no room
this.wss.to("message.room").emit("chatToClient", message); // to room
```

client: room に参加する

```js
if (this.isMemberOfActiveRoom) {
  this.socket.chat.emit("leaveRoom", this.activeRoom);
} else {
  this.socket.chat.emit("joinRoom", this.activeRoom);
}
```
