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

export default function ScoreboardPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 lg:p-8">
      {/* Scanline effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,107,0,0.1) 2px, rgba(255,107,0,0.1) 4px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants/retro"
            className="mb-3 inline-flex items-center gap-2 font-mono text-sm text-[#666] transition-colors hover:text-[#FF6B00]"
          >
            ← BACK
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1
                className="font-mono text-4xl font-black uppercase tracking-wider text-[#FF6B00] lg:text-5xl"
                style={{ textShadow: "0 0 30px rgba(255,107,0,0.5)" }}
              >
                Scoreboard
              </h1>
              <p className="mt-1 font-mono text-sm text-[#666]">
                SEASON 2024 • MATCH DAY 12
              </p>
            </div>
            <Badge variant="active">● LIVE</Badge>
          </div>
        </header>

        {/* LED indicator strip */}
        <div className="mb-8 flex gap-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${i < 14 ? "bg-[#FF6B00]" : "bg-[#333]"}`}
              style={i < 14 ? { boxShadow: "0 0 5px rgba(255,107,0,0.5)" } : {}}
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card title="Live Matches">
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

            <Card title="Statistics">
              <Chart players={demoPlayers} />
            </Card>

            <Card title="Controls">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">New Match</Button>
                <Button variant="secondary">Add Player</Button>
                <Button variant="outline">View All</Button>
              </div>
            </Card>

            <Card title="Enter Score">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Home" type="number" placeholder="00" />
                <Input label="Away" type="number" placeholder="00" />
              </div>
              <div className="mt-4">
                <Button variant="primary">Submit</Button>
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
                { player: demoPlayers[1], value: "142", highlight: true },
                { player: demoPlayers[0], value: "128" },
                { player: demoPlayers[4], value: "95" },
                { player: demoPlayers[5], value: "87" },
              ]}
            />

            <Card title="Status">
              <div className="flex flex-wrap gap-2">
                <Badge variant="active">Live</Badge>
                <Badge variant="upcoming">Next</Badge>
                <Badge variant="completed">Final</Badge>
                <Badge variant="winner">Winner</Badge>
              </div>
            </Card>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className="font-mono text-xs text-[#333]">
            TABLESUCKER STADIUM • EST. 2024
          </p>
        </footer>
      </div>
    </div>
  );
}
