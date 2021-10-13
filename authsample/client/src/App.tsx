import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Users from './pages/Users';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <h1>About</h1>
            <p>This is about page.</p>
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <h1>Home</h1>
            <p>This is home page.</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
