import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";
import TransactionsTable from "./TransactionsTable.jsx";

const useStyles = makeStyles((theme) => ({
  table: {
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    fontFamily: "Raleway",
    margin: theme.spacing(1),
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
}));

export default function Transactions() {
  const classes = useStyles();

  return (
    <>
      <Button
        variant="contained"
        color="green"
        className={classes.button}
        startIcon={<AddBox />}
      >
        Add Transaction
      </Button>

      <TransactionsTable />
    </>
  );
}
