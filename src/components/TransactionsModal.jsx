import React, { useState } from "react";
import { Modal, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AddBox } from "@material-ui/icons";

function getModalPos() {
  const top = 40;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2, 4, 3),
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
      <h2>Text in a modal</h2>
      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
    </div>
  );

  return (
    <>
      <Button
        variant="contained"
        color="green"
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
