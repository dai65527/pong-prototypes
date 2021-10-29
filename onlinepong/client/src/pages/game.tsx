import { Button, Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

import GameField, { GameProps } from "../components/GameField";

type UserState = "wait for join" | "wait for player" | "playing" | "error";

export default function Game() {
  const size = { width: 750, height: 500 };

  const waitForPlayer = () => {
    setTimeout(() => {
      updateUserState("playing");
    }, 3000);
    updateUserState("wait for player");
  };

  const [mousePos, updateMousePos] = useState<number>(0);
  const [userState, updateUserState] = useState<UserState>("wait for join");
  const [gameProps, updateGameProps] = useState<GameProps>({
    status: "left",
    turn: "left",
    ballX: 0,
    ballY: 0,
    barLeftY: size.height / 2,
    barRightY: size.height / 2,
    pointLeft: 0,
    pointRight: 0,
  });

  const gameFieldRef = useRef<HTMLInputElement>(null);

  const FetchGameProps = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3秒待つ
    updateGameProps((old): GameProps => {
      return {
        ...old,
      };
    });
  };

  return (
    <div>
      <NavBar>
        {/* <input /> */}
        <Grid container direction="column" alignItems="center">
          <Typography>{mousePos}</Typography>
          <Typography sx={{ marginBottom: 3 }}>{userState}</Typography>
          {userState === "wait for join" && (
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/game"
              onClick={waitForPlayer}
            >
              Join Game
            </Button>
          )}
          <div
            ref={gameFieldRef}
            onMouseMove={(e) => {
              if (!gameFieldRef || !gameFieldRef.current) {
                return;
              }
              updateMousePos(e.clientY - gameFieldRef.current?.offsetTop);
              updateGameProps((old) => {
                return {
                  ...old,
                  barLeftY: mousePos,
                  barRightY: mousePos,
                };
              });
            }}
          >
            {userState === "playing" && <GameField gameProps={gameProps} />}
          </div>
        </Grid>
      </NavBar>
    </div>
  );
}
