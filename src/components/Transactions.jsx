import React, { useState, useEffect, useContext } from "react";
import { SavifyContext, getCategories, getHashTags } from "../store";
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

  const { dispatch } = useContext(SavifyContext);

  useEffect(() => {
    getCategories(dispatch);
    getHashTags(dispatch);
  }, []);

  const handleCatChange = (evt) => {
    setCategory(evt.target.value);
  };

  const handleTagChange = (evt) => {
    setHashtag(evt.target.value);
  };

  return (
    <>
      <TransactionsModal
        category={category}
        handleCatChange={handleCatChange}
        hashtag={hashtag}
        handleTagChange={handleTagChange}
      />
      <TransactionsTable />
    </>
  );
}
