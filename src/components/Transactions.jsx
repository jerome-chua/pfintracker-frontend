import React, { useState, useEffect, useContext } from "react";
import { SavifyContext, getCategories, getHashTags } from "../store";
import { makeStyles } from "@material-ui/styles";
import TransactionsTable from "./TransactionsTable.jsx";
import TransactionsModal from "./TransactionsModal.jsx";
import IncomeCard from "./IncomeCard.jsx";

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
      currVal.transaction_type === "Expense"
        ? acc - currVal.amount
        : acc + currVal.amount,
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
    <>
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
      <IncomeCard savings={savings} />
      <TransactionsTable />
    </>
  );
}
