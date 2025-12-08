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

export default function PubLeaguePage() {
  return (
    <div className="min-h-screen bg-[#0D3B0F] p-6 lg:p-8">
      {/* Pitch stripe overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            rgba(255,255,255,0.1) 50px,
            rgba(255,255,255,0.1) 100px
          )`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants/retro"
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#4CAF50] transition-colors hover:text-[#FDD835]"
          >
            ← Back to Retro
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl">⚽</span>
                <h1 className="text-4xl font-black uppercase tracking-wide text-[#FDD835] lg:text-5xl">
                  Pub League
                </h1>
              </div>
              <p className="mt-1 text-sm text-[#A5D6A7]">
                Season 2024 • Matchday 12 • Tuesday Night Football
              </p>
            </div>
            <Badge variant="active">● LIVE</Badge>
          </div>
        </header>

        {/* League banner */}
        <div
          className="mb-8 overflow-hidden rounded-xl border-2 border-[#2E7D32]"
          style={{ background: "linear-gradient(to right, #1B5E20, #2E7D32, #1B5E20)" }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span className="font-bold uppercase tracking-wider text-[#FDD835]">
                Division One
              </span>
            </div>
            <div className="text-center">
              <span className="text-sm font-bold text-[#A5D6A7]">Prize Pool</span>
              <div className="text-2xl font-black text-[#FDD835]">£50</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-[#FDD835]">
                The Crown & Anchor
              </span>
              <span className="text-2xl">🍻</span>
            </div>
          </div>
          {/* Pitch stripes */}
          <div className="flex h-3">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 ${i % 2 === 0 ? "bg-[#2E7D32]" : "bg-[#388E3C]"}`}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card title="⚽ Live Matches">
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

            <Card title="📊 League Stats">
              <Chart players={demoPlayers} />
            </Card>

            <Card title="🎯 Actions">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">New Match</Button>
                <Button variant="secondary">Add Player</Button>
                <Button variant="outline">League Table</Button>
              </div>
            </Card>

            <Card title="📝 Enter Score">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Home" type="number" placeholder="0" />
                <Input label="Away" type="number" placeholder="0" />
              </div>
              <div className="mt-4">
                <Button variant="primary">Submit</Button>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <StatsCard
              title="🏆 Win Rate"
              items={[
                { player: demoPlayers[0], value: "78%", highlight: true },
                { player: demoPlayers[1], value: "65%" },
                { player: demoPlayers[2], value: "52%" },
                { player: demoPlayers[3], value: "48%" },
              ]}
            />

            <StatsCard
              title="⚡ Top Scorers"
              items={[
                { player: demoPlayers[1], value: "142", highlight: true },
                { player: demoPlayers[0], value: "128" },
                { player: demoPlayers[4], value: "95" },
                { player: demoPlayers[5], value: "87" },
              ]}
            />

            <Card title="📋 Status">
              <div className="flex flex-wrap gap-2">
                <Badge variant="active">Live</Badge>
                <Badge variant="upcoming">Next</Badge>
                <Badge variant="completed">Full Time</Badge>
                <Badge variant="winner">Winner</Badge>
              </div>
            </Card>

            <Card title="🍺 Next Round">
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-[#0D3B0F] p-3 border border-[#2E7D32]">
                  <span className="text-[#A5D6A7]">Tuesday 8pm</span>
                  <span className="font-bold text-[#FDD835]">Week 13</span>
                </div>
                <p className="text-center text-[#4CAF50] italic">
                  "Loser buys the round!"
                </p>
              </div>
            </Card>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-xs text-[#4CAF50]">
            ⚽ TABLESUCKER PUB LEAGUE • EST. 2024 • "IT'S NOT JUST A GAME, IT'S A LIFESTYLE" ⚽
          </p>
        </footer>
      </div>
    </div>
  );
}
