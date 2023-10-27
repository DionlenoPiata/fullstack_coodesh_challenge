import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "2015",
    "Foguete A": 1000,
    "Foguete B": 2000,
    "Foguete C": 3000,
    "Foguete D": 4000,
  },
  {
    name: "2016",
    "Foguete A": 1000,
    "Foguete B": 2000,
    "Foguete C": 3000,
    "Foguete D": 4000,
  },
  {
    name: "2017",
    "Foguete A": 1000,
    "Foguete B": 2000,
    "Foguete C": 3000,
    "Foguete D": 4000,
  },
  {
    name: "2018",
    "Foguete A": 1000,
    "Foguete B": 2000,
    "Foguete C": 3000,
    "Foguete D": 4000,
  },
  {
    name: "2019",
    "Foguete A": 1000,
    "Foguete B": 2000,
    "Foguete C": 3000,
    "Foguete D": 4000,
  },
  {
    name: "2020",
    "Foguete A": 1000,
    "Foguete B": 2000,
    "Foguete C": 3000,
    "Foguete D": 4000,
  },
  {
    name: "2021",
    "Foguete A": 1000,
    "Foguete B": 2000,
    "Foguete C": 3000,
    "Foguete D": 4000,
  },
];

function StackedBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} />
        <YAxis tickCount={10} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Foguete A" stackId="a" fill="#000000" />
        <Bar dataKey="Foguete B" stackId="a" fill="#6A5ACD" />
        <Bar dataKey="Foguete C" stackId="a" fill="#008B8B" />
        <Bar dataKey="Foguete D" stackId="a" fill="#00FF7F" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StackedBarChart;
