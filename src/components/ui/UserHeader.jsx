import React from "react";
import { AppBar, Toolbar, useScrollTrigger } from "@material-ui/core";

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

export default function UserHeader(props) {
  return (
    <ElevationScroll>
      <AppBar position="fixed">
        <Toolbar>SAVIFY</Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}
