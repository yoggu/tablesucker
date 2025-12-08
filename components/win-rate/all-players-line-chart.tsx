"use client";

import { Player } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Color palette for player lines (bright, high contrast on dark bg)
const COLORS = [
  "#60A5FA", // sky-400
  "#F472B6", // pink-400
  "#34D399", // emerald-400
  "#FBBF24", // amber-400
  "#A78BFA", // violet-400
  "#FB923C", // orange-400
  "#22D3EE", // cyan-400
  "#F87171", // red-400
];

type AllPlayersLineChartProps = {
  data: Array<{ game: number } & Record<string, number>>;
  players: Player[];
};

export default function AllPlayersLineChart({
  data,
  players,
}: AllPlayersLineChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ bottom: 10, right: 10 }}>
          <YAxis domain={[0, 100]}>
            <Label angle={-90} position="insideLeft">
              Win Rate
            </Label>
          </YAxis>
          <XAxis dataKey="game">
            <Label offset={-10} position="insideBottom">
              Game
            </Label>
          </XAxis>
          <Tooltip content={<CustomTooltip players={players} />} />
          <Legend content={<CustomLegend players={players} />} />
          <CartesianGrid stroke="#334155" />
          {players.map((player, index) => (
            <Line
              key={player.id}
              strokeWidth={2}
              dataKey={`player_${player.id}`}
              stroke={COLORS[index % COLORS.length]}
              name={player.name}
              connectNulls
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; dataKey?: string; color?: string }>;
  label?: string | number;
  players: Player[];
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  players,
}) => {
  if (active && payload && payload.length) {
    // Sort by win rate descending
    const sortedPayload = [...payload].sort(
      (a, b) => (b.value as number) - (a.value as number)
    );

    return (
      <div className="rounded-lg bg-muted px-3 py-2">
        <p className="mb-2 font-semibold">{`Game ${label}`}</p>
        <div className="flex flex-col gap-2">
          {sortedPayload.map((entry) => {
            const playerId = parseInt(
              (entry.dataKey as string).replace("player_", ""),
              10
            );
            const player = players.find((p) => p.id === playerId);
            if (!player || entry.value === undefined) return null;

            return (
              <div
                key={player.id}
                className="flex items-center gap-2"
                style={{ color: entry.color }}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={player.image_url ?? ""} />
                  <AvatarFallback className="text-xs">
                    {player.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{player.name}</span>
                <span className="ml-auto text-sm font-medium">
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

type CustomLegendProps = {
  players: Player[];
};

const CustomLegend: React.FC<CustomLegendProps> = ({ players }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-6">
      {players.map((player, index) => (
        <div key={player.id} className="flex items-center gap-2">
          <Avatar
            className="h-6 w-6 border-2"
            style={{ borderColor: COLORS[index % COLORS.length] }}
          >
            <AvatarImage src={player.image_url ?? ""} />
            <AvatarFallback className="text-xs">
              {player.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span
            className="text-sm"
            style={{ color: COLORS[index % COLORS.length] }}
          >
            {player.name}
          </span>
        </div>
      ))}
    </div>
  );
};
