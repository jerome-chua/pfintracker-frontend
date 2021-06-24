import React, { useState, useContext } from "react";
import cx from "clsx";
import { SavifyContext, setPeriodChoice } from "../../store.js";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  LinearProgress,
} from "@material-ui/core";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { Line } from "react-chartjs-2";
import moment from "moment";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useN03TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n03";
import { useLightTopShadowStyles } from "@mui-treasury/styles/shadow/lightTop";

const fixedDecimal = (x) => {
  return Number(Number.parseFloat(x).toFixed(2));
};

const strFormat = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    borderRadius: 20,
    padding: 15,
    margin: 10,
  },
  content: {
    padding: 20,
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  paper: {
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "black",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export default function TimeChart({ type }) {
  const { store, dispatch } = useContext(SavifyContext);
  const { transactions, dateRange, loading } = store;
  const styles = useN03TextInfoContentStyles();
  const shadowStyles = useLightTopShadowStyles();
  const cardStyles = useStyles();
  const [period, setPeriod] = useState("day"); // Sets "day", week", "month"

  const handlePeriod = (evt, newPeriod) => {
    setPeriod(newPeriod);
    setPeriodChoice(dispatch, newPeriod);
  };

  const labels = [];
  const dataPoints = [];
  let startDate = moment(dateRange.startDate);
  let endDate = moment(dateRange.endDate);

  // Calculate total income/expense based on day/month/week
  const tally = (labelDate, periodChoice) => {
    let totalSavings;

    const matchedTransacts = transactions.filter((row) =>
      moment(row.createdAt, "YYYY-MM-DD").isSame(
        moment(labelDate, "YYYY-MM-DD"),
        periodChoice
      )
    );

    totalSavings = matchedTransacts.reduce(
      (acc, currVal) =>
        currVal.transactionType === "Income"
          ? acc + currVal.amount
          : acc - currVal.amount,
      0
    );
    return totalSavings;
  };

  // Set labels & data points of time char according to user choice
  if (period === "month") {
    while (
      moment(dateRange.endDate, "DD-MM-YYYY").add("month", 1) > startDate
    ) {
      // Labels
      const eachMonthLabel = moment(startDate).format("MMM 'YY");
      labels.push(eachMonthLabel);

      // Data
      dataPoints.push(tally(startDate, "month"));
      startDate.add(1, "month");
    }
  } else if (period === "week") {
    while (moment(dateRange.endDate, "DD-MM-YYYY").add("days", 7) > startDate) {
      // Labels
      const weekStart = startDate.startOf("week").format("DD MMM").toString();
      const weekEnd = startDate.endOf("week").format("DD MMM").toString();
      const eachWeekLabel = `${weekStart} - ${weekEnd}`;
      labels.push(eachWeekLabel);

      // Data
      dataPoints.push(tally(startDate, "week"));
      startDate.add(7, "days");
    }
  } else {
    while (endDate > startDate) {
      // Labels
      const eachDay = moment(startDate).format("YYYY-MM-DD");
      labels.push(eachDay);

      // Data
      dataPoints.push(tally(eachDay, "day"));
      startDate.add(1, "days");
    }
  }

  const cumulative = [];
  dataPoints.reduce((a, b, i) => {
    return (cumulative[i] = a + b);
  }, 0);

  // Day/Week/Month Data
  const timeData = {
    labels: labels,
    datasets: [
      {
        label: "Savings",
        data: cumulative,
        fill: true,
        backgroundColor: "rgb(23, 112, 110, 0.2)",
        borderColor: "rgb(23, 112, 110, 0.8)",
        pointHoverBorderWidth: 7,
        pointRadius: 0,
        pointHitRadius: 30,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [{ ticks: { beginAtZero: true, fontSize: 16 } }],
      xAxes: [{ ticks: { beginAtZero: true, fontSize: 16 } }],
    },
  };

  const momentStart = strFormat(dateRange.startDate);
  const momentEnd = strFormat(dateRange.endDate);

  // Calculate total amount for income | expense
  const total = transactions.reduce(
    (acc, currVal) =>
      currVal.transactionType === "Income"
        ? acc + currVal.amount
        : acc - currVal.amount,
    0
  );

  // Filter transactions based on selected date range
  const filteredTransactions = transactions.filter((currVal) => {
    return moment(strFormat(currVal.createdAt)).isBetween(
      momentStart,
      momentEnd
    );
  });

  // Calculate savings where income minus expense
  const filteredTotal = filteredTransactions.reduce(
    (acc, currVal) =>
      currVal.transactionType === "Income"
        ? acc + currVal.amount
        : acc - currVal.amount,
    0
  );

  return (
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <Grid container justify="space-between">
        <Grid item xs={12}>
          <BrandCardHeader
            image="../savings.png"
            extra={`Total Savings: $${fixedDecimal(total).toLocaleString()}`}
          />
        </Grid>
        <Grid container xs={12} justify="flex-end">
          <Box mr={4}>
            <Paper elevation={0} className={cardStyles.paper}>
              <StyledToggleButtonGroup
                value={period}
                onChange={handlePeriod}
                exclusive
              >
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
              </StyledToggleButtonGroup>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CardContent>
            <TextInfoContent
              classes={styles}
              overline={"During selected period"}
              heading={`$
              ${fixedDecimal(filteredTotal).toLocaleString()}`}
            />
            <Box m={2}>
              {loading ? (
                <LinearProgress />
              ) : (
                <Line data={timeData} options={options} />
              )}
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
