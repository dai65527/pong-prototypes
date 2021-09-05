import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
import { TodoService } from "./modules/service/TodoService";
import TodoMemoryRepository from "./modules/infra/TodoMemoryRepository";
import TodoAPIRepository from "./modules/infra/TodoApiRepository";

export const todoServiceContext = React.createContext<TodoService>(
  // new TodoService(new TodoMemoryRepository())
  new TodoService(new TodoAPIRepository("http://localhost", 4000))
);

function App() {
  return (
    <Router>
      <div>
        <nav>
          <h1>Sample App</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/todo">
            <Todo />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
