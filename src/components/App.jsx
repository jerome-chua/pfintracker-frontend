import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/Theme.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Transactions from "./Transactions.jsx";
import Login from "./Login.jsx";
import UserHeader from "../components/ui/UserHeader";

export default function App() {
  console.log("Main App Renders");

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/*TODO: Cater for 2 different navbars */}
        <UserHeader />
        <Switch>
          <Route exact path="/transactions">
            <Transactions />
          </Route>
          <Route exact path="/dashboard">
            Dashboard Component
          </Route>
          <Route exact path="/budget">
            Budget Component
          </Route>
          <Route exact path="/profile">
            Profile Component
          </Route>
          <Route exact path="/">
            Home Component
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
