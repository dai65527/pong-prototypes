import { useEffect, useRef } from "react";

// ゲームの状態を保存する型
export type GameStatus = "left" | "right" | "on" | "over";

// ゲームのターンを保存する型
export type GameTurn = "left" | "right";

// ゲームのプロパティを保存する型
export type GameProps = {
  // lastRenderedAt: number; // 最後にcanvasが描画された時刻
  status: GameStatus; // ゲームの状態
  turn: GameTurn; // ゲームのターン
  ballX: number; // ボールのx座標
  ballY: number; // ボールのy座標
  barLeftY: number; // 左のバーのy座標（バー中心）
  barRightY: number; // 右のバーのy座標（バー中心）
  pointLeft: number; // 左側プレーヤーのポイント
  pointRight: number; // 右側プレーヤーのポイント
};

export default function GameField() {
  // 描画に関する定数
  const size = { width: 750, height: 500 }; // canvas要素のサイズ
  const barWidth = 10; // バーの幅（y方向長さ）
  const barHeight = 100; // バーの幅（y方向長さ）
  const ballRadius = 10; // ボールの半径
  // const velocity = 1000; // x,y方向速度の絶対値

  const gameProps: GameProps = {
    status: "left",
    turn: "left",
    ballX: 0,
    ballY: 0,
    barLeftY: size.height / 2,
    barRightY: size.height / 2,
    pointLeft: 0,
    pointRight: 0,
  };

  // canvas描画のメインループ
  const renderFrame = (ctx: CanvasRenderingContext2D) => {
    // 背景の描画
    ctx.beginPath();
    ctx.rect(0, 0, size.width, size.height);
    ctx.fillStyle = "#111";
    ctx.fill();
    ctx.closePath();

    // ボールの描画
    ctx.beginPath();
    ctx.arc(gameProps.ballX, gameProps.ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();

    // 左側のバーの描画
    ctx.beginPath();
    ctx.rect(5, gameProps.barLeftY - barHeight / 2, barWidth, barHeight);
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();

    // 右側のバーの描画
    ctx.beginPath();
    ctx.rect(
      size.width - barWidth - 5,
      gameProps.barRightY - barHeight / 2,
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
    ctx.fillText(`${gameProps.pointLeft}`, size.width / 2 - 50, 50);
    ctx.fillText(`${gameProps.pointRight}`, size.width / 2 + 50, 50);

    // 勝ち負けの描画
    if (gameProps.status === "over") {
      ctx.fillText(
        "Win",
        gameProps.pointLeft > gameProps.pointRight
          ? size.width / 4
          : (size.width * 3) / 4,
        size.height / 2
      );
      ctx.fillText(
        "Lose",
        gameProps.pointLeft > gameProps.pointRight
          ? (size.width * 3) / 4
          : size.width / 4,
        size.height / 2
      );
    }
  };

  useEffect(() => {
    const ctx = canvasRef?.current?.getContext("2d");
    if (!ctx) {
      return;
    }
    renderFrame(ctx);
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <canvas
        {...size}
        ref={canvasRef}
        // onMouseMove={(e) => {
        //   mousePosRef.current = e.clientY - canvasRef.current?.offsetTop;
        // }}
        // onClick={() => {
        //   if (
        //     gameProps.status === "left" ||
        //     gameProps.status === "right"
        //   ) {
        //     gameProps.status = "on";
        //   }
        // }}
      ></canvas>
    </>
  );
}
