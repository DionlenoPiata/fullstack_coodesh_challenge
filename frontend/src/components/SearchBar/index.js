import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    console.log(`Buscar por ${search}`);
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
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </Box>
        </Grid>
        <Grid sx={{ display: { sm: "block", xs: "none" } }}>
          <Typography variant="h6" gutterBottom>
            <Button variant="contained" color="inherit" onClick={handleSearch}>
              Buscar
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchBar;
