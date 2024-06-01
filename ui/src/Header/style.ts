import { makeStyles } from "@mui/styles";

export const styles = makeStyles(() => ({
  header: {
    width: "100%",
    display: "flex",
    background: "#ffffff",
    "@media (max-width:959px)": {
      padding: "0 15px",
      height: "100%",
    },
  },
}));
