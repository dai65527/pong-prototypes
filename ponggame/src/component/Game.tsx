import React, { useEffect, useRef } from "react";

type GameStatus = "left" | "right" | "on" | "over";
type GameTurn = "left" | "right";

type GameProps = {
  lastRenderedAt: number;
  status: GameStatus;
  turn: GameTurn;
  ballX: number;
  ballY: number;
  barLeftY: number;
  barRightY: number;
  vx: number;
  vy: number;
  pointLeft: number;
  pointRight: number;
};

const Game: React.FC<{}> = () => {
  const size = { width: 750, height: 500 };
  const barWidth = 10;
  const barHeight = 100;
  const ballRadius = 10;
  const velocity = 1000;

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

  const isInPaddle = (barY: number, ballY: number): boolean => {
    if (ballY < barY - barHeight / 2) {
      return false;
    }
    if (ballY > barY + barHeight / 2) {
      return false;
    }
    return true;
  };

  const renderFrame = (ctx: CanvasRenderingContext2D) => {
    if (gameRef.current.lastRenderedAt === 0) {
      gameRef.current.lastRenderedAt = Date.now();
      return;
    } else {
      const timeNow = Date.now();
      const dt = timeNow - gameRef.current.lastRenderedAt;
      gameRef.current.lastRenderedAt = timeNow;
      if (gameRef.current.status === "over") {
        // nop
      } else if (gameRef.current.status === "left") {
        gameRef.current.ballX = 5 + barWidth + ballRadius;
        gameRef.current.ballY = mousePosRef.current;
      } else if (gameRef.current.status === "right") {
        gameRef.current.ballX = size.width - 5 - barWidth - ballRadius;
        gameRef.current.ballY = mousePosRef.current;
      } else {
        if (gameRef.current.vx === 0) {
          gameRef.current.vx = gameRef.current.turn === "left" ? velocity : -velocity;
        }
        if (gameRef.current.vy === 0) {
          gameRef.current.vy = velocity;
        }
        let dx = (gameRef.current.vx * dt) / 1000;
        if (gameRef.current.ballX + dx < 0 + ballRadius) {
          if (isInPaddle(gameRef.current.barLeftY, gameRef.current.ballY)) {
            gameRef.current.vx = -gameRef.current.vx;
            dx = -dx;
          } else {
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
        } else if (gameRef.current.ballX + dx > size.width - ballRadius) {
          if (isInPaddle(gameRef.current.barRightY, gameRef.current.ballY)) {
            gameRef.current.vx = -gameRef.current.vx;
            dx = -dx;
          } else {
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
        gameRef.current.ballX += dx;

        let dy = (gameRef.current.vy * dt) / 1000;
        if (
          gameRef.current.ballY + dy < 0 + ballRadius ||
          gameRef.current.ballY + dy > size.height - ballRadius
        ) {
          gameRef.current.vy = -gameRef.current.vy;
          dy = -dy;
        }
        gameRef.current.ballY += dy;
      }
    }

    gameRef.current.barLeftY = mousePosRef.current;
    gameRef.current.barRightY = mousePosRef.current;

    // draw background
    ctx.beginPath();
    ctx.rect(0, 0, size.width, size.height);
    ctx.fillStyle = "#111";
    ctx.fill();
    ctx.closePath();

    // draw ball
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

    // draw right bar
    ctx.beginPath();
    ctx.rect(5, gameRef.current.barLeftY - barHeight / 2, barWidth, barHeight);
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();

    // draw left bar
    ctx.beginPath();
    ctx.rect(
      size.width - barWidth - 5,
      gameRef.current.barLeftY - barHeight / 2,
      barWidth,
      barHeight
    );
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();

    // draw halfway line
    ctx.beginPath();
    ctx.moveTo(size.width / 2, 0);
    ctx.lineTo(size.width / 2, size.height);
    ctx.strokeStyle = "#EEE";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // draw score
    ctx.font = "32px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#EEE";
    ctx.fillText(`${gameRef.current.pointLeft}`, size.width / 2 - 50, 50);
    ctx.fillText(`${gameRef.current.pointRight}`, size.width / 2 + 50, 50);

    // draw win/lose
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
