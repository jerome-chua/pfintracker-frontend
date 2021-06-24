import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";

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
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="form-inner">
          <h2>Login</h2>
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
            Sign In
          </Button>
        </div>
      </form>
    </Container>
  );
}
