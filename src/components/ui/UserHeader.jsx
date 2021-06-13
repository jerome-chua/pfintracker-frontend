import React from "react";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// Set cushion below appbar
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "2em",
  },
  logo: {
    height: "1.8em",
  },
}));

export default function UserHeader(props) {
  const classes = useStyles();

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h5" color="secondary">
              <img
                alt="company logo"
                className={classes.logo}
                src="./logo.svg"
              />
              SAVIFY
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* Set cushion below appbar  */}
      <div className={classes.toolbarMargin} />
    </>
  );
}
