import React, { useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useRowStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TransactionsTable() {
  const classes = useRowStyles();

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
        <TableBody>{/* TODO: useEffect to get rows here */}</TableBody>
      </Table>
    </TableContainer>
  );
}
