import { useEffect, useRef } from "react";
import { GameProps } from "../types/game";

export default function GameField({ game }: { game: GameProps }) {
  // 描画に関する定数
  const size = { width: game.sizeX, height: game.sizeY }; // canvas要素のサイズ
  const barThickness = 10; // バーの幅（y方向長さ）

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
    ctx.arc(game.ballX, game.ballY, game.ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();

    // 左側のバーの描画
    ctx.beginPath();
    ctx.rect(5, game.barLeftY - game.barWidth / 2, barThickness, game.barWidth);
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();

    // 右側のバーの描画
    ctx.beginPath();
    ctx.rect(
      size.width - barThickness - 5,
      game.barRightY - game.barWidth / 2,
      barThickness,
      game.barWidth
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
    ctx.fillText(`${game.pointLeft}`, size.width / 2 - 50, 50);
    ctx.fillText(`${game.pointRight}`, size.width / 2 + 50, 50);

    // 勝ち負けの描画
    if (game.status === "over") {
      ctx.fillText(
        "Win",
        game.pointLeft > game.pointRight
          ? size.width / 4
          : (size.width * 3) / 4,
        size.height / 2
      );
      ctx.fillText(
        "Lose",
        game.pointLeft > game.pointRight
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
      <canvas {...size} ref={canvasRef}></canvas>
    </>
  );
}
