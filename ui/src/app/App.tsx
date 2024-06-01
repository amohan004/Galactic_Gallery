import { Container, CssBaseline, Grid } from "@mui/material";
import Header from "../Header/Header";
import MediaLibrary from "../pages/MediaLibrary/MediaLibrary";
import { containerStyles } from "./style";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MediaDetails from "../pages/MediaDetails/MediaDetails";

const queryClient = new QueryClient();

function App() {
  const classes = containerStyles();
  return (
    <>
      <CssBaseline />
      <Header title="Galactic Gallery" />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <QueryClientProvider client={queryClient}>
              <Router>
                <Routes>
                  <Route path="/" element={<MediaLibrary />} />
                  <Route path="/details/*" element={<MediaDetails />} />
                </Routes>
              </Router>
            </QueryClientProvider>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
