import React, { useContext } from "react";
import { SavifyContext } from "../../store.js";
import { Card, CardContent, Box } from "@material-ui/core";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import { Doughnut } from "react-chartjs-2";
import useStyles from "./styles";
import { incomeCategories, expenseCategories } from "../ui/categoryStyles.js";
import moment from "moment";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useN03TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n03";

const fixedDecimal = (x) => {
  return Number(Number.parseFloat(x).toFixed(2));
};

const strFormat = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export default function CatDoughnut({ type }) {
  const classes = useStyles();
  const { store } = useContext(SavifyContext);
  const { transactions, dateRange } = store;
  const { startDate, endDate } = dateRange;

  const styles = useN03TextInfoContentStyles();

  const momentStart = strFormat(startDate);
  const momentEnd = strFormat(endDate);

  // Filter for income | expense
  const chosenTransacts = transactions.filter((row) => {
    return row.transactionType === type;
  });

  // Calculate total amount for income | expense
  const total = chosenTransacts.reduce(
    (acc, currVal) => (acc += currVal.amount),
    0
  );

  const filteredTransactions = chosenTransacts.filter((currVal) => {
    return moment(strFormat(currVal.createdAt)).isBetween(
      momentStart,
      momentEnd
    );
  });

  const filteredTotal = filteredTransactions.reduce(
    (acc, currVal) =>
      currVal.transactionType === type
        ? acc + currVal.amount
        : acc - currVal.amount,
    0
  );

  // Filter for income | expense typed categories
  const categories = type === "Income" ? incomeCategories : expenseCategories;
  chosenTransacts.forEach((transaction) => {
    // Return first category found
    const category = categories.find(
      (cat) => cat.category === transaction.category
    );
    // Increment each category amount for income | expense type
    if (category) {
      category.amount += transaction.amount;
    }
  });

  // Leave out categories with $0 in doughtnut chart display
  const filteredCategories = categories.filter((cat) => cat.amount > 0);

  const catData = {
    datasets: [
      {
        data: filteredCategories.map((cat) => cat.amount),
        backgroundColor: filteredCategories.map((cat) => cat.color),
      },
    ],
    labels: filteredCategories.map((cat) => cat.category),
  };

  return (
    <Card className={type === "Income" ? classes.income : classes.expense}>
      <BrandCardHeader
        image={type === "Income" ? "../profit.png" : "../loss.png"}
        extra={`Total ${type}: $${fixedDecimal(total).toLocaleString()}`}
      />
      <CardContent>
        <Box mb={2}>
          <TextInfoContent
            classes={styles}
            overline={"During selected period"}
            heading={`$${fixedDecimal(filteredTotal).toLocaleString()}`}
          />
        </Box>
        <Box m={5}>
          <Doughnut data={catData} />
        </Box>
      </CardContent>
    </Card>
  );
}
