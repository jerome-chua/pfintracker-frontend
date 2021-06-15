import React, { useState, useEffect, useContext } from "react";
import {
  SavifyContext,
  getCategories,
  getHashTags,
  addTransaction,
} from "../store";
import { makeStyles } from "@material-ui/styles";
import TransactionsTable from "./TransactionsTable.jsx";
import TransactionsModal from "./TransactionsModal.jsx";

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

  const { dispatch } = useContext(SavifyContext);

  useEffect(() => {
    getCategories(dispatch);
    getHashTags(dispatch);
  }, []);

  // Category
  const handleCatChange = (evt) => {
    setCategory(evt.target.value);
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
    // date,
    note,
    amount,
    hashtag,
  };

  // If button is green && clicked.
  if (amount) {
    addTransaction(dispatch, transactionData);
  }

  return (
    <>
      <TransactionsModal
        category={category}
        handleCatChange={handleCatChange}
        hashtag={hashtag}
        handleTagChange={handleTagChange}
        amount={amount}
        handleAmtChange={handleAmtChange}
      />
      <TransactionsTable />
    </>
  );
}
