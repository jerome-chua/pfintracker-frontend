import React, { useState } from "react";
import { Modal, Button } from "@material-ui/core";
import { DateRange } from "@material-ui/icons";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useTheme } from "@material-ui/core/styles";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";

export default function DateRangeModal() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [dateRng, setDateRng] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "range",
    },
  ]);

  const modalBody = (
    <DateRangePicker
      onChange={(date) => setDateRng([date.range])}
      rangeColors={[theme.palette.primary.main]}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={1}
      ranges={dateRng}
      direction="horizontal"
    />
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
