import { Box, Typography, Grid, IconButton } from "@mui/material";
import React from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const MediaDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const title = decodeURIComponent(searchParams.get("title") || "");
  const description = decodeURIComponent(searchParams.get("description") || "");
  const imageUrl = decodeURIComponent(searchParams.get("imageUrl") || "");

  const goBack = () => {
    navigate("/", { state: location.state });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        onClick={goBack}
        size="medium"
      >
        <ArrowBackIosIcon />
        Back
      </IconButton>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              position: "relative",
              paddingTop: "56.25%",
              overflow: "hidden",
            }}
          >
            <img
              src={imageUrl}
              alt={title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{description}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MediaDetails;
