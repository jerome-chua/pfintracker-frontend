import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import useStyles from "./styles";

export default function CatDoughnut() {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader>
        <Typography></Typography>
        <Doughnut />
      </CardHeader>
    </Card>
  );
}
