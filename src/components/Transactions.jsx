import React, { useState, useEffect, useContext } from "react";
import { SavifyContext, getCategories, getHashTags } from "../store";
import { makeStyles } from "@material-ui/styles";
import { Grid, Box } from "@material-ui/core";
import TransactionsTable from "./TransactionsTable.jsx";
import TransactionsModal from "./TransactionsModal.jsx";
import SavingsCard from "./SavingsCard.jsx";
import ExpenseCard from "./ExpenseCard.jsx";
import CatDoughnut from "./charts/CatDoughnut.jsx";

// const useStyles = makeStyles((theme) => ({
//   table: {
//     backgroundColor: theme.palette.secondary.main,
//   },
// }));

export default function Transactions() {
  // const classes = useStyles();
  const [category, setCategory] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmt] = useState();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const { store, dispatch } = useContext(SavifyContext);
  const { transactions } = store;

  const savings = transactions.reduce(
    (acc, currVal) =>
      currVal.transactionType === "Income"
        ? acc + currVal.amount
        : acc - currVal.amount,
    0
  );

  const filterExpense = transactions.filter(
    (transaction) => transaction.transactionType === "Expense"
  );

  const expenses = filterExpense.reduce(
    (acc, currVal) =>
      currVal.transactionType === "Expense"
        ? acc + currVal.amount
        : acc - currVal.amount,
    0
  );

  useEffect(() => {
    getCategories(dispatch);
    getHashTags(dispatch);
  }, []);

  // Category
  const handleCatChange = (evt) => {
    setCategory(evt.target.value);
  };

  // Date
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Hashtag
  const handleTagChange = (evt) => {
    setHashtag(evt.target.value);
  };

  // Amount
  const handleAmtChange = (val) => {
    setAmt(val);
  };

  const transactionData = {
    category,
    selectedDate,
    note,
    amount: parseFloat(amount),
    hashtag,
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TransactionsModal
          category={category}
          handleCatChange={handleCatChange}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          hashtag={hashtag}
          handleTagChange={handleTagChange}
          amount={amount}
          handleAmtChange={handleAmtChange}
          transactionData={transactionData}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <SavingsCard savings={parseInt(savings.toFixed(2))} />
      </Grid>

      <Grid item xs={12} md={3}>
        <ExpenseCard expenses={parseInt(expenses.toFixed(2))} />
      </Grid>

      <Grid item xs={12}>
        <TransactionsTable />
      </Grid>
    </Grid>
  );
}
