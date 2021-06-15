import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useN03TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n03";
import { useLightTopShadowStyles } from "@mui-treasury/styles/shadow/lightTop";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 300,
    borderRadius: 20,
  },
  content: {
    padding: 20,
  },
}));

export default function InfoCard() {
  const styles = useN03TextInfoContentStyles();
  const shadowStyles = useLightTopShadowStyles();
  const cardStyles = useStyles();

  return (
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <BrandCardHeader image="../profit.png" extra={"Last updated: "} />
      <CardContent className={cardStyles.content}>
        <TextInfoContent
          classes={styles}
          overline={"Expense"}
          heading={"React"}
        />
      </CardContent>
    </Card>
  );
}
