import React, { useContext, useEffect, useState } from "react";
import { SavifyContext, getTransactions } from "../store.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
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
import moment from "moment";

const useRowStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

export default function TransactionsTable() {
  const classes = useRowStyles();
  const { store, dispatch } = useContext(SavifyContext);
  const { transactions } = store;
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // TODO: Include userId as second params after dispatch (once Login done)
    getTransactions(dispatch);
  }, [transactions.length]);

  const handleClick = (evt, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (evt, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (evt) => {
    setRowsPerPage(parseInt(evt.target.value, 10));
    setPage(0);
  };

  return (
    <Box mt={3} m={1}>
      <Paper className={classes.paper}>
        <TransactionsTableToolBar
          numSelected={selected.length}
          selected={selected}
          setSelected={(payload) => setSelected(payload)}
        />
        <TableContainer>
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
              {transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      key={row.id.toString()}
                      aria-checked={isItemSelected}
                      onClick={(event) => handleClick(event, row.id)}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell align="right">
                        {moment(row.createdAt).format("do MMM YYYY")}
                      </TableCell>
                      <TableCell align="right">{row.note}</TableCell>
                      <TableCell align="right">{row.hashtag}</TableCell>
                      <TableCell align="right">
                        {"$" + row.amount.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{row.currency}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, { value: -1, label: "All" }]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
