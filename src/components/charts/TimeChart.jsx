import React, { useState, useContext } from "react";
import { SavifyContext, setPeriodChoice } from "../../store.js";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { Line } from "react-chartjs-2";
import useStyles from "./styles";
import useCategories from "../../useCategories.js";

export default function TimeChart({ type, total }) {
  console.log("Time Chart renders");

  const { store, dispatch } = useContext(SavifyContext);
  const { dateRange } = store;
  const classes = useStyles();
  const { timeData } = useCategories(type);
  const [period, setPeriod] = useState("day"); // Sets "day", week", "month"

  const handlePeriod = (evt, newPeriod) => {
    setPeriod(newPeriod);
    setPeriodChoice(dispatch, newPeriod); // Sets "day", week", "month"
  };

  // When you pass the data needed into the chart, you can calculuate the total sum
  // for each category right here:

  return (
    <Card className={type === "Income" ? classes.income : classes.expense}>
      <Grid container justify="space-between">
        <Grid item xs={12}>
          <BrandCardHeader image="../savings.png" extra={"Savings"} />
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
            <Typography variant="h5">${total.toLocaleString()}</Typography>
            <Line data={timeData} />
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
