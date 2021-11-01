import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

import GameField from "../components/GameField";
import {
  GameDataToClientPayload,
  GameRoom,
  JoinGamePayload,
  StartGamePayload,
  UpdateBarPositionPayload,
} from "../types/game";
import { io, Socket } from "socket.io-client";

type UserState =
  | "wait for join"
  | "wait for player"
  | "playing as left"
  | "playing as right"
  | "error";

export default function Game() {
  const [userID] = useState<number>(Math.floor(Math.random() * 100000));
  const [userState, updateUserState] = useState<UserState>("wait for join");
  const [game, updateGame] = useState<GameRoom>({
    id: -1,
    name: "",
    audience: [],
  });
  const socketRef = useRef<Socket>();
  const mousePosRef = useRef<number>(0);

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
        if (payload.data.props?.status === "standby") {
          updateUserState("wait for player");
        } else if (payload.data.leftPlayer && payload.data.rightPlayer) {
          updateUserState(
            payload.data.leftPlayer.id === userID
              ? "playing as left"
              : "playing as right"
          );
        }
        if (
          payload.data.leftPlayer &&
          payload.data.leftPlayer.id === userID &&
          payload.data.props !== undefined
        ) {
          payload.data.props.barLeftY = mousePosRef.current;
          if (payload.data.props.status === "left") {
            payload.data.props.ballX = payload.data.props.ballRadius + 15;
            payload.data.props.ballY = payload.data.props.barLeftY;
          }
        } else if (
          payload.data.rightPlayer &&
          payload.data.rightPlayer.id === userID &&
          payload.data.props !== undefined
        ) {
          payload.data.props.barRightY = mousePosRef.current;
          if (payload.data.props.status === "right") {
            payload.data.props.ballX =
              payload.data.props.sizeX - payload.data.props.ballRadius - 15;
            payload.data.props.ballY = payload.data.props.barRightY;
          }
        }
        const payloadBarPos: UpdateBarPositionPayload = {
          roomName: payload.data.name,
          player: {
            id: userID,
            name: `user-${userID}`,
          },
          barPosition: mousePosRef.current,
        };
        socketRef?.current?.emit("updateBarPosition", payloadBarPos);
        updateGame(payload.data);
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

  const startGame = (game: GameRoom) => {
    if (
      game.props?.status === "left" &&
      game.leftPlayer?.id === userID &&
      socketRef?.current
    ) {
      const payload: StartGamePayload = {
        roomName: game.name,
        player: {
          id: userID,
          name: `user-${userID}`,
        },
      };
      socketRef.current.emit("startGame", payload);
    } else if (
      game.props?.status === "right" &&
      game.rightPlayer?.id === userID &&
      socketRef?.current
    ) {
      const payload: StartGamePayload = {
        roomName: game.name,
        player: {
          id: userID,
          name: `user-${userID}`,
        },
      };
      socketRef.current.emit("startGame", payload);
    }
  };

  const isInGame = (): boolean => {
    return userState === "playing as left" || userState === "playing as right";
  };

  return (
    <div>
      <NavBar>
        <Grid container direction="column" alignItems="center">
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
              if (mousePosRef && gameFieldRef && gameFieldRef.current) {
                mousePosRef.current =
                  e.clientY - gameFieldRef.current.offsetTop;
              }
            }}
            onClick={() => startGame(game)}
          >
            {isInGame() && game.props && <GameField game={game.props} />}
          </div>
        </Grid>
      </NavBar>
    </div>
  );
}
