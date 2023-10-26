import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import { IconButton } from "@mui/material";
import { YouTube as YouTubeIcon } from "@mui/icons-material";
import axios from "axios";
import LaunchesContext from "../../contexts/LaunchesContext";
import SearchContext from "../../contexts/SearchContext";

const TableHead = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#4F4F4F" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TableRow = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#808080" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TableCell = styled(Grid)(() => ({
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
}));

const TablePagination = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#4F4F4F" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  display: "flex",
  alignContent: "center",
  justifyContent: "flex-end",
  alignItems: "center",
}));

function List() {
  const [launches, setLaunches] = useContext(LaunchesContext);
  const [search, setSearch] = useContext(SearchContext);
  const [page, setPage] = useState(1);

  const handleChangePage = async (event, value) => {
    setPage(value);
    try {
      const response = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_BASE_URL_API}/launches?page=${value}&search=${search.value}`,
      });
      setLaunches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 1, backgroundColor: "#4F4F4F" }}>
      <Grid container spacing={1}>
        <Grid sx={{ display: { sm: "block", xs: "none" } }} xs={12}>
          <TableHead>
            <Grid container spacing={0}>
              <Grid xs={1}>Nº Vôo</Grid>
              <Grid xs={1}>Logo</Grid>
              <Grid xs={2}>Missão</Grid>
              <Grid xs={2}>Data de lançamento</Grid>
              <Grid xs={2}>Foguete</Grid>
              <Grid xs={2}>Resultado</Grid>
              <Grid xs={2}>Vídeo</Grid>
            </Grid>
          </TableHead>
        </Grid>
        {launches &&
          launches.result &&
          launches.result.map((launche) => (
            <Grid xs={12}>
              <TableRow>
                <Grid container spacing={0}>
                  <TableCell xs={4} sm={1} order={{ xs: 4, sm: 1 }}>
                    {launche.flight_number}
                  </TableCell>
                  <TableCell xs={4} sm={1} order={{ xs: 1, sm: 2 }}>
                    {
                      <img
                        alt="logo"
                        style={{ width: 25 }}
                        src={launche.links.patch.small}
                      />
                    }
                  </TableCell>
                  <TableCell xs={4} sm={2} order={{ xs: 2, sm: 3 }}>
                    {launche.name}
                  </TableCell>
                  <TableCell xs={4} sm={2} order={{ xs: 5, sm: 4 }}>
                    {new Date(launche.date_utc).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell
                    sx={{ display: { sm: "block", xs: "none" } }}
                    sm={2}
                    order={{ sm: 5 }}
                  >
                    {launche.rocket.name}
                  </TableCell>
                  <TableCell xs={4} sm={2} order={{ xs: 6, sm: 6 }}>
                    {launche.success ? (
                      <Chip label={"SUCESSO"} color="success" size="small" />
                    ) : (
                      <Chip label={"FALHA"} color="error" size="small" />
                    )}
                  </TableCell>
                  <TableCell xs={4} sm={2} order={{ xs: 3, sm: 7 }}>
                    <IconButton
                      color="error"
                      component="a"
                      href={launche.links.webcast}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <YouTubeIcon fontSize="large" />
                    </IconButton>
                  </TableCell>
                </Grid>
              </TableRow>
            </Grid>
          ))}

        <Grid xs={12}>
          <TablePagination>
            <Pagination
              count={launches.totalPages}
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={handleChangePage}
            />
          </TablePagination>
        </Grid>
      </Grid>
    </Box>
  );
}

export default List;
