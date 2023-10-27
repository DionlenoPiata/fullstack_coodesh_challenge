import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import LabelIcon from "@mui/icons-material/Label";
import {
  PieChart as Chart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
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
            <Typography variant="body2" color="textSecondary">
              <Box
                sx={{
                  display: "flex",
                  textAlign: "left",
                  alignContent: "center",
                  ml: 1,
                }}
              >
                <LabelIcon fontSize="small" color="success" />
                Used Falcon 9
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
                <LabelIcon fontSize="small" color="error" />
                New Falcon 9
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
                <LabelIcon fontSize="small" color="primary" /> Falcon 1
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
                <LabelIcon fontSize="small" color="secondary" />
                Falcon Heavy
              </Box>
            </Typography>
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
                <Chip
                  label="Sucesso: 70"
                  color="success"
                  size={"small"}
                  variant="outlined"
                />
              </Box>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Box sx={{ textAlign: "left", ml: 1 }}>
                <Chip
                  label="Falha: 30"
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
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </Chart>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PieChart;
