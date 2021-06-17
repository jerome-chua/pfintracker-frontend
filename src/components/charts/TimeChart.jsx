import React, { useState, useContext, useEffect } from "react";
import { SavifyContext, setPeriodChoice } from "../../store.js";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { Line } from "react-chartjs-2";
import useStyles from "./styles";
import useCategories from "../../useCategories.js";

// PUTTING SOMETHING IN LOCAL STATE IS TO DEFAULT,
// TO ORGANISE HIERARCHY OF DATA

export default function TimeChart({ type }) {
  console.log("Time Chart renders");

  const { store, dispatch } = useContext(SavifyContext);
  const { dateRange } = store;
  const classes = useStyles();
  const { total, timeData } = useCategories(type);
  const [period, setPeriod] = useState("month"); // Sets "day", week", "month"

  const roundTotal = parseInt(total.toFixed(2));

  // useEffect(() => {
  //   setPeriodChoice(dispatch, period);
  // }, [period]);

  const handlePeriod = (evt, newPeriod) => {
    setPeriod(newPeriod);
    setPeriodChoice(dispatch, newPeriod); // Sets "day", week", "month"
  };

  // When you pass the data needed into the chart, you can calculuate the total sum
  // for each category right here:

  return (
    <Card className={type === "Income" ? classes.income : classes.expense}>
      <Grid container justify="space-between">
        <Grid item xs={6}>
          <CardHeader title={type} subheader={type} />
        </Grid>
        <Grid item xs={6}>
          <ToggleButtonGroup value={period} onChange={handlePeriod} exclusive>
            <ToggleButton
              value="day"
              aria-label="day"
              disabled={dateRange.daysDiff > 50 ? true : false}
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
            <Typography variant="h5">${roundTotal.toLocaleString()}</Typography>
            <Line data={timeData} />
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
