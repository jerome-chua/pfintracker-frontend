import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  field: {
    ...theme.modalField,
  },
}));

export default function Datepicker({ selectedDate, handleDateChange }) {
  const classes = useStyles();

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          className={classes.field}
          variant="inline"
          inputVariant="outlined"
          format="MM/dd/yyy"
          id="date-picker"
          label="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        ></KeyboardDatePicker>
      </MuiPickersUtilsProvider>
    </>
  );
}
