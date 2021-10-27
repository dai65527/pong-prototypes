import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h2" sx={{ marginBottom: 3 }}>
            Let's play pong
          </Typography>
          <Button variant="outlined" size="large" component={Link} to="/game">
            Start Game
          </Button>
        </Grid>
      </NavBar>
    </>
  );
}
