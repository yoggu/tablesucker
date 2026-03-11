"use client";

import { GameDetails, Player, SeasonWithState } from "@/types/types";
import { Shuffle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AvatarCheckbox } from "../ui/avatar-checkbox";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PlayerAvatar from "../ui/player-avatar";
import DialogGameForm from "./dialog-game-form";
import { type DefaultTeams } from "./game-form";

type RandomTeamDialogProps = {
  players: Player[];
  seasons: SeasonWithState[];
  games?: GameDetails[];
};

type RandomTeamStep = "select-players" | "show-result";

function shuffleArray<T>(items: T[]) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

function buildRandomTeams(playerIds: number[]): DefaultTeams {
  const shuffledPlayerIds = shuffleArray(playerIds);
  const shouldTeamRedGetExtraPlayer =
    playerIds.length % 2 === 1 && Math.random() >= 0.5;

  const teamRedPlayerCount = shouldTeamRedGetExtraPlayer
    ? Math.ceil(playerIds.length / 2)
    : Math.floor(playerIds.length / 2);

  return {
    teamRed: shuffledPlayerIds.slice(0, teamRedPlayerCount),
    teamBlue: shuffledPlayerIds.slice(teamRedPlayerCount),
  };
}

function getLastGameDate(
  playerId: number,
  games: GameDetails[],
): string | null {
  for (const game of games) {
    if (
      game.team_red.player_ids.includes(playerId) ||
      game.team_blue.player_ids.includes(playerId)
    ) {
      return game.created_at;
    }
  }
  return null;
}

export default function RandomTeamDialog({
  players,
  seasons,
  games = [],
}: RandomTeamDialogProps) {
  const selectablePlayers = useMemo(() => {
    const activePlayers = players.filter((player) => !player.is_archived);

    // Sort by last game date ascending (longest ago first, never-played at top)
    return activePlayers.sort((a, b) => {
      const dateA = getLastGameDate(a.id, games);
      const dateB = getLastGameDate(b.id, games);
      if (!dateA && !dateB) return 0;
      if (!dateA) return -1;
      if (!dateB) return 1;
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });
  }, [players, games]);

  const playersById = useMemo(
    () =>
      new Map(selectablePlayers.map((player) => [player.id, player] as const)),
    [selectablePlayers],
  );

  const [randomDialogOpen, setRandomDialogOpen] = useState(false);
  const [gameDialogOpen, setGameDialogOpen] = useState(false);
  const [openGameDialogAfterClose, setOpenGameDialogAfterClose] =
    useState(false);
  const [step, setStep] = useState<RandomTeamStep>("select-players");
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>([]);
  const [generatedTeams, setGeneratedTeams] = useState<DefaultTeams | null>(
    null,
  );

  const resetState = () => {
    setStep("select-players");
    setSelectedPlayerIds([]);
    setGeneratedTeams(null);
  };

  useEffect(() => {
    if (!randomDialogOpen && openGameDialogAfterClose) {
      setGameDialogOpen(true);
      setOpenGameDialogAfterClose(false);
    }
  }, [randomDialogOpen, openGameDialogAfterClose]);

  const handleRandomDialogOpenChange = (open: boolean) => {
    setRandomDialogOpen(open);

    if (!open && !openGameDialogAfterClose) {
      resetState();
    }
  };

  const togglePlayer = (playerId: number, checked: boolean) => {
    setSelectedPlayerIds((currentPlayerIds) => {
      if (checked) {
        if (currentPlayerIds.includes(playerId)) {
          return currentPlayerIds;
        }

        return [...currentPlayerIds, playerId];
      }

      return currentPlayerIds.filter((id) => id !== playerId);
    });
  };

  const shuffleTeams = () => {
    if (selectedPlayerIds.length < 2) {
      return;
    }

    setGeneratedTeams(buildRandomTeams(selectedPlayerIds));
    setStep("show-result");
  };

  const handleCreateGame = () => {
    if (!generatedTeams) {
      return;
    }

    setOpenGameDialogAfterClose(true);
    setRandomDialogOpen(false);
  };

  const handleGameDialogOpenChange = (open: boolean) => {
    setGameDialogOpen(open);

    if (!open) {
      resetState();
    }
  };

  const teamRedPlayers = (generatedTeams?.teamRed ?? [])
    .map((playerId) => playersById.get(playerId))
    .filter((player): player is Player => Boolean(player));

  const teamBluePlayers = (generatedTeams?.teamBlue ?? [])
    .map((playerId) => playersById.get(playerId))
    .filter((player): player is Player => Boolean(player));

  return (
    <>
      <Dialog
        open={randomDialogOpen}
        onOpenChange={handleRandomDialogOpenChange}
      >
        <DialogTrigger asChild>
          <Button className="flex gap-1 rounded-full px-2 sm:rounded-md sm:px-4">
            <Shuffle />
            <span className="hidden sm:inline">Random Teams</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-dvh max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Random Teams</DialogTitle>
            <DialogDescription>
              {step === "select-players"
                ? "Select the players who are playing, then shuffle."
                : "Here are your random teams!"}
            </DialogDescription>
          </DialogHeader>

          {step === "select-players" && (
            <div className="flex flex-col gap-6">
              <ul className="flex flex-wrap gap-3">
                {selectablePlayers.map((player) => (
                  <li key={player.id}>
                    <AvatarCheckbox
                      title={player.name}
                      checked={selectedPlayerIds.includes(player.id)}
                      onCheckedChange={(checked) =>
                        togglePlayer(player.id, Boolean(checked))
                      }
                      player={player}
                    />
                  </li>
                ))}
              </ul>
              <Button
                onClick={shuffleTeams}
                disabled={selectedPlayerIds.length < 2}
              >
                <Shuffle className="mr-2 h-4 w-4" />
                Shuffle
              </Button>
            </div>
          )}

          {step === "show-result" && generatedTeams && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-medium">Team Red</span>
                  <ul className="flex flex-wrap gap-3">
                    {teamRedPlayers.map((player) => (
                      <li key={player.id}>
                        <PlayerAvatar player={player} showName />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center text-3xl font-bold text-muted-foreground">
                  vs
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-medium">Team Blue</span>
                  <ul className="flex flex-wrap gap-3">
                    {teamBluePlayers.map((player) => (
                      <li key={player.id}>
                        <PlayerAvatar player={player} showName />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={shuffleTeams}>
                  <Shuffle className="mr-2 h-4 w-4" />
                  Shuffle Again
                </Button>
                <Button onClick={handleCreateGame}>Create Game</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <DialogGameForm
        seasons={seasons}
        players={players}
        defaultTeams={generatedTeams ?? undefined}
        open={gameDialogOpen}
        onOpenChange={handleGameDialogOpenChange}
        showTrigger={false}
      />
    </>
  );
}
