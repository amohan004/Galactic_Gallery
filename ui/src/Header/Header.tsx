import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import logoImage from "../assets/Nasa.png";
import { styles } from "./style";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const classes = styles();

  return (
    <AppBar className={classes.header} position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
          <img
            src={logoImage}
            alt="Logo"
            style={{ width: 100, height: "auto" }}
          />
          <Typography
            style={{ textTransform: "uppercase", fontWeight: "bold" }}
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
