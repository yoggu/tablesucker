"use client";

import { Player, PlayerStats } from "@/types/types";
import { ColumnDef, Column } from "@tanstack/react-table";
import PlayerAvatar from "@/components/ui/player-avatar";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<PlayerStats>[] = [
  {
    accessorKey: "player",
    header: ({ column }) => <SortableHeader column={column} title="Player" />,
    cell: ({ row }) => {
      const player: Player = row.getValue("player");
      return (
        <div className="w-fit">
          <Link
            className="flex w-fit items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400"
            href={`/players/${player.id}`}
          >
            <PlayerAvatar player={player} />
            <span className="hidden @lg:inline">{player.name}</span>
          </Link>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const rowAPlayer: Player = rowA.getValue("player");
      const rowBPlayer: Player = rowB.getValue("player");
      return rowBPlayer.name.localeCompare(rowAPlayer.name);
    },
  },
  {
    accessorKey: "games",
    header: ({ column }) => (
      <SortableHeader column={column} title="Games" shortTitle="G" />
    ),
    sortDescFirst: true,
  },
  {
    accessorKey: "wins",
    header: ({ column }) => (
      <SortableHeader column={column} title="Wins" shortTitle="W" />
    ),
    sortDescFirst: true,
  },
  {
    accessorKey: "losses",
    header: ({ column }) => (
      <SortableHeader column={column} title="Losses" shortTitle="L" />
    ),
    sortDescFirst: true,
  },
  {
    accessorKey: "goalsFor",
    header: ({ column }) => (
      <SortableHeader column={column} title="Goals For" shortTitle="GF" />
    ),
  },
  {
    accessorKey: "goalsAgainst",
    header: ({ column }) => (
      <SortableHeader column={column} title="Goals Against" shortTitle="GA" />
    ),
  },
  {
    accessorKey: "goalDifference",
    header: ({ column }) => (
      <SortableHeader column={column} title="Goal Difference" shortTitle="GD" />
    ),
    sortDescFirst: true,
  },
  {
    accessorKey: "winRate",
    header: ({ column }) => (
      <SortableHeader column={column} title="Win Rate" shortTitle="WR" />
    ),
    cell: ({ row }) => row.getValue("winRate") + "%",
    sortDescFirst: true,
  },
];

export type SortableHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  shortTitle?: string;
};

function SortableHeader<TData, TValue>({
  column,
  title,
  shortTitle,
}: SortableHeaderProps<TData, TValue>) {
  const isSorted = column.getIsSorted();
  return (
    <Button
      className={cn({
        "text-slate-900 dark:text-slate-50": isSorted,
      })}
      variant="ghost"
      onClick={() => {
        column.toggleSorting();
      }}
    >
      <span className="@lg:hidden">{shortTitle}</span>
      <span className={cn({ "hidden @lg:inline": shortTitle })}>{title}</span>
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
