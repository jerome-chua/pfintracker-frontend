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
  const [value, setValue] = useState(0);

  const handleChange = (evt, value) => {
    setValue(value);
  };

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
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabsContainer}
              indicatorColor="secondary"
            >
              <Tab
                className={classes.tab}
                component={Link}
                to="/transactions"
                label="Transactions"
              />

              <Tab
                className={classes.tab}
                component={Link}
                to="/dashboard"
                label="Dashboard"
              />

              <Tab
                className={classes.tab}
                component={Link}
                to="/budget"
                label="Budget"
              />

              <Tab
                className={classes.tab}
                component={Link}
                to="/profile"
                label="Profile"
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* Set cushion below appbar  */}
      <div className={classes.toolbarMargin} />
    </>
  );
}
