import React, { useState } from "react";
import { SavifyProvider } from "../store.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/Theme.jsx";
import UserHeader from "../components/ui/UserHeader";
import Transactions from "./Transactions.jsx";
import Dashboard from "./Dashboard.jsx";
import LoginForm from "./LoginForm.jsx";

export default function App() {
  console.log("Main App Renders");

  const myUser = {
    email: "jerome@123gmail.com",
    password: "pw123",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);
  };

  const Logout = () => {
    console.log("Logged out");
  };

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
              {user.email !== "" ? (
                <div className="welcome">
                  <h2>
                    Welcome back! <span>{user.name}</span>
                  </h2>
                </div>
              ) : (
                <LoginForm />
              )}
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </SavifyProvider>
  );
}
