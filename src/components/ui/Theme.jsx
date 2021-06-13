import { createMuiTheme } from "@material-ui/core/styles";

const brandGreen = "#b6eb7a";
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
    },
  },
  typography: {
    h5: {
      fontweight: 200,
    },
  },
});
