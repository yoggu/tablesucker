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
  primary: "#FF6B00",
  secondary: "#00FF00",
  background: "#0A0A0A",
  surface: "#111",
  grid: "#333",
  text: "#FF6B00",
  lines: ["#FF0000", "#00BFFF", "#00FF00", "#FFD700"],
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
          <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" />
          <XAxis
            dataKey="game"
            stroke={colors.grid}
            tick={{ fill: colors.text, fontSize: 12, fontFamily: "monospace" }}
          />
          <YAxis
            domain={[0, 100]}
            stroke={colors.grid}
            tick={{ fill: colors.text, fontSize: 12, fontFamily: "monospace" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.surface,
              border: `2px solid ${colors.grid}`,
              borderRadius: "4px",
              fontFamily: "monospace",
            }}
            labelStyle={{ color: colors.text }}
          />
          <Legend wrapperStyle={{ fontFamily: "monospace" }} />
          {players.slice(0, 4).map((player, index) => (
            <Line
              key={player.id}
              type="monotone"
              strokeWidth={3}
              dataKey={`player_${player.id}`}
              stroke={colors.lines[index % colors.lines.length]}
              name={player.name}
              dot={{ fill: colors.lines[index % colors.lines.length], strokeWidth: 0, r: 4 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors.lines[index % colors.lines.length]})` }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
