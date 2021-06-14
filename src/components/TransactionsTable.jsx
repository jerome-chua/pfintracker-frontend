import React, { useContext, useEffect } from "react";
import { SavifyContext, getTransactions } from "../store.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Collapse,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useRowStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TransactionsTable() {
  const classes = useRowStyles();
  const { store, dispatch } = useContext(SavifyContext);
  const { transactions } = store;

  useEffect(() => {
    // TODO: Include userId as second params after dispatch (once Login done)
    getTransactions(dispatch);
  }, []);

  console.log(transactions);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="transactions-table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Note</TableCell>
            <TableCell align="right">Hashtag</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Currency</TableCell>
          </TableRow>
        </TableHead>
        {/* TODO: include Collapsable/Modal to update each transaction */}
        <TableBody>
          {transactions.map((row) => {
            return (
              <TableRow key={row.id.toString()}>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">{row.note}</TableCell>
                <TableCell align="right">{row.hashtag}</TableCell>
                <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
                <TableCell align="right">{row.currency}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
