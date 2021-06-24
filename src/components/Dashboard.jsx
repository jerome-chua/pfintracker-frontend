import React, { useEffect, useContext } from "react";
import {
  SavifyContext,
  getTransactions,
  runLoader,
  hideLoader,
} from "../store";
import { Grid, Box } from "@material-ui/core";
import DateRangeModal from "./DateRangeModal.jsx";
import CatDoughnut from "./charts/CatDoughnut.jsx";
import TimeChart from "./charts/TimeChart.jsx";

// Calculate total of account balance
const calcSavings = (transactions) => {
  const total = transactions.reduce(
    (acc, currVal) =>
      currVal.transactionType === "Income"
        ? acc + currVal.amount
        : acc - currVal.amount,
    0
  );
  return total;
};

export default function Dashboard() {
  const { dispatch } = useContext(SavifyContext);

  const getData = () => {
    runLoader(dispatch);
    getTransactions(dispatch, () => {
      setTimeout(() => {
        hideLoader(dispatch);
      }, 2200);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Box m={1}>
          <DateRangeModal />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box m={1}>
          <TimeChart type="Income" />
        </Box>
      </Grid>
      <Grid item xs={10} md={6}>
        <Box m={1} my={3}>
          <CatDoughnut type="Expense" />
        </Box>
      </Grid>
      <Grid item xs={10} md={6}>
        <Box m={1} my={3}>
          <CatDoughnut type="Income" />
        </Box>
      </Grid>
    </Grid>
  );
}
