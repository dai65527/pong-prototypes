import React, { useEffect, useRef, useState } from "react";

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
};

const Game: React.FC<{}> = () => {
  const size = { width: 750, height: 500 };
  const barWidth = 10;
  const barHeight = 100;
  const ballRadius = 10;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<number>(size.height / 2)
  const [count, setCount] = useState<number>(0);
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
  });

  const renderFrame = (ctx: CanvasRenderingContext2D) => {
    if (gameRef.current.lastRenderedAt === 0) {
      gameRef.current.lastRenderedAt = Date.now();
      return
    } else {
      const timeNow = Date.now();
      const dt = timeNow - gameRef.current.lastRenderedAt;
      gameRef.current.lastRenderedAt = timeNow;
      if (gameRef.current.status === "left") {
        gameRef.current.ballX = 5 + barWidth + ballRadius;
        gameRef.current.ballY = mousePos;
      } else if (gameRef.current.status === "right") {
        gameRef.current.ballX = size.width - 5 - barWidth - ballRadius;
        gameRef.current.ballY = mousePos;
      } else {
        if (gameRef.current.vx === 0) {
          gameRef.current.vx = (gameRef.current.turn === "left") ? 500 : -500;
        }
        if (gameRef.current.vy === 0) {
          gameRef.current.vy = 500
        }
        let dx = (gameRef.current.vx * dt) / 1000;
        if (
          gameRef.current.ballX + dx < 0 + ballRadius ||
          gameRef.current.ballX + dx > size.width - ballRadius
        ) {
          gameRef.current.vx = -gameRef.current.vx;
          dx = -dx;
        }
        let dy = (gameRef.current.vy * dt) / 1000;
        if (
          gameRef.current.ballY + dy < 0 + ballRadius ||
          gameRef.current.ballY + dy > size.height - ballRadius
        ) {
          gameRef.current.vy = -gameRef.current.vy;
          dy = -dy;
        }
        gameRef.current.ballX += dx;
        gameRef.current.ballY += dy;
      }
    }

    gameRef.current.barLeftY = mousePos;
    gameRef.current.barRightY = mousePos;

    // draw background
    ctx.beginPath();
    ctx.rect(0, 0, size.width, size.height);
    ctx.fillStyle = "#111";
    ctx.fill();
    ctx.closePath();

    // draw ball
    ctx.beginPath();
    ctx.arc(gameRef.current.ballX, gameRef.current.ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();

    // draw paddle
    ctx.beginPath();
    ctx.rect(5, gameRef.current.barLeftY - barHeight / 2, barWidth, barHeight);
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();

    // ctx.rect();
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
          setMousePos(e.clientY - canvasRef.current?.offsetTop)
        }}
        onClick={() => {
          if (gameRef.current.status === "left" || gameRef.current.status === "right") {
            gameRef.current.status = "on";
          }
          setCount(count + 1);
        }}
      ></canvas>
      <p>mousePos={mousePos}</p>
      <p>count={count}</p>
    </div>
  );
};

export default Game;
