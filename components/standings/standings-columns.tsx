"use client";

import { Player, PlayerStats } from "@/types/types";
import { ColumnDef, Column } from "@tanstack/react-table";
import PlayerAvatar from "@/components/ui/player-avatar";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<PlayerStats>[] = [
  {
    accessorKey: "player",
    header: ({ column }) => <SortableHeader column={column} initialSortDirection="asc" title="Player" />,
    cell: ({ row }) => {
      const player: Player = row.getValue("player");
      return (
        <div className="w-fit">
          <Link
            className="flex w-fit items-center gap-3"
            href={`/players/${player.id}`}
          >
            <PlayerAvatar player={player} />
            <span>{player.name}</span>
          </Link>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const rowAPlayer: Player = rowA.getValue("player");
      const rowBPlayer: Player = rowB.getValue("player");
      return rowAPlayer.name.localeCompare(rowBPlayer.name);
    },
  },
  {
    accessorKey: "played",
    header: ({ column }) => <SortableHeader column={column} title="Played" />,
  },
  {
    accessorKey: "wins",
    header: ({ column }) => <SortableHeader column={column} title="Wins" />,
  },
  {
    accessorKey: "losses",
    header: ({ column }) => <SortableHeader column={column} title="Losses" />,
  },
  {
    accessorKey: "goalsFor",
    header: ({ column }) => (
      <SortableHeader column={column} title="Goals For" />
    ),
  },
  {
    accessorKey: "goalsAgainst",
    header: ({ column }) => (
      <SortableHeader column={column} title="Goals Against" />
    ),
  },
  {
    accessorKey: "goalDifference",
    header: ({ column }) => (
      <SortableHeader column={column} title="Goal Difference" />
    ),
  },
  {
    accessorKey: "winRate",
    header: ({ column }) => <SortableHeader column={column} title="Winrate" />,
    cell: ({ row }) => row.getValue("winRate") + "%",
  },
];

export type SortableHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  initialSortDirection?: "asc" | "desc";
};

function SortableHeader<TData, TValue>({
  column,
  initialSortDirection = "desc",
  title,
}: SortableHeaderProps<TData, TValue>) {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        const isSorted = column.getIsSorted();
        if (isSorted === false) {
          column.toggleSorting(initialSortDirection === "desc");
        } else {
          column.toggleSorting();
        }
      }}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
