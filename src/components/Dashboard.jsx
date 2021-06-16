import React from "react";
import { Grid, Box } from "@material-ui/core";
import DateRangeModal from "./DateRangeModal.jsx";

export default function Dashboard() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box m={1}>
          <DateRangeModal />
        </Box>
      </Grid>
    </Grid>
  );
}
