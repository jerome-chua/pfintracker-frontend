import React, { useState, useEffect, useContext } from "react";
import { SavifyContext, getCategories, getHashTags } from "../store";
import { Grid, Box } from "@material-ui/core";
import TransactionsTable from "./TransactionsTable.jsx";
import TransactionsModal from "./TransactionsModal.jsx";
import SavingsCard from "./SavingsCard.jsx";
import ExpenseCard from "./ExpenseCard.jsx";

export default function Transactions() {
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

  // DOES THIS HAVE TO BE STORED HERE IN THE PARENT?, IF NOT, PUT ALL OF THESE STATE INTO THE MODAL.
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
        <Box m={1}>
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
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Box m={1}>
          <SavingsCard savings={parseInt(savings.toFixed(2))} />
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Box m={1}>
          <ExpenseCard expenses={parseInt(expenses.toFixed(2))} />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box m={1}>
          <TransactionsTable />
        </Box>
      </Grid>
    </Grid>
  );
}
