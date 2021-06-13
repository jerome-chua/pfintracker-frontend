import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login.jsx";

export default function App() {
  console.log("Main App Renders");

  return (
    <Router>
      <div>
        {/*TODO: Cater for 2 different navbars */}
        {/*TODO: Update to Material UI AppBar */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/dashboard">Budget</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/transactions">Transactions Component</Route>
          <Route path="/dashboard">Dashboard Component</Route>
          <Route path="/budget">Budget Component</Route>
          <Route path="/">Home Component</Route>
        </Switch>
      </div>
    </Router>
  );
}
