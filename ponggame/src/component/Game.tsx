import React, { useEffect, useRef } from "react";

// ゲームの状態を保存する型
type GameStatus = "left" | "right" | "on" | "over";

// ゲームのターンを保存する型
type GameTurn = "left" | "right";

// ゲームのプロパティを保存する型
type GameProps = {
  lastRenderedAt: number; // 最後にcanvasが描画された時刻
  status: GameStatus; // ゲームの状態
  turn: GameTurn; // ゲームのターン
  ballX: number; // ボールのx座標
  ballY: number; // ボールのy座標
  barLeftY: number; // 左のバーのy座標（バー中心）
  barRightY: number; // 右のバーのy座標（バー中心）
  vx: number; // ボール速度（x方向）
  vy: number; // ボール速度（y方向）
  pointLeft: number; // 左側プレーヤーのポイント
  pointRight: number; // 右側プレーヤーのポイント
};

const Game: React.FC<{}> = () => {
  // 描画に関する定数
  const size = { width: 750, height: 500 }; // canvas要素のサイズ
  const barWidth = 10; // バーの幅（y方向長さ）
  const barHeight = 100; // バーの幅（y方向長さ）
  const ballRadius = 10; // ボールの半径
  const velocity = 1000; // x,y方向速度の絶対値

  // ゲーム中に保持する値
  // Reactの描画と異なるタイミングで描画を行うため、useRefを用いる
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<number>(size.height / 2);
  const gameRef = useRef<GameProps>({
    lastRenderedAt: 0,
    status: "left",
    turn: "left",
    ballX: size.width / 2,
    ballY: size.height / 2,
    barLeftY: size.height / 2,
    barRightY: size.height / 2,
    vx: 0,
    vy: 0,
    pointLeft: 0,
    pointRight: 0,
  });

  // バーで跳ね返せているかを判定する関数
  const isInBar = (barY: number, ballY: number): boolean => {
    if (ballY < barY - barHeight / 2) {
      return false;
    }
    if (ballY > barY + barHeight / 2) {
      return false;
    }
    return true;
  };

  // canvas描画のメインループ
  const renderFrame = (ctx: CanvasRenderingContext2D) => {
    // 初回描画
    if (gameRef.current.lastRenderedAt === 0) {
      gameRef.current.lastRenderedAt = Date.now();
      return;
    }

    // ゲームロジック
    const timeNow = Date.now();
    const dt = timeNow - gameRef.current.lastRenderedAt;
    gameRef.current.lastRenderedAt = timeNow;
    if (gameRef.current.status === "over") {
      // ゲーム終了後
      // nop
    } else if (gameRef.current.status === "left") {
      // ゲームスタート前（左ユーザ）
      gameRef.current.ballX = 5 + barWidth + ballRadius;
      gameRef.current.ballY = mousePosRef.current;
    } else if (gameRef.current.status === "right") {
      // ゲームスタート前（右ユーザ）
      gameRef.current.ballX = size.width - 5 - barWidth - ballRadius;
      gameRef.current.ballY = mousePosRef.current;
    } else {
      // ゲーム中
      // 速度の初期値
      if (gameRef.current.vx === 0) {
        gameRef.current.vx =
          gameRef.current.turn === "left" ? velocity : -velocity;
      }
      if (gameRef.current.vy === 0) {
        gameRef.current.vy = velocity;
      }

      // x方向の移動距離
      let dx = (gameRef.current.vx * dt) / 1000;
      // 左側の壁に衝突
      if (gameRef.current.ballX + dx < 0 + ballRadius) {
        // バーで跳ね返せているか
        if (isInBar(gameRef.current.barLeftY, gameRef.current.ballY)) {
          // 跳ね返り
          gameRef.current.vx = -gameRef.current.vx;
          dx = -dx;
        } else {
          // 跳ね返せてない場合
          gameRef.current.status = "right";
          gameRef.current.turn = "right";
          gameRef.current.vx = 0;
          gameRef.current.vy = 0;
          gameRef.current.pointRight++;
          if (gameRef.current.pointRight >= 10) {
            gameRef.current.status = "over";
          }
          return;
        }
      // 右側の壁に衝突
      } else if (gameRef.current.ballX + dx > size.width - ballRadius) {
        // バーで跳ね返せているか
        if (isInBar(gameRef.current.barRightY, gameRef.current.ballY)) {
          // 跳ね返り
          gameRef.current.vx = -gameRef.current.vx;
          dx = -dx;
        } else {
          // 跳ね返せてない場合
          gameRef.current.status = "left";
          gameRef.current.turn = "left";
          gameRef.current.vx = 0;
          gameRef.current.vy = 0;
          gameRef.current.pointLeft++;
          if (gameRef.current.pointLeft >= 10) {
            gameRef.current.status = "over";
          }
          return;
        }
      }
      // x方向の移動距離を足す
      gameRef.current.ballX += dx;

      // y方向の移動距離を足す
      let dy = (gameRef.current.vy * dt) / 1000;
      // 衝突していたら反転する
      if (
        gameRef.current.ballY + dy < 0 + ballRadius ||
        gameRef.current.ballY + dy > size.height - ballRadius
      ) {
        gameRef.current.vy = -gameRef.current.vy;
        dy = -dy;
      }
      // y方向の移動距離を足す
      gameRef.current.ballY += dy;
    }

    // バーの位置
    gameRef.current.barLeftY = mousePosRef.current;
    gameRef.current.barRightY = mousePosRef.current;

    // 背景の描画
    ctx.beginPath();
    ctx.rect(0, 0, size.width, size.height);
    ctx.fillStyle = "#111";
    ctx.fill();
    ctx.closePath();

    // ボールの描画
    ctx.beginPath();
    ctx.arc(
      gameRef.current.ballX,
      gameRef.current.ballY,
      ballRadius,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();

    // 左側のバーの描画
    ctx.beginPath();
    ctx.rect(5, gameRef.current.barLeftY - barHeight / 2, barWidth, barHeight);
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();

    // 右側のバーの描画
    ctx.beginPath();
    ctx.rect(
      size.width - barWidth - 5,
      gameRef.current.barRightY - barHeight / 2,
      barWidth,
      barHeight
    );
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();

    // 中心線の描画
    ctx.beginPath();
    ctx.moveTo(size.width / 2, 0);
    ctx.lineTo(size.width / 2, size.height);
    ctx.strokeStyle = "#EEE";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // スコアの描画
    ctx.font = "32px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#EEE";
    ctx.fillText(`${gameRef.current.pointLeft}`, size.width / 2 - 50, 50);
    ctx.fillText(`${gameRef.current.pointRight}`, size.width / 2 + 50, 50);

    // 勝ち負けの描画
    if (gameRef.current.status === "over") {
      ctx.fillText(
        "Win",
        gameRef.current.pointLeft > gameRef.current.pointRight
          ? size.width / 4
          : (size.width * 3) / 4,
        size.height / 2
      );
      ctx.fillText(
        "Lose",
        gameRef.current.pointLeft > gameRef.current.pointRight
          ? (size.width * 3) / 4
          : size.width / 4,
        size.height / 2
      );
    }
  };

  // 描画ループ
  // https://javascript.plainenglish.io/canvas-animation-inside-react-components-with-requestanimationframe-c5d594afc1b
  const tick = () => {
    const ctx = canvasRef?.current?.getContext("2d");
    if (!ctx) {
      return;
    }
    renderFrame(ctx);
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestAnimationFrame(tick);
  });

  return (
    <div>
      <canvas
        {...size}
        ref={canvasRef}
        onMouseMove={(e) => {
          if (!canvasRef || !canvasRef.current) {
            return;
          }
          mousePosRef.current = e.clientY - canvasRef.current?.offsetTop;
        }}
        onClick={() => {
          if (
            gameRef.current.status === "left" ||
            gameRef.current.status === "right"
          ) {
            gameRef.current.status = "on";
          }
        }}
      ></canvas>
    </div>
  );
};

export default Game;
