import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

import GameField from "../components/GameField";
import {
  GameDataToClientPayload,
  GameRoom,
  JoinGamePayload,
} from "../types/game";
import { io, Socket } from "socket.io-client";

type UserState = "wait for join" | "wait for player" | "playing" | "error";

export default function Game() {
  const [userID] = useState<number>(Math.floor(Math.random() * 100000));
  const [mousePos, updateMousePos] = useState<number>(0);
  const [userState, updateUserState] = useState<UserState>("wait for join");
  const [game, updateGame] = useState<GameRoom>({
    id: -1,
    name: "",
    audience: [],
  });
  const socketRef = useRef<Socket>();

  useEffect(() => {
    console.log("connecting");
    socketRef.current = io("http://localhost:4000/game");
    return () => {
      console.log("disconnecting");
      socketRef?.current?.disconnect();
    };
  }, []);

  const gameFieldRef = useRef<HTMLInputElement>(null);

  const joinGame = () => {
    console.log("joining game");
    socketRef?.current?.on(
      "gameDataToClient",
      (payload: GameDataToClientPayload) => {
        updateGame(payload.data);
        if (userState === "wait for player" || userState === "wait for join") {
          if (payload.data.leftPlayer && payload.data.rightPlayer) {
            updateUserState("playing");
          } else {
            updateUserState("wait for player");
          }
        }
      }
    );
    const joinGamePayload: JoinGamePayload = {
      player: {
        id: userID,
        name: `user-${userID}`,
      },
    };
    socketRef?.current?.emit("joinGame", joinGamePayload);
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
              onClick={joinGame}
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
              updateGame((old) => {
                return {
                  ...old,
                  barLeftY: mousePos,
                  barRightY: mousePos,
                };
              });
            }}
          >
            {userState === "playing" && game.props && (
              <GameField game={game.props} />
            )}
          </div>
        </Grid>
      </NavBar>
    </div>
  );
}
