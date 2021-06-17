import React, { useState, useContext, useEffect } from "react";
import { SavifyContext, setDates } from "../store.js";
import { Modal, Button } from "@material-ui/core";
import { DateRange } from "@material-ui/icons";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
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
    minWidth: 550,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2, 4, 3),
    borderRadius: "20px",
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Set to current month? aka 30 days
  const [dateRng, setDateRng] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "range",
    },
  ]);

  useEffect(() => {
    const daysDiff = calcDiff(dateRng[0].startDate, dateRng[0].endDate);
    setDates(dispatch, { ...dateRng[0], daysDiff });
  }, [dateRng]);

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
        className={theme.palette.secondary.green}
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
