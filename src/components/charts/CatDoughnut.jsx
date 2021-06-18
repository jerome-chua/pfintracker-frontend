import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import { Doughnut } from "react-chartjs-2";
import useStyles from "./styles";
import useCategories from "../../useCategories.js";

export default function CatDoughnut({ type }) {
  const classes = useStyles();
  const { total, catData } = useCategories(type);

  const roundTotal = parseInt(total.toFixed(2));

  return (
    <Card className={type === "Income" ? classes.income : classes.expense}>
      <BrandCardHeader
        image={type === "Income" ? "../profit.png" : "../loss.png"}
        extra={type}
      />
      <CardContent>
        <Typography variant="h5">${roundTotal.toLocaleString()}</Typography>
        <Doughnut data={catData} />
      </CardContent>
    </Card>
  );
}
