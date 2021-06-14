import React, { useState } from "react";
import { Modal, Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AddBox } from "@material-ui/icons";

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
}));

export default function TransactionsModal() {
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
          <h5>Category</h5>
        </Grid>
        <Grid item className={classes.header}>
          <h5>Date</h5>
        </Grid>
        <Grid item className={classes.header}>
          <h5>Note</h5>
        </Grid>
        <Grid item className={classes.header}>
          <h5>Hashtag</h5>
        </Grid>
        <Grid item className={classes.header}>
          <h5>Amount</h5>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField variant="outlined" />
          </form>
        </Grid>
        <Grid item className={classes.header}>
          <h5>Currency</h5>
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