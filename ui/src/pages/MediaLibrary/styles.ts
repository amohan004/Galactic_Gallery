import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const containerStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
}));

export const styles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
  },

  toolbar: {
    justifyContent: "space-between",
  },

  logo: {
    width: 100,
    height: "auto",
  },

  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    flexGrow: 1,
    textAlign: "center",
  },
}));

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },

  paragraphContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginLeft: "40rem",
  },

  centeredText: {
    textAlign: "center",
  },

  filtersContainer: {
    position: "fixed",
    top: "64px",
    left: 0,
    right: 0,
    width: "300px",
    backgroundColor: theme.palette.background.paper,
    zIndex: 1000,
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginTop: "20px",
    height: "100%",
  },

  form: {
    marginBottom: theme.spacing(2),
  },

  buttonGrid: {
    display: "flex",
    justifyContent: "center",
  },

  imageContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: "64px",
    padding: theme.spacing(2),
  },

  imageGrid: {
    marginTop: theme.spacing(2),
  },

  imageItem: {
    width: "calc(33.333% - 20px)",
    boxSizing: "border-box",
  },

  imageItemSkeleton: {
    display: "flex",
    alignItems: "center",
    width: "250px",
    height: "250px",
    maxWidth: "250px",
    maxHeight: "250px",
  },

  image: {
    width: "100%",
    height: "100%",
    maxWidth: "250px",
    maxHeight: "250px",
    objectFit: "cover",
  },

  imageTitle: {
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
}));
