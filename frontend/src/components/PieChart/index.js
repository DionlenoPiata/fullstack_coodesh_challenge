import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import LabelIcon from "@mui/icons-material/Label";
import { PieChart as Chart, Pie, Sector, Cell } from "recharts";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

function PieChart() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
        <Grid xs={12}>
          <Box
            width={"100%"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Chart width={400} height={200}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data.rockets}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                fill="#8884d8"
                dataKey="count_launches"
                onMouseEnter={(data, index) => setActiveIndex(index)}
              >
                {" "}
                {data.rockets &&
                  data.rockets.map((rocket, index) => (
                    <Cell key={`cell-${index}`} fill={rocket.color} />
                  ))}
              </Pie>
            </Chart>
          </Box>
        </Grid>

        <Grid xs={6}>
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
        </Grid>
        <Grid xs={6}>
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
