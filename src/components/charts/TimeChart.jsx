import React, { useState, useContext } from "react";
import { SavifyContext, setPeriodChoice } from "../../store.js";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { Line } from "react-chartjs-2";
import useStyles from "./styles";
import useCategories from "../../useCategories.js";
import moment from "moment";

const fixedDecimal = (x) => {
  return Number(Number.parseFloat(x).toFixed(2));
};

const strFormat = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export default function TimeChart({ type }) {
  const { store, dispatch } = useContext(SavifyContext);
  const { transactions, dateRange } = store;
  const { startDate, endDate } = dateRange;
  const classes = useStyles();
  const { timeData } = useCategories(type);
  const [period, setPeriod] = useState("day"); // Sets "day", week", "month"

  const handlePeriod = (evt, newPeriod) => {
    setPeriod(newPeriod);
    setPeriodChoice(dispatch, newPeriod); // Sets "day", week", "month"
  };

  const options = {
    scales: {
      yAxes: [{ ticks: { beginAtZero: true, fontSize: 16 } }],
      xAxes: [{ ticks: { beginAtZero: true, fontSize: 16 } }],
    },
  };

  const momentStart = strFormat(startDate);
  const momentEnd = strFormat(endDate);

  // Calculate total amount for income | expense
  const total = transactions.reduce(
    (acc, currVal) =>
      currVal.transactionType === "Income"
        ? acc + currVal.amount
        : acc - currVal.amount,
    0
  );

  const filteredTransactions = transactions.filter((currVal) => {
    return moment(strFormat(currVal.createdAt)).isBetween(
      momentStart,
      momentEnd
    );
  });

  const filteredTotal = filteredTransactions.reduce(
    (acc, currVal) =>
      currVal.transactionType === "Income"
        ? acc + currVal.amount
        : acc - currVal.amount,
    0
  );

  return (
    <Card className={type === "Income" ? classes.income : classes.expense}>
      <Grid container justify="space-between">
        <Grid item xs={12}>
          <BrandCardHeader
            image="../savings.png"
            extra={`Total Savings: $${fixedDecimal(total).toLocaleString()}`}
          />
        </Grid>
        <Grid container xs={11} justify="flex-end">
          <ToggleButtonGroup value={period} onChange={handlePeriod} exclusive>
            <ToggleButton
              value="day"
              aria-label="day"
              disabled={dateRange.daysDiff > 70 ? true : false}
            >
              Day
            </ToggleButton>
            <ToggleButton
              value="week"
              aria-label="week"
              disabled={dateRange.daysDiff < 7 ? true : false}
            >
              Week
            </ToggleButton>
            <ToggleButton
              value="month"
              aria-label="month"
              disabled={dateRange.daysDiff < 31 ? true : false}
            >
              Month
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="h6">
              During this period: $
              {fixedDecimal(filteredTotal).toLocaleString()}
            </Typography>
            <Line data={timeData} options={options} />
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
