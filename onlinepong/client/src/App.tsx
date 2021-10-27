import { CssBaseline } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./pages/game";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
