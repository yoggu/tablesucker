"use client";

import Link from "next/link";
import { Card } from "./components/card";
import { Button } from "./components/button";
import { Badge } from "./components/badge";
import { Input } from "./components/input";
import { GameCard } from "./components/game-card";
import { StatsCard } from "./components/stats-card";
import { DemoPlayer } from "./components/player-avatar";
import { Chart } from "./components/chart";

const demoPlayers: DemoPlayer[] = [
  { id: 1, name: "Alice", image_url: "https://i.pravatar.cc/150?u=alice" },
  { id: 2, name: "Bob", image_url: "https://i.pravatar.cc/150?u=bob" },
  { id: 3, name: "Charlie", image_url: "https://i.pravatar.cc/150?u=charlie" },
  { id: 4, name: "Diana", image_url: "https://i.pravatar.cc/150?u=diana" },
  { id: 5, name: "Eve", image_url: "https://i.pravatar.cc/150?u=eve" },
  { id: 6, name: "Frank", image_url: "https://i.pravatar.cc/150?u=frank" },
  { id: 7, name: "Grace", image_url: "https://i.pravatar.cc/150?u=grace" },
  { id: 8, name: "Henry", image_url: "https://i.pravatar.cc/150?u=henry" },
];

export default function CatppuccinPage() {
  return (
    <div className="min-h-screen bg-[#1E1E2E] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants/retro"
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#6C7086] transition-colors hover:text-[#CBA6F7]"
          >
            ← Back to Retro Variants
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#CDD6F4] lg:text-4xl">
                <span className="text-[#F5C2E7]">🐱</span> Catppuccin
              </h1>
              <p className="mt-1 text-sm text-[#6C7086]">
                Active Season • Winter 2024
              </p>
            </div>
            <Badge variant="active">Live</Badge>
          </div>
        </header>

        {/* Decorative color bar */}
        <div className="mb-8 flex h-1 overflow-hidden rounded-full">
          <div className="flex-1 bg-[#F38BA8]" />
          <div className="flex-1 bg-[#FAB387]" />
          <div className="flex-1 bg-[#F9E2AF]" />
          <div className="flex-1 bg-[#A6E3A1]" />
          <div className="flex-1 bg-[#94E2D5]" />
          <div className="flex-1 bg-[#89B4FA]" />
          <div className="flex-1 bg-[#CBA6F7]" />
          <div className="flex-1 bg-[#F5C2E7]" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card title="Recent Games">
              <div className="space-y-4">
                <GameCard
                  redTeam={[demoPlayers[0], demoPlayers[1]]}
                  blueTeam={[demoPlayers[2], demoPlayers[3]]}
                  redScore={10}
                  blueScore={7}
                />
                <GameCard
                  redTeam={[demoPlayers[4], demoPlayers[5]]}
                  blueTeam={[demoPlayers[6], demoPlayers[7]]}
                  redScore={5}
                  blueScore={10}
                />
              </div>
            </Card>

            <Card title="Performance Over Time">
              <Chart players={demoPlayers} />
            </Card>

            <Card title="Quick Actions">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">New Game</Button>
                <Button variant="secondary">Add Player</Button>
                <Button variant="outline">View All</Button>
              </div>
            </Card>

            <Card title="Record a Match">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Red Team Score" type="number" placeholder="0" />
                <Input label="Blue Team Score" type="number" placeholder="0" />
              </div>
              <div className="mt-4">
                <Button variant="primary">Save Game</Button>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <StatsCard
              title="Win Rate"
              items={[
                { player: demoPlayers[0], value: "78%", highlight: true },
                { player: demoPlayers[1], value: "65%" },
                { player: demoPlayers[2], value: "52%" },
                { player: demoPlayers[3], value: "48%" },
              ]}
            />

            <StatsCard
              title="Top Scorers"
              items={[
                { player: demoPlayers[1], value: "142 goals", highlight: true },
                { player: demoPlayers[0], value: "128 goals" },
                { player: demoPlayers[4], value: "95 goals" },
                { player: demoPlayers[5], value: "87 goals" },
              ]}
            />

            <Card title="Season Status">
              <div className="flex flex-wrap gap-2">
                <Badge variant="active">Active</Badge>
                <Badge variant="upcoming">Upcoming</Badge>
                <Badge variant="completed">Completed</Badge>
                <Badge variant="winner">Champion</Badge>
              </div>
            </Card>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-xs text-[#6C7086]">
            Tablesucker • Catppuccin Mocha Theme • {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
