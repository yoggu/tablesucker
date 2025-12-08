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

export default function SubbuteoPage() {
  return (
    <div
      className="min-h-screen p-6 lg:p-8"
      style={{
        background: "linear-gradient(180deg, #E8DCC4 0%, #F5F5DC 50%, #E8DCC4 100%)",
      }}
    >
      {/* Subtle baize texture */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: "4px 4px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants/retro"
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#8B4513] transition-colors hover:text-[#4A7C23]"
          >
            ← Back to Retro
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1
                className="text-4xl font-black uppercase tracking-wide text-[#2D5016] lg:text-5xl"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}
              >
                Subbuteo
              </h1>
              <p className="mt-1 text-sm font-semibold text-[#8B4513]">
                Table Football • Championship Edition • Since 1947
              </p>
            </div>
            <Badge variant="active">● In Play</Badge>
          </div>
        </header>

        {/* Classic box design banner */}
        <div
          className="mb-8 overflow-hidden rounded-xl border-4 border-[#8B4513]"
          style={{
            background: "linear-gradient(135deg, #4A7C23 0%, #2D5016 100%)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Miniature player silhouette */}
              <div className="relative">
                <div className="h-12 w-8 rounded-full bg-gradient-to-b from-[#C41E3A] to-[#8B0000]" />
                <div className="absolute -bottom-1 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-[#1A1A1A]" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">FLICK TO KICK</div>
                <div className="text-sm text-white/70">The Original Table Football Game</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/70">Est.</div>
              <div className="text-3xl font-black text-[#FFD700]">1947</div>
            </div>
          </div>
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

            <Card title="Season Statistics">
              <Chart players={demoPlayers} />
            </Card>

            <Card title="Actions">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">New Match</Button>
                <Button variant="secondary">Add Player</Button>
                <Button variant="outline">View All</Button>
              </div>
            </Card>

            <Card title="Enter Score">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Red Team" type="number" placeholder="0" />
                <Input label="Blue Team" type="number" placeholder="0" />
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
                <Badge variant="active">In Play</Badge>
                <Badge variant="upcoming">Next</Badge>
                <Badge variant="completed">Final</Badge>
                <Badge variant="winner">Champion</Badge>
              </div>
            </Card>

            <Card title="Equipment">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-white border border-[#8B4513]/30 shadow-sm" />
                  <span className="text-[#8B4513]">Official Match Ball</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-sm bg-[#4A7C23] border border-[#2D5016]" />
                  <span className="text-[#8B4513]">Astropitch Surface</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    <div className="h-4 w-2 rounded-sm bg-[#C41E3A]" />
                    <div className="h-4 w-2 rounded-sm bg-[#1E90FF]" />
                  </div>
                  <span className="text-[#8B4513]">Team Figures (22)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-sm font-semibold text-[#8B4513]">
            SUBBUTEO® • TABLESUCKER EDITION • "THE GAME YOU PLAY ON YOUR TABLE"
          </p>
        </footer>
      </div>
    </div>
  );
}
