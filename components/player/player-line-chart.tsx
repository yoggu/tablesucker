"use client";

import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

type PlayerLineChartProps = {
  data: {
    game: number;
    winrate: number;
  }[];
};

export default function PlayerLineChart({ data }: PlayerLineChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ bottom: 10 }}>
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
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#334155" />
          <Line
            strokeWidth={2}
            dataKey="winrate"
            stroke="#1d4ed8"
            yAxisId={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-slate-800 px-3 py-2">
        <p>{`Game ${label}`}</p>
        <p>{`Win Rate: ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};
