// ゲームの状態を保存する型
type GameStatus = "standby" | "left" | "right" | "on" | "over";

// ゲームのターンを保存する型
type GameTurn = "left" | "right";

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

export type GameRoom = {
  id: number;
  name: string;
  lastRenderedAt?: number;
  leftPlayer?: User;
  rightPlayer?: User;
  audience: User[];
  props?: GameProps;
};

export type User = {
  id: number;
  name: string;
};

export type JoinGamePayload = {
  player: User;
};

export type WatchGamePayload = {
  roomID: number;
  watcher: User;
};

export type GameDataToClientPayload = {
  data: GameRoom;
};

export type ErrorPayload = {
  message: string;
};
