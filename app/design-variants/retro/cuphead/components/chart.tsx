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
  primary: "#8B4513",
  secondary: "#CD853F",
  accent: "#DAA520",
  background: "#F5E6D3",
  grid: "#8B451330",
  text: "#5D3A1A",
  lines: ["#C41E3A", "#1E5631", "#8B4513", "#4A4A8A"],
};

const darkColors = {
  primary: "#D4A574",
  secondary: "#8B4513",
  accent: "#DAA520",
  background: "#1A1008",
  grid: "#D4A57420",
  text: "#D4A574",
  lines: ["#8B2500", "#1A5631", "#DAA520", "#4A4A8A"],
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
            tick={{ fill: colors.text, fontSize: 12, fontFamily: 'serif' }}
            label={{
              value: 'Match',
              position: 'insideBottom',
              offset: -10,
              fill: colors.text,
              fontFamily: 'serif',
              fontStyle: 'italic',
              fontSize: 12,
            }}
          />
          <YAxis
            domain={[0, 100]}
            stroke={colors.text}
            tick={{ fill: colors.text, fontSize: 12, fontFamily: 'serif' }}
            label={{
              value: 'Win %',
              angle: -90,
              position: 'insideLeft',
              fill: colors.text,
              fontFamily: 'serif',
              fontStyle: 'italic',
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
        className="rounded-sm border-3 px-4 py-3 shadow-[3px_3px_0_#5D3A1A] dark:shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.primary,
        }}
      >
        <p
          className="mb-2 font-serif text-sm font-bold italic"
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
                    className="font-serif text-xs font-bold"
                    style={{ backgroundColor: colors.background, color: entry.color }}
                  >
                    {player.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-serif text-sm" style={{ color: entry.color }}>
                  {player.name}
                </span>
                <span className="ml-auto font-serif text-sm font-bold" style={{ color: entry.color }}>
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
              className="font-serif text-xs font-bold"
              style={{
                backgroundColor: colors.background,
                color: colors.lines[index % colors.lines.length]
              }}
            >
              {player.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span
            className="font-serif text-sm"
            style={{ color: colors.lines[index % colors.lines.length] }}
          >
            {player.name}
          </span>
        </div>
      ))}
    </div>
  );
};
