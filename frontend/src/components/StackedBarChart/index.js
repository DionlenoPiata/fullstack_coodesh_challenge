import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        textAnchor="end"
        fill="#666"
        transform="rotate(-45)"
      >
        {payload.value}
      </text>
    </g>
  );
};

function StackedBarChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_BASE_URL_API}/launches/stats/chart/bar`,
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
            Lançamentos por ano
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Box
            width={"100%"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <BarChart
              width={300}
              height={300}
              data={data.data_per_year}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                interval={0}
                tick={<CustomizedAxisTick />}
              />
              <YAxis tickCount={10} />
              <Tooltip />
              <Legend />

              {data.rockets &&
                data.rockets.map((rocket, index) => (
                  <Bar dataKey={rocket.name} stackId="a" fill={rocket.color} />
                ))}
            </BarChart>
          </Box>
        </Grid>
      </Grid>
      {loading && (
        <Grid xs={12}>
          <LinearProgress />
        </Grid>
      )}
    </Box>
  );
}

export default StackedBarChart;
