import React, { useEffect, useContext } from "react";
import { SavifyContext, getTransactions } from "../store";
import { Grid, Box } from "@material-ui/core";
import DateRangeModal from "./DateRangeModal.jsx";
import CatDoughnut from "./charts/CatDoughnut.jsx";
import TimeChart from "./charts/TimeChart.jsx";

export default function Dashboard() {
  const { store, dispatch } = useContext(SavifyContext);
  const { transactions } = store;

  useEffect(() => {
    getTransactions(dispatch);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box m={1}>
          <DateRangeModal />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box m={1}>
          <TimeChart />
        </Box>
      </Grid>
      <Grid item xs={10} md={4}>
        <Box m={2}>
          <CatDoughnut type="Expense" />
        </Box>
      </Grid>
      <Grid item xs={10} md={4}>
        <Box m={2}>
          <CatDoughnut type="Income" />
        </Box>
      </Grid>
    </Grid>
  );
}
