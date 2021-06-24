import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Container,
  Button,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import { MonetizationOn } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm({ Login, error }) {
  const classes = useStyles();
  const [details, setDetails] = useState({ email: "", password: "" });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    Login(details);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MonetizationOn />
        </Avatar>
        <form onSubmit={handleSubmit}>
          <div className="form-inner">
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error !== "" ? <div className="error">{error}</div> : ""}
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(evt) =>
                  setDetails({ ...details, email: evt.target.value })
                }
                value={details.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(evt) =>
                  setDetails({ ...details, password: evt.target.value })
                }
                value={details.password}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
