"use client";

import Link from "next/link";
import { Card } from "../components/card";
import { Button } from "../components/button";
import { Badge } from "../components/badge";
import { Input } from "../components/input";
import { GameCard } from "../components/game-card";
import { StatsCard } from "../components/stats-card";
import { DemoPlayer } from "../components/player-avatar";
import { Chart } from "../components/chart";

// Demo players with sample avatars
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

// Chart colors for Classic Orange theme
const chartColors = {
  primary: "#FFCC00",
  secondary: "#FF6600",
  accent: "#FFE066",
  background: "#1a1a2e",
  grid: "#FF660030",
  text: "#FFCC00",
  lines: ["#FF6600", "#FFCC00", "#FF9933", "#FFE066"],
};

export default function AtariClassicPage() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/design-variants/retro/atari"
            className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#FFCC00] transition-colors hover:text-[#FF6600]"
          >
            <span className="text-lg">◄</span> Back to Atari Variants
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-[#FFCC00] lg:text-5xl [text-shadow:4px_4px_0_#FF6600]">
                Classic Orange
              </h1>
              <p className="mt-2 text-base font-medium text-[#FFCC00]/70">
                Active Season • Winter 2024
              </p>
            </div>
            <Badge variant="active">LIVE</Badge>
          </div>
        </header>

        {/* Main Grid - Improved readability with better spacing */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content - Takes 2 columns on large screens */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Recent Games */}
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

            {/* Win Rate Chart */}
            <Card title="Win Rate Over Time">
              <Chart players={demoPlayers} colors={chartColors} />
            </Card>

            {/* Actions */}
            <Card title="Quick Actions">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">New Game</Button>
                <Button variant="secondary">Add Player</Button>
                <Button variant="outline">View All</Button>
              </div>
            </Card>

            {/* Form */}
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

          {/* Sidebar - Takes 1 column */}
          <div className="flex flex-col gap-6">
            {/* Win Rate Rankings */}
            <StatsCard
              title="Win Rate"
              items={[
                { player: demoPlayers[0], value: "78%", highlight: true },
                { player: demoPlayers[1], value: "65%" },
                { player: demoPlayers[2], value: "52%" },
                { player: demoPlayers[3], value: "48%" },
              ]}
            />

            {/* Top Scorers */}
            <StatsCard
              title="Top Scorers"
              items={[
                { player: demoPlayers[1], value: "142 goals", highlight: true },
                { player: demoPlayers[0], value: "128 goals" },
                { player: demoPlayers[4], value: "95 goals" },
                { player: demoPlayers[5], value: "87 goals" },
              ]}
            />

            {/* Status Badges */}
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

        {/* Footer */}
        <footer className="mt-8 border-t-4 border-[#FF6600]/30 pt-6 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#FFCC00]/50">
            Tablesucker • Atari Classic Theme • {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
