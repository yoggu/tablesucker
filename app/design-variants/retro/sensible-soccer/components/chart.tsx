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
  background: "#3A6F19",
  surface: "#5A8F29",
  grid: "#000",
  text: "#FFF",
  lines: ["#FF0000", "#0000FF", "#FFFF00", "#FF00FF"],
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
          <CartesianGrid stroke={colors.grid} strokeDasharray="0" strokeWidth={2} />
          <XAxis
            dataKey="game"
            stroke={colors.grid}
            strokeWidth={2}
            tick={{ fill: colors.text, fontSize: 12, fontFamily: "monospace", fontWeight: "bold" }}
          />
          <YAxis
            domain={[0, 100]}
            stroke={colors.grid}
            strokeWidth={2}
            tick={{ fill: colors.text, fontSize: 12, fontFamily: "monospace", fontWeight: "bold" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.surface,
              border: `3px solid ${colors.grid}`,
              borderRadius: "0",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
            labelStyle={{ color: colors.text }}
          />
          <Legend wrapperStyle={{ fontFamily: "monospace", fontWeight: "bold" }} />
          {players.slice(0, 4).map((player, index) => (
            <Line
              key={player.id}
              type="linear"
              strokeWidth={3}
              dataKey={`player_${player.id}`}
              stroke={colors.lines[index % colors.lines.length]}
              name={player.name}
              dot={{ fill: colors.lines[index % colors.lines.length], strokeWidth: 0, r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
