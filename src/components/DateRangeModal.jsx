import React, { useState, useContext, useEffect } from "react";
import { SavifyContext, setDates } from "../store.js";
import { Modal, Button } from "@material-ui/core";
import { DateRange } from "@material-ui/icons";
import { DateRangePicker } from "react-date-range";
import { addDays, addMonths } from "date-fns";
import { useTheme } from "@material-ui/core/styles";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

function getModalPos() {
  const top = 30;
  const left = 45;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    width: "33.3%",
    minWidth: 580,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2, 4, 3),
    borderRadius: "25px",
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

const formatDate = (date) => {
  const year = moment(date).format("YYYY");
  const month = moment(date).format("MM");
  const day = moment(date).format("DD");
  const dateFormat = [year, month, day].map((i) => parseInt(i));

  return moment(dateFormat);
};

const calcDiff = (start, end) => {
  start = formatDate(start);
  end = formatDate(end);

  const diff = Math.ceil(end.diff(start, "days", true));

  return diff;
};

export default function DateRangeModal() {
  const { store, dispatch } = useContext(SavifyContext);
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalPos);
  const [dateRng, setDateRng] = useState([
    {
      startDate: new Date(2021, 0, 1),
      endDate: addMonths(new Date(2021, 0, 1), 1),
      key: "range",
    },
  ]);

  useEffect(() => {
    const daysDiff = calcDiff(dateRng[0].startDate, dateRng[0].endDate);
    setDates(dispatch, { ...dateRng[0], daysDiff });
  }, [dateRng]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <DateRangePicker
        onChange={(date) => setDateRng([date.range])}
        rangeColors={[theme.palette.primary.main]}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={dateRng}
        direction="horizontal"
      />
    </div>
  );

  const start = moment(dateRng[0].startDate).format("D MMM, YYYY");
  const end = moment(dateRng[0].endDate).format("D MMM, YYYY");

  return (
    <>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<DateRange />}
        onClick={handleOpen}
      >
        {`${start} - ${end}`}
      </Button>
      <Modal open={open} onClose={handleClose}>
        {modalBody}
      </Modal>
    </>
  );
}
