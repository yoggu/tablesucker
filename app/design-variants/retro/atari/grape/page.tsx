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

const chartColors = {
  primary: "#DDA0DD",
  secondary: "#9370DB",
  accent: "#E6E6FA",
  background: "#150a1a",
  grid: "#9370DB30",
  text: "#DDA0DD",
  lines: ["#9370DB", "#DDA0DD", "#E6E6FA", "#6A5ACD"],
};

export default function AtariGrapePage() {
  return (
    <div className="min-h-screen bg-[#150a1a] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants/retro/atari"
            className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#DDA0DD] transition-colors hover:text-[#9370DB]"
          >
            <span className="text-lg">◄</span> Back to Atari Variants
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-[#DDA0DD] lg:text-5xl [text-shadow:4px_4px_0_#9370DB]">
                Grape Arcade
              </h1>
              <p className="mt-2 text-base font-medium text-[#DDA0DD]/70">
                Active Season • Winter 2024
              </p>
            </div>
            <Badge variant="active">LIVE</Badge>
          </div>
        </header>

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

            <Card title="Win Rate Over Time">
              <Chart players={demoPlayers} colors={chartColors} />
            </Card>

            <Card title="Quick Actions">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">New Game</Button>
                <Button variant="secondary">Add Player</Button>
                <Button variant="outline">View All</Button>
              </div>
            </Card>

            <Card title="Add Game">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Red Score" type="number" placeholder="0" />
                <Input label="Blue Score" type="number" placeholder="0" />
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

        <footer className="mt-8 border-t-4 border-[#9370DB]/30 pt-6 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#DDA0DD]/50">
            Tablesucker • Atari Grape Theme • {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
