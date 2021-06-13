import React, { useState, useEffect, cloneElement } from "react";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AccountCircle } from "@material-ui/icons";
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
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleChange = (e, value) => {
    setValue(value);
  };

  // For profile menu
  const handleClick = (e) => {
    console.log(e.currentTarget);
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  // For profile menu
  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  useEffect(() => {
    if (window.location.pathname === "/transactions" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/dashboard" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/budget" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/profile" && value !== 3) {
      setValue(3);
    }
  }, [value]);

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Button
              component={Link}
              to="/"
              onClick={() => {
                setValue(null);
              }}
              className={classes.logoContainer}
              disableRipple
            >
              <Typography variant="h5" color="secondary">
                <img
                  alt="company logo"
                  className={classes.logo}
                  src="./logo.svg"
                />
                <span className={classes.logo}>SAVIFY</span>
              </Typography>
            </Button>
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
                aria-owns={anchorEl ? "profile-menu" : undefined}
                aria-haspopup={anchorEl ? true : undefined}
                onMouseOver={(event) => handleClick(event)}
                className={classes.tab}
                component={Link}
                to="/profile"
                icon={<AccountCircle />}
              />
            </Tabs>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              elevation={0}
              style={{ zIndex: 1300 }}
              keepMounted
            >
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleClose}>Subscription</MenuItem>
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* Set cushion below appbar  */}
      <div className={classes.toolbarMargin} />
    </>
  );
}
