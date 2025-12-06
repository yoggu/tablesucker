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

export default function FoosballPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#EFEBE9] transition-colors dark:bg-[#0D0A08]">
      {/* Wood panel background pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wood'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02 0.15' numOctaves='3' seed='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wood)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Green felt accent strip at top */}
      <div className="absolute left-0 right-0 top-0 z-0 h-2 bg-gradient-to-r from-[#2E7D32] via-[#4CAF50] to-[#2E7D32] dark:from-[#1B5E20] dark:via-[#2E7D32] dark:to-[#1B5E20]" />

      {/* Side rails */}
      <div className="pointer-events-none fixed bottom-0 left-0 top-0 z-20 w-3 bg-gradient-to-r from-[#5D4037] to-[#6D4C41] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.3)] dark:from-[#3E2723] dark:to-[#4E342E]" />
      <div className="pointer-events-none fixed bottom-0 right-0 top-0 z-20 w-3 bg-gradient-to-l from-[#5D4037] to-[#6D4C41] shadow-[inset_2px_0_4px_rgba(0,0,0,0.3)] dark:from-[#3E2723] dark:to-[#4E342E]" />

      <div className="relative z-10 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <header className="mb-8">
            <Link
              href="/design-variants/retro"
              className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-[#5D4037] transition-colors hover:text-[#4CAF50] dark:text-[#8D6E63] dark:hover:text-[#66BB6A]"
            >
              ← Back to Retro Variants
            </Link>

            {/* Title with foosball rod styling */}
            <div className="relative mb-4">
              <div className="flex items-center gap-4">
                {/* Left rod handle */}
                <div className="hidden h-8 w-16 rounded-full bg-gradient-to-r from-[#1A1A1A] to-[#333] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)] sm:block" />

                <h1 className="text-4xl font-black uppercase tracking-tight text-[#3E2723] dark:text-[#D7CCC8] lg:text-5xl">
                  <span className="text-[#E53935]">Table</span>
                  <span className="text-[#1E88E5]">sucker</span>
                </h1>

                {/* Right rod handle */}
                <div className="hidden h-8 w-16 rounded-full bg-gradient-to-r from-[#333] to-[#1A1A1A] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)] sm:block" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-[#5D4037] dark:text-[#8D6E63]">
                Active Season — Winter 2024
              </p>
              <Badge variant="active">Live Match</Badge>
            </div>
          </header>

          {/* Metal rod divider */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-transparent via-[#9E9E9E] to-transparent shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:via-[#616161]" />
            <div className="flex gap-1">
              <div className="h-4 w-4 rounded-full bg-[#E53935] shadow-md" />
              <div className="h-4 w-4 rounded-full bg-[#1E88E5] shadow-md" />
            </div>
            <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-transparent via-[#9E9E9E] to-transparent shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:via-[#616161]" />
          </div>

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Recent Games */}
              <Card title="Recent Matches">
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
              <Card title="Performance Over Time">
                <Chart players={demoPlayers} />
              </Card>

              {/* Actions */}
              <Card title="Quick Actions">
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">New Match</Button>
                  <Button variant="secondary">Add Player</Button>
                  <Button variant="outline">View All</Button>
                </div>
              </Card>

              {/* Form */}
              <Card title="Record a Match">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Red Team Score" type="number" placeholder="0" />
                  <Input label="Blue Team Score" type="number" placeholder="0" />
                </div>
                <div className="mt-4">
                  <Button variant="primary">Save Match</Button>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
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
                  <Badge variant="upcoming">Coming Soon</Badge>
                  <Badge variant="completed">Concluded</Badge>
                  <Badge variant="winner">Champion!</Badge>
                </div>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-4">
              <div className="h-1 w-16 rounded-full bg-[#5D4037]/30 dark:bg-[#8D6E63]/20" />
              <span className="text-xl">⚽</span>
              <div className="h-1 w-16 rounded-full bg-[#5D4037]/30 dark:bg-[#8D6E63]/20" />
            </div>
            <p className="text-sm text-[#8D6E63]/70 dark:text-[#6D4C41]/70">
              Tablesucker — Foosball Stats Tracker
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
