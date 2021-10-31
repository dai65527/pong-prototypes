import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';

// ゲームの状態を保存する型
type GameStatus = 'standby' | 'left' | 'right' | 'on' | 'over';

// ゲームのターンを保存する型
type GameTurn = 'left' | 'right';

// ゲームのプロパティを保存する型
export type GameProps = {
  status: GameStatus; // ゲームの状態
  turn: GameTurn; // ゲームのターン
  sizeX: number;
  sizeY: number;
  barWidth: number;
  ballX: number; // ボールのx座標
  ballY: number; // ボールのy座標
  ballRadius: number;
  ballSppedX: number;
  ballSppedY: number;
  barLeftY: number; // 左のバーのy座標（バー中心）
  barRightY: number; // 右のバーのy座標（バー中心）
  pointLeft: number; // 左側プレーヤーのポイント
  pointRight: number; // 右側プレーヤーのポイント
  pointToWin: number; // 勝利ポイント
};

type GameRoom = {
  id: number;
  name: string;
  lastRenderedAt?: number;
  leftPlayer?: User;
  rightPlayer?: User;
  audience: User[];
  props: GameProps;
};

type User = {
  id: number;
  name: string;
};

type JoinGamePayload = {
  player: User;
};

type WatchGamePayload = {
  roomID: number;
  watcher: User;
};

type GameDataToClientPayload = {
  data: GameRoom;
};

type ErrorPayload = {
  message: string;
};

@WebSocketGateway(4000, { namespace: 'game', cors: true })
export class GameGateway {
  private gameRoomID: number;
  public gameRooms: GameRoom[];
  @WebSocketServer() wss: Server;

  constructor() {
    this.gameRoomID = 1;
    this.gameRooms = [];
  }

  sendGameData(room: GameRoom) {
    const payload: GameDataToClientPayload = { data: room };
    this.wss.to(room.name).emit('gameDataToClient', payload);
  }

  @SubscribeMessage('joinGame')
  handleJoinGame(client: Socket, payload: JoinGamePayload): void {
    console.log('joinGame');
    // filter room not started
    const rooms = this.gameRooms.filter((gameRoom) => {
      return !gameRoom.leftPlayer || !gameRoom.rightPlayer;
    });

    if (rooms.length !== 0) {
      // join room
      if (!rooms[0].leftPlayer) rooms[0].leftPlayer = payload.player;
      else if (!rooms[0].rightPlayer) rooms[0].rightPlayer = payload.player;
      client.join(rooms[0].name);
    } else {
      // create new room
      const newRoom: GameRoom = {
        id: this.gameRoomID,
        name: `room-${this.gameRoomID}`,
        audience: [],
        props: {
          status: 'standby', // ゲームの状態
          turn: 'left', // ゲームのターン
          sizeX: 750,
          sizeY: 500,
          barWidth: 100,
          ballRadius: 10,
          pointToWin: 10,

          ballX: 0, // ボールのx座標
          ballY: 0, // ボールのy座標
          ballSppedX: 0, // ボールのx方向スピード
          ballSppedY: 0, // ボールのy方向スピード
          barLeftY: 0, // 左のバーのy座標（バー中心）
          barRightY: 0, // 右のバーのy座標（バー中心）
          pointLeft: 0, // 左側プレーヤーのポイント
          pointRight: 0, // 右側プレーヤーのポイント
        },
      };
      this.gameRoomID++;

      // join newly created room
      if (Date.now() % 2 === 1) newRoom.leftPlayer = payload.player;
      else newRoom.rightPlayer = payload.player;
      client.join(newRoom.name);
      this.gameRooms.push(newRoom);
    }
  }

  @SubscribeMessage('watchGame')
  handleWatchGame(client: Socket, payload: WatchGamePayload): void {
    // find game
    const idx = this.gameRooms.findIndex((room) => room.id === payload.roomID);
    if (idx === -1) {
      const payload: ErrorPayload = { message: 'no such room' };
      client.emit('error', payload);
      return;
    }

    // join the room as watcher
    client.join(this.gameRoomID[idx].name);
    this.gameRooms[idx].audience.push(payload.watcher);
  }
}
