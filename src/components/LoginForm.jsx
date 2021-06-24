import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Container,
  Button,
  CssBaseline,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
} from "@material-ui/core";
import { MonetizationOn } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";

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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm({ Login, error }) {
  const classes = useStyles();
  const [details, setDetails] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    Login(details);

    if (error) {
      setOpen(true);
    }
  };

  const handleClose = (evt, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(evt) =>
                setDetails({ ...details, email: evt.target.value })
              }
              value={details.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(evt) =>
                setDetails({ ...details, password: evt.target.value })
              }
              value={details.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                Invalid Email or password. Try Again.
              </Alert>
            </Snackbar>
          </div>
        </form>
      </div>
    </Container>
  );
}
