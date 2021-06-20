import React, { useContext, useEffect, useState } from "react";
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
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TransactionsTableToolBar from "./TransactionsTableToolBar.jsx";

const useRowStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TransactionsTable() {
  const classes = useRowStyles();
  const { store, dispatch } = useContext(SavifyContext);
  const { transactions } = store;
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    // TODO: Include userId as second params after dispatch (once Login done)
    getTransactions(dispatch);
  }, [transactions.length]);

  const handleClick = (evt, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box mt={3} m={1}>
      <TransactionsTableToolBar numSelected={5} />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="transactions-table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Note</TableCell>
              <TableCell align="right">Hashtag</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Currency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  key={row.id.toString()}
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </TableCell>
                  <TableCell align="left">{row.category}</TableCell>
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
    </Box>
  );
}
