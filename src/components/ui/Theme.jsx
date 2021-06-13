import { createMuiTheme } from "@material-ui/core/styles";

const brandGreen = "#b6eb7a";
const brandDarkGreen = "#17706e";
const brandOrange = "#fb7813";
const brandBg = "#f7f7ee";

export default createMuiTheme({
  palette: {
    common: {
      green: `${brandGreen}`,
      orange: `${brandOrange}`,
    },
    primary: {
      main: `${brandGreen}`,
    },
    secondary: {
      main: `${brandBg}`,
      green: `${brandDarkGreen}`,
    },
  },
  typography: {
    h5: {
      fontweight: 200,
    },
    tab: {
      fontFamily: "Raleway",
      textTranform: "none",
      fontWeight: 500,
      fontSize: "1rem",
    },
  },
});
