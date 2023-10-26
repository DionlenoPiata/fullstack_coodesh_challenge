import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Chip from "@mui/material/Chip";
import { IconButton } from "@mui/material";
import { YouTube as YouTubeIcon } from "@mui/icons-material";
import LaunchesContext from "../../contexts/LaunchesContext";

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

const TablePagination = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#4F4F4F" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function List() {
  const [launches, setLaunches] = useContext(LaunchesContext);
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
                  <Grid xs={1}>{launche.flight_number}</Grid>
                  <Grid xs={1}>
                    {
                      <img
                        alt="logo"
                        style={{ width: 25 }}
                        src={launche.links.patch.small}
                      />
                    }
                  </Grid>
                  <Grid xs={2}>{launche.name}</Grid>
                  <Grid xs={2}>
                    {new Date(launche.date_utc).toLocaleDateString("en-GB")}
                  </Grid>
                  <Grid xs={2}>Falta pegar o nome do Foguete</Grid>
                  <Grid xs={2}>
                    {launche.success ? (
                      <Chip label={"SUCESSO"} color="success" size="small" />
                    ) : (
                      <Chip label={"FALHA"} color="error" size="small" />
                    )}
                  </Grid>
                  <Grid xs={2}>
                    {" "}
                    <IconButton
                      color="error"
                      component="a"
                      href={launche.links.webcast}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <YouTubeIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                </Grid>
              </TableRow>
            </Grid>
          ))}

        <Grid xs={12}>
          <TablePagination>TablePagination</TablePagination>
        </Grid>
      </Grid>
    </Box>
  );
}

export default List;
