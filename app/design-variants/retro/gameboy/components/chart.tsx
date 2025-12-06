"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const lightColors = {
  primary: "#0F380F",
  secondary: "#306230",
  accent: "#8BAC0F",
  background: "#9BBC0F",
  grid: "#0F380F",
  text: "#0F380F",
  lines: ["#0F380F", "#306230", "#0F380F", "#306230"],
};

const darkColors = {
  primary: "#6868a8",
  secondary: "#4a4a6a",
  accent: "#8888c8",
  background: "#0a0a14",
  grid: "#1a1a2e",
  text: "#9898b8",
  lines: ["#8888c8", "#6868a8", "#4a4a6a", "#9898b8"],
};

const data = [
  { name: "W1", player1: 65, player2: 78, player3: 45, player4: 82 },
  { name: "W2", player1: 72, player2: 65, player3: 58, player4: 75 },
  { name: "W3", player1: 80, player2: 72, player3: 62, player4: 68 },
  { name: "W4", player1: 75, player2: 85, player3: 70, player4: 72 },
  { name: "W5", player1: 88, player2: 78, player3: 75, player4: 80 },
  { name: "W6", player1: 82, player2: 90, player3: 68, player4: 85 },
];

export function Chart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartColors = mounted && resolvedTheme === "dark" ? darkColors : lightColors;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke={chartColors.grid}
            opacity={0.3}
          />
          <XAxis
            dataKey="name"
            stroke={chartColors.text}
            tick={{ fill: chartColors.text, fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}
            tickLine={{ stroke: chartColors.text }}
          />
          <YAxis
            stroke={chartColors.text}
            tick={{ fill: chartColors.text, fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}
            tickLine={{ stroke: chartColors.text }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: chartColors.accent,
              border: `2px solid ${chartColors.primary}`,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
            }}
            labelStyle={{ color: chartColors.text, fontWeight: "bold" }}
          />
          <Legend
            wrapperStyle={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
            }}
          />
          <Line
            type="stepAfter"
            dataKey="player1"
            name="P1"
            stroke={chartColors.lines[0]}
            strokeWidth={3}
            dot={{ fill: chartColors.lines[0], r: 4, strokeWidth: 0 }}
          />
          <Line
            type="stepAfter"
            dataKey="player2"
            name="P2"
            stroke={chartColors.lines[1]}
            strokeWidth={3}
            strokeDasharray="8 4"
            dot={{ fill: chartColors.lines[1], r: 4, strokeWidth: 0 }}
          />
          <Line
            type="stepAfter"
            dataKey="player3"
            name="P3"
            stroke={chartColors.lines[2]}
            strokeWidth={3}
            strokeDasharray="2 2"
            dot={{ fill: chartColors.lines[2], r: 4, strokeWidth: 0 }}
          />
          <Line
            type="stepAfter"
            dataKey="player4"
            name="P4"
            stroke={chartColors.lines[3]}
            strokeWidth={3}
            strokeDasharray="12 4 2 4"
            dot={{ fill: chartColors.lines[3], r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
