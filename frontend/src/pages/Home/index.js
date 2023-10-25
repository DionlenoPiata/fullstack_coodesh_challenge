import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import PieChart from "../../components/PieChart";
import ColumnChart from "../../components/ColumnChart";
import SearchBar from "../../components/SearchBar";
import List from "../../components/List";

function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Paper sx={{ height: 120, textAlign: "center" }} elevation={3}>
            <div>Space X</div>
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
          <Paper sx={{ height: 60, textAlign: "center" }} elevation={3}>
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
  );
}

export default Home;
