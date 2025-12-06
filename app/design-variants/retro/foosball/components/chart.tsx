"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const lightColors = {
  primary: "#5D4037",
  secondary: "#8D6E63",
  accent: "#4CAF50",
  background: "#EFEBE9",
  grid: "#D7CCC8",
  text: "#3E2723",
  lines: ["#E53935", "#1E88E5", "#4CAF50", "#FF9800"],
};

const darkColors = {
  primary: "#8D6E63",
  secondary: "#5D4037",
  accent: "#66BB6A",
  background: "#1B1410",
  grid: "#3E2723",
  text: "#D7CCC8",
  lines: ["#EF5350", "#42A5F5", "#66BB6A", "#FFB74D"],
};

// Demo data for the chart
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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colors = mounted && resolvedTheme === "dark" ? darkColors : lightColors;

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer>
        <LineChart data={demoData} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
          <CartesianGrid stroke={colors.grid} strokeDasharray="4 4" />
          <XAxis
            dataKey="game"
            stroke={colors.text}
            tick={{ fill: colors.text, fontSize: 12 }}
            label={{
              value: 'Match',
              position: 'insideBottom',
              offset: -10,
              fill: colors.text,
              fontSize: 12,
            }}
          />
          <YAxis
            domain={[0, 100]}
            stroke={colors.text}
            tick={{ fill: colors.text, fontSize: 12 }}
            label={{
              value: 'Win %',
              angle: -90,
              position: 'insideLeft',
              fill: colors.text,
              fontSize: 12,
            }}
          />
          <Tooltip content={<CustomTooltip players={players} colors={colors} />} />
          <Legend content={<CustomLegend players={players} colors={colors} />} />
          {players.slice(0, 4).map((player, index) => (
            <Line
              key={player.id}
              type="monotone"
              strokeWidth={3}
              dataKey={`player_${player.id}`}
              stroke={colors.lines[index % colors.lines.length]}
              name={player.name}
              connectNulls
              dot={{ fill: colors.lines[index % colors.lines.length], strokeWidth: 2, stroke: colors.background, r: 5 }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: colors.background }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ChartColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  grid: string;
  text: string;
  lines: string[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value?: number; dataKey?: string; color?: string }>;
  label?: string | number;
  players: DemoPlayer[];
  colors: ChartColors;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  players,
  colors,
}) => {
  if (active && payload && payload.length) {
    const sortedPayload = [...payload].sort(
      (a, b) => (b.value as number) - (a.value as number)
    );

    return (
      <div
        className="rounded-lg border-2 px-4 py-3 shadow-lg"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.primary,
        }}
      >
        <p
          className="mb-2 text-sm font-bold"
          style={{ color: colors.text }}
        >
          Match {label}
        </p>
        <div className="flex flex-col gap-2">
          {sortedPayload.map((entry) => {
            const playerId = parseInt(
              (entry.dataKey as string).replace("player_", ""),
              10
            );
            const player = players.find((p) => p.id === playerId);
            if (!player || entry.value === undefined) return null;

            return (
              <div key={player.id} className="flex items-center gap-2">
                <Avatar
                  className="h-6 w-6 border-2"
                  style={{ borderColor: entry.color }}
                >
                  <AvatarImage src={player.image_url ?? ""} />
                  <AvatarFallback
                    className="text-xs font-bold"
                    style={{ backgroundColor: colors.background, color: entry.color }}
                  >
                    {player.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm" style={{ color: entry.color }}>
                  {player.name}
                </span>
                <span className="ml-auto text-sm font-bold" style={{ color: entry.color }}>
                  {entry.value}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

interface CustomLegendProps {
  players: DemoPlayer[];
  colors: ChartColors;
}

const CustomLegend: React.FC<CustomLegendProps> = ({ players, colors }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-4">
      {players.slice(0, 4).map((player, index) => (
        <div key={player.id} className="flex items-center gap-2">
          <Avatar
            className="h-6 w-6 border-2"
            style={{ borderColor: colors.lines[index % colors.lines.length] }}
          >
            <AvatarImage src={player.image_url ?? ""} />
            <AvatarFallback
              className="text-xs font-bold"
              style={{
                backgroundColor: colors.background,
                color: colors.lines[index % colors.lines.length]
              }}
            >
              {player.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span
            className="text-sm"
            style={{ color: colors.lines[index % colors.lines.length] }}
          >
            {player.name}
          </span>
        </div>
      ))}
    </div>
  );
};
