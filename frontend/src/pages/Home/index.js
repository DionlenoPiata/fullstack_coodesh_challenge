import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import PieChart from "../../components/PieChart";
import ColumnChart from "../../components/ColumnChart";
import SearchBar from "../../components/SearchBar";
import List from "../../components/List";
import RocketIcon from "../../assets/rocket.png";

const darkTheme = createTheme({ palette: { mode: "dark" } });

function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
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
            <Paper sx={{ height: 200, textAlign: "center" }} elevation={3}>
              <List />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
