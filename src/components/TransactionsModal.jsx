import React, { useState } from "react";
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
  categories,
  handleCatChange,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalPos);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container direction="row" spacing={2}>
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
          <Datepicker className={classes.field} />
        </Grid>
        <Grid item className={classes.header}>
          <h5>Note</h5>
        </Grid>
        <Grid item className={classes.header}>
          <h5>Hashtag</h5>
        </Grid>
        <Grid item className={classes.header}>
          <h5>Amount</h5>
          <NumberField className={classes.field} />
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

      <Grid container direction="row" justify="flex-end">
        <Grid item>
          <Button>Add Transaction</Button>
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
