import React, { useState } from "react";
import { SavifyProvider } from "../store.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/Theme.jsx";
import UserHeader from "../components/ui/UserHeader";
import GuestHeader from "../components/ui/GuestHeader";
import Transactions from "./Transactions.jsx";
import Dashboard from "./Dashboard.jsx";
import LoginForm from "./LoginForm.jsx";

export default function App() {
  console.log("Main App Renders");

  const bypassUser = {
    email: "jerome123@gmail.com",
    password: "pw123",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const Login = (details) => {
    if (
      details.email === bypassUser.email &&
      details.password === bypassUser.password
    ) {
      console.log("Logged in");
      setLoggedIn(true);
    } else {
      setError("Details do not match!");
    }
  };

  return (
    <SavifyProvider>
      <ThemeProvider theme={theme}>
        <Router>
          {loggedIn ? <UserHeader /> : <GuestHeader />}

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
              {user.email !== "" ? (
                <Dashboard />
              ) : (
                <LoginForm Login={Login} error={error} />
              )}
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </SavifyProvider>
  );
}
