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

export default function KanagawaPage() {
  return (
    <div className="min-h-screen bg-[#1F1F28] p-6 lg:p-8">
      {/* Subtle wave pattern overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z' fill='%237E9CD8'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "100% auto",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants/retro"
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#727169] transition-colors hover:text-[#7E9CD8]"
          >
            ← Back to Retro Variants
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#DCD7BA] lg:text-4xl">
                <span className="text-[#7E9CD8]">神奈川</span> Kanagawa
              </h1>
              <p className="mt-1 text-sm text-[#727169]">
                Active Season • Winter 2024
              </p>
            </div>
            <Badge variant="active">Live</Badge>
          </div>
        </header>

        {/* Decorative divider */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#54546D] to-transparent" />
          <span className="text-[#7E9CD8]">〜</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#54546D] to-transparent" />
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
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-[#54546D]" />
            <span className="text-[#7E9CD8]">波</span>
            <div className="h-px w-16 bg-[#54546D]" />
          </div>
          <p className="text-xs text-[#727169]">
            Tablesucker • Kanagawa Theme • {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
