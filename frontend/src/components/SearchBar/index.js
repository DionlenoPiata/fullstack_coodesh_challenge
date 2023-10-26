import React, { useState, useContext, useCallback } from "react";
import debounce from "lodash.debounce";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import LaunchesContext from "../../contexts/LaunchesContext";
import SearchContext from "../../contexts/SearchContext";

function SearchBar() {
  const [launches, setLaunches] = useContext(LaunchesContext);
  const [search, setSearch] = useContext(SearchContext);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce((nextValue) => fetchLaunches(nextValue), 1000),
    []
  );

  const fetchLaunches = async (nextValue) => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_BASE_URL_API}/launches?search=${nextValue}`,
      });
      setLaunches(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSearchChange = async (event) => {
    setLoading(true);
    const { value: nextValue } = event.target;
    setSearch({ value: nextValue });
    debouncedSearch(nextValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} p={2}>
        <Grid xs={12}>
          <Typography variant="h6" gutterBottom>
            Registro de lançamentos
          </Typography>
        </Grid>
        <Grid xs={12} sm={8}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Procure aqui"
              variant="standard"
              fullWidth
              value={search.value}
              onChange={handleSearchChange}
            />
          </Box>
        </Grid>
        <Grid sx={{ display: { sm: "block", xs: "none" } }}>
          <Typography variant="h6" gutterBottom>
            <Button variant="contained" color="inherit">
              Buscar
            </Button>
          </Typography>
        </Grid>
        {loading && (
          <Grid xs={12}>
            <LinearProgress />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default SearchBar;
