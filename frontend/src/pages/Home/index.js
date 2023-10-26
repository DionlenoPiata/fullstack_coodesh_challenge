import React, { useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import LaunchesContext from "../../contexts/LaunchesContext";
import SearchContext from "../../contexts/SearchContext";
import PieChart from "../../components/PieChart";
import ColumnChart from "../../components/ColumnChart";
import SearchBar from "../../components/SearchBar";
import List from "../../components/List";
import Footer from "../../components/Footer";
import RocketIcon from "../../assets/rocket.png";

const darkTheme = createTheme({ palette: { mode: "dark" } });

function Home() {
  const [launches, setLaunches] = useState([]);
  const [search, setSearch] = useState({ value: "" });

  return (
    <ThemeProvider theme={darkTheme}>
      <LaunchesContext.Provider value={[launches, setLaunches]}>
        <SearchContext.Provider value={[search, setSearch]}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Paper
                  sx={{
                    display: "flex",
                    height: 120,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  elevation={3}
                >
                  <img
                    alt="logo Space C"
                    style={{ width: 50, transform: "rotate(45deg)" }}
                    src={RocketIcon}
                  />
                  <Typography variant="h5" gutterBottom>
                    Space X
                  </Typography>
                </Paper>
              </Grid>
              <Grid xs={12} sm={6}>
                <Paper sx={{ height: 120, textAlign: "center" }} elevation={3}>
                  <PieChart />
                </Paper>
              </Grid>
              <Grid xs={12} sm={6}>
                <Paper sx={{ height: 120, textAlign: "center" }} elevation={3}>
                  <ColumnChart />
                </Paper>
              </Grid>
              <Grid xs={12}>
                <Paper sx={{ textAlign: "center" }} elevation={3}>
                  <SearchBar />
                </Paper>
              </Grid>
              <Grid xs={12}>
                <Paper
                  sx={{ textAlign: "center", marginBottom: "10%" }}
                  elevation={3}
                >
                  <List />
                </Paper>
              </Grid>
              <Grid xs={12}>
                <Footer />
              </Grid>
            </Grid>
          </Box>
        </SearchContext.Provider>
      </LaunchesContext.Provider>
    </ThemeProvider>
  );
}

export default Home;
