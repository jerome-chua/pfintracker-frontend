import React from "react";
import { Box } from "@material-ui/core";
import DateRangeModal from "./DateRangeModal.jsx";
import TransactionsModal from "./TransactionsModal.jsx";

export default function Dashboard() {
  return (
    <Box>
      <DateRangeModal />
    </Box>
  );
}
