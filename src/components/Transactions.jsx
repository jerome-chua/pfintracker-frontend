import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";
import TransactionsTable from "./TransactionsTable.jsx";
import TransactionsModal from "./TransactionsModal.jsx";

const useStyles = makeStyles((theme) => ({
  table: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Transactions() {
  const classes = useStyles();

  return (
    <>
      {/* <Button
        variant="contained"
        color="green"
        className={classes.button}
        startIcon={<AddBox />}
      >
        Add Transaction
      </Button> */}
      <TransactionsModal />

      <TransactionsTable />
    </>
  );
}
