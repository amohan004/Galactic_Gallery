import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const containerStyles = makeStyles((theme: Theme) => ({
  pageContent: {
    background: theme.palette.background.paper,
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
}));
