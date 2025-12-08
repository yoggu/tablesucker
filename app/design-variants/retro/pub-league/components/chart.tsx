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

const colors = {
  background: "#0D3B0F",
  surface: "#1B5E20",
  grid: "#2E7D32",
  text: "#A5D6A7",
  yellow: "#FDD835",
  lines: ["#D32F2F", "#1976D2", "#FDD835", "#7B1FA2"],
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
}

export function Chart({ players }: ChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={demoData}>
          <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" opacity={0.5} />
          <XAxis
            dataKey="game"
            stroke={colors.grid}
            tick={{ fill: colors.text, fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]}
            stroke={colors.grid}
            tick={{ fill: colors.text, fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.surface,
              border: `2px solid ${colors.yellow}`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: colors.yellow }}
          />
          <Legend />
          {players.slice(0, 4).map((player, index) => (
            <Line
              key={player.id}
              type="monotone"
              strokeWidth={3}
              dataKey={`player_${player.id}`}
              stroke={colors.lines[index % colors.lines.length]}
              name={player.name}
              dot={{ fill: colors.lines[index % colors.lines.length], strokeWidth: 0, r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
