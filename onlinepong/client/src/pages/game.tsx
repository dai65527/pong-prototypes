import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

import GameField, { GameProps } from "../components/GameField";

type UserState = "wait for join" | "wait for player" | "playing" | "error";

// const FetchGameProps = () => {};

export default function Game() {
  const [userState, updateUserState] = useState<UserState>("wait for join");

  const waitForPlayer = () => {
    setTimeout(() => {
      updateUserState("playing");
    }, 3000);
    updateUserState("wait for player");
  };

  return (
    <>
      <NavBar>
        <Grid container direction="column" alignItems="center">
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
          {userState === "playing" && <GameField />}
        </Grid>
      </NavBar>
    </>
  );
}
