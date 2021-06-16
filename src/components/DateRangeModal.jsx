import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useTheme } from "@material-ui/core/styles";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangeModal() {
  const theme = useTheme();

  const [dateRng, setDateRng] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "range",
    },
  ]);

  console.log(dateRng);

  return (
    <>
      <DateRangePicker
        onChange={(date) => setDateRng([date.range])}
        rangeColors={[theme.palette.primary.main]}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={dateRng}
        direction="horizontal"
      />
    </>
  );
}
