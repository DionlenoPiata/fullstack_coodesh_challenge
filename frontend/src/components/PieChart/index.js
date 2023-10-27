import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import LabelIcon from "@mui/icons-material/Label";
import { PieChart as Chart, Pie, Cell } from "recharts";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PieChart() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_BASE_URL_API}/launches/stats/chart/pie`,
      });
      setTimeout(() => {
        setData(response.data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid xs={12}>
          <Typography variant="body2" gutterBottom>
            Lançamentos de foguetes
          </Typography>
        </Grid>
        <Grid xs={4}>
          <Stack spacing={1}>
            {data.rockets &&
              data.rockets.map((rocket) => (
                <Typography variant="body2" color="textSecondary">
                  <Box
                    sx={{
                      display: "flex",
                      textAlign: "left",
                      alignContent: "center",
                      ml: 1,
                    }}
                  >
                    <LabelIcon fontSize="small" htmlColor={rocket.color} />
                    {rocket.name}
                  </Box>
                </Typography>
              ))}
          </Stack>
          <Stack sx={{ marginTop: "20px" }} spacing={1}>
            <Typography variant="subtitle2" color="textSecondary">
              <Box
                sx={{
                  display: "flex",
                  textAlign: "left",
                  alignContent: "center",
                  ml: 1,
                }}
              >
                Resultado de Lançamento:
              </Box>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Box
                sx={{
                  display: "flex",
                  textAlign: "left",
                  alignContent: "center",
                  ml: 1,
                }}
              >
                Sucesso:&nbsp;
                <Chip
                  label={`${
                    data.successful_launches ? data.successful_launches : "..."
                  }`}
                  color="success"
                  size={"small"}
                  variant="outlined"
                />
              </Box>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Box sx={{ textAlign: "left", ml: 1 }}>
                Falha:&nbsp;
                <Chip
                  label={` ${
                    data.failed_launches ? data.failed_launches : "..."
                  } `}
                  color="error"
                  size={"small"}
                  variant="outlined"
                />
              </Box>
            </Typography>
          </Stack>
        </Grid>
        <Grid xs={8}>
          <Chart width={200} height={200}>
            <Pie
              data={data.rockets}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count_launches"
            >
              {data.rockets &&
                data.rockets.map((rocket, index) => (
                  <Cell key={`cell-${index}`} fill={rocket.color} />
                ))}
            </Pie>
          </Chart>
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

export default PieChart;
