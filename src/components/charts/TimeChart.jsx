import React, { useState } from "react";
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

export default function CatDoughnut({ type }) {
  const classes = useStyles();
  const { total, timeData } = useCategories(type);
  const [period, setPeriod] = useState("month");

  const roundTotal = parseInt(total.toFixed(2));

  const handlePeriod = (evt, newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <Card className={type === "Income" ? classes.income : classes.expense}>
      <Grid container justify="space-between">
        <Grid item xs={6}>
          <CardHeader title={type} subheader={type} />
        </Grid>
        <Grid item xs={6}>
          <ToggleButtonGroup value={period} onChange={handlePeriod} exclusive>
            <ToggleButton value="day" aria-label="day">
              Day
            </ToggleButton>
            <ToggleButton value="week" aria-label="week">
              Week
            </ToggleButton>
            <ToggleButton value="month" aria-label="month">
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
