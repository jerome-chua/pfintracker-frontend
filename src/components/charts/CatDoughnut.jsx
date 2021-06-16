import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import useStyles from "./styles";
import useCategories from "../../useCategories.js";

export default function CatDoughnut({ type }) {
  const classes = useStyles();
  const { total, catData } = useCategories(type);

  console.log("TOTAL", total);
  console.log("CATDATA", catData);

  return (
    <Card className={type === "Income" ? classes.income : classes.expense}>
      <CardHeader title={type} subheader={"test"} />
      <CardContent>
        <Typography variant="h5">${total}</Typography>
        <Doughnut data={catData} />
      </CardContent>
    </Card>
  );
}
