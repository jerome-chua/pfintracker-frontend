import React from "react";
import { SavifyProvider } from "../store.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/Theme.jsx";
import UserHeader from "../components/ui/UserHeader";
import Transactions from "./Transactions.jsx";
import Dashboard from "./Dashboard.jsx";
// import Login from "./Login.jsx";

export default function App() {
  console.log("Main App Renders");

  return (
    <SavifyProvider>
      <ThemeProvider theme={theme}>
        <Router>
          {/*TODO: Cater for 2 different navbars */}
          <UserHeader />
          <Switch>
            <Route exact path="/transactions">
              <Transactions />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
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
    </SavifyProvider>
  );
}
