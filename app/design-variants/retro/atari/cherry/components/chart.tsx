"use client";

import { DemoPlayer } from "./player-avatar";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const defaultColors = {
  primary: "#FF6B6B",
  secondary: "#DC143C",
  accent: "#FFB6C1",
  background: "#1a0a0f",
  grid: "#DC143C30",
  text: "#FF6B6B",
  lines: ["#DC143C", "#FF6B6B", "#FFB6C1", "#8B0000"],
};

const demoData = [
  { game: 1, player_1: 100, player_2: 0, player_3: 50, player_4: 50 },
  { game: 2, player_1: 100, player_2: 50, player_3: 50, player_4: 0 },
  { game: 3, player_1: 67, player_2: 67, player_3: 33, player_4: 33 },
  { game: 4, player_1: 75, player_2: 50, player_3: 50, player_4: 25 },
  { game: 5, player_1: 60, player_2: 60, player_3: 40, player_4: 40 },
  { game: 6, player_1: 67, player_2: 50, player_3: 50, player_4: 33 },
  { game: 7, player_1: 71, player_2: 57, player_3: 43, player_4: 29 },
  { game: 8, player_1: 75, player_2: 50, player_3: 50, player_4: 25 },
];

interface ChartProps {
  players: DemoPlayer[];
  colors?: typeof defaultColors;
}

export function Chart({ players, colors = defaultColors }: ChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={demoData}>
          <CartesianGrid stroke={colors.grid} strokeDasharray="4 4" />
          <XAxis
            dataKey="game"
            stroke={colors.text}
            tick={{ fill: colors.text, fontSize: 12, fontWeight: "bold" }}
          />
          <YAxis
            domain={[0, 100]}
            stroke={colors.text}
            tick={{ fill: colors.text, fontSize: 12, fontWeight: "bold" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              border: `4px solid ${colors.primary}`,
              fontWeight: "bold",
            }}
            labelStyle={{ color: colors.text }}
          />
          <Legend />
          {players.slice(0, 4).map((player, index) => (
            <Line
              key={player.id}
              type="monotone"
              strokeWidth={4}
              dataKey={`player_${player.id}`}
              stroke={colors.lines[index % colors.lines.length]}
              name={player.name}
              dot={{ fill: colors.lines[index % colors.lines.length], strokeWidth: 2, r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
