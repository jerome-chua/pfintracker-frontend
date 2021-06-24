import React, { cloneElement } from "react";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
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
    height: "2em",
    padding: 3,
    verticalAlign: "middle",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabsContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 12,
    marginLeft: "20px",
  },
}));

export default function UserHeader(props) {
  const classes = useStyles();

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Box m="auto">
              <Button
                component={Link}
                to="/"
                className={classes.logoContainer}
                disableRipple
              >
                <Typography variant="h5" color="secondary">
                  <img
                    alt="company logo"
                    className={classes.logo}
                    src="./logo.svg"
                  />
                  <span className={classes.logo}>$AVIFY</span>
                </Typography>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
