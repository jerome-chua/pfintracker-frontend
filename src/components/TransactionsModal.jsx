import React, { useState, useContext } from "react";
import { SavifyContext, addTransaction } from "../store";
import { Modal, Button, Grid, TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AddBox } from "@material-ui/icons";
import Datepicker from "./Datepicker.jsx";
import NumberField from "./NumberField.jsx";

function getModalPos() {
  const top = 25;
  const left = 35;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "66.7%",
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2, 4, 3),
    borderRadius: "20px",
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
  buttonDisabled: {
    fontFamily: "Raleway",
    margin: theme.spacing(1),
    backgroundColor: "grey",
    color: "#F6F6F6",
  },
  header: {
    fontFamily: "Raleway",
    color: "grey",
    fontWeight: 100,
  },
  field: {
    ...theme.modalField,
  },
  currencyField: {
    width: 100,
  },
}));

export default function TransactionsModal({
  category,
  handleCatChange,
  selectedDate,
  handleDateChange,
  hashtag,
  handleTagChange,
  amount,
  handleAmtChange,
  transactionData,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalPos);
  const [open, setOpen] = useState(false);
  const { store, dispatch } = useContext(SavifyContext);
  const { categories, hashtags } = store;

  const handleOpen = () => {
    handleAmtChange(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendData = () => {
    addTransaction(dispatch, transactionData);
    setOpen(false);
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container direction="row" spacing={3} alignItems="center">
        <Grid item className={classes.header}>
          <h5>Category</h5>
          <div>
            <TextField
              className={classes.field}
              select
              value={category}
              onChange={handleCatChange}
              variant="outlined"
              label="Select Category"
            >
              {categories.map((cat, index) => (
                <MenuItem key={index.toString()} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>
        <Grid item className={classes.header}>
          <h5>Date</h5>
          <Datepicker
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
          />
        </Grid>
        <Grid item className={classes.header}>
          <h5>Note</h5>
          <TextField
            className={classes.field}
            id="note-text"
            variant="outlined"
          />
        </Grid>
        <Grid item className={classes.header}>
          <h5>Hashtag</h5>
          <TextField
            className={classes.field}
            select
            value={hashtag}
            onChange={handleTagChange}
            variant="outlined"
            label="Select Hashtag"
          >
            {hashtags.map((tag, index) => (
              <MenuItem key={index.toString()} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item className={classes.header}>
          <h5>Amount</h5>
          <NumberField handleAmtChange={handleAmtChange} />
        </Grid>
        <Grid item className={classes.header}>
          <h5>Currency</h5>
          <TextField
            className={classes.currencyField}
            defaultValue="SGD"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>

      <Grid container direction="row" justify="flex-end" spacing={5}>
        <Grid item>
          <Button
            className={
              category && amount ? classes.button : classes.buttonDisabled
            }
            disabled={category && amount ? false : true}
            onClick={sendData}
          >
            Add Transaction
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<AddBox />}
        onClick={handleOpen}
      >
        Add Transaction
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {modalBody}
      </Modal>
    </>
  );
}
