import React, { useState, useEffect, useContext } from "react";
import { SavifyContext, getCategories } from "../store";
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
  const { store, dispatch } = useContext(SavifyContext);
  const { categories } = store;

  useEffect(() => {
    getCategories(dispatch);
  });

  const handleCatChange = (evt) => {
    setCategory(evt.target.value);
  };

  return (
    <>
      <TransactionsModal
        category={category}
        categories={categories}
        handleCatChange={handleCatChange}
      />
      <TransactionsTable />
    </>
  );
}
