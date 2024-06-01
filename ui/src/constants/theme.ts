import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00529F",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F6F6F6",
    },
    secondary: {
      main: "#FFFFFF",
      light: "#0065FF",
    },
    text: {
      primary: "#2C2A29",
    },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
});

export default theme;
