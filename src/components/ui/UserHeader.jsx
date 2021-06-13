import React, { useState, cloneElement } from "react";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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
    height: "1.8em",
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
            <Typography variant="h5" color="secondary">
              <img
                alt="company logo"
                className={classes.logo}
                src="./logo.svg"
              />
              SAVIFY
            </Typography>
            <Tabs className={classes.tabsContainer}>
              <Tab className={classes.tab} label="Transactions" />

              <Tab className={classes.tab} label="Dashboard" />

              <Tab className={classes.tab} label="Budget" />

              <Tab className={classes.tab} label="Profile" />
            </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* Set cushion below appbar  */}
      <div className={classes.toolbarMargin} />
    </>
  );
}
