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

export default function SportsBarPage() {
  return (
    <div
      className="min-h-screen p-6 lg:p-8"
      style={{
        background: "linear-gradient(180deg, #1A0F0A 0%, #0D0705 50%, #1A0F0A 100%)",
      }}
    >
      {/* Wood grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(139,69,19,0.3) 2px,
            rgba(139,69,19,0.3) 4px
          )`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants/retro"
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#8B4513] transition-colors hover:text-[#FFD700]"
          >
            ← Back to Retro
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl">🍺</span>
                <h1
                  className="text-4xl font-black uppercase tracking-wide text-[#FFD700] lg:text-5xl"
                  style={{
                    textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.3)",
                    fontFamily: "Impact, sans-serif",
                  }}
                >
                  Sports Bar
                </h1>
                <span className="text-4xl">⚽</span>
              </div>
              <p className="mt-1 text-sm text-[#8B4513]">
                🏟️ SEASON 2024 • MATCH DAY 12 • HAPPY HOUR
              </p>
            </div>
            <Badge variant="active">● LIVE</Badge>
          </div>
        </header>

        {/* Neon sign style banner */}
        <div
          className="mb-8 flex items-center justify-center gap-4 rounded-lg border-2 border-[#FFD700] bg-[#1A0F0A] py-3"
          style={{
            boxShadow: "0 0 20px rgba(255,215,0,0.2), inset 0 0 20px rgba(255,215,0,0.05)",
          }}
        >
          <span className="text-2xl">📺</span>
          <span
            className="font-bold uppercase tracking-[0.3em] text-[#FFD700]"
            style={{ textShadow: "0 0 10px rgba(255,215,0,0.5)" }}
          >
            Game On TV
          </span>
          <span className="text-2xl">📺</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card title="🎮 Live Matches">
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

            <Card title="📊 Season Stats">
              <Chart players={demoPlayers} />
            </Card>

            <Card title="🎯 Quick Actions">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">New Match</Button>
                <Button variant="secondary">Add Player</Button>
                <Button variant="outline">View All</Button>
              </div>
            </Card>

            <Card title="📝 Enter Score">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Home Team" type="number" placeholder="0" />
                <Input label="Away Team" type="number" placeholder="0" />
              </div>
              <div className="mt-4">
                <Button variant="primary">Submit Score</Button>
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
                <Badge variant="completed">Final</Badge>
                <Badge variant="winner">Winner</Badge>
              </div>
            </Card>

            {/* Specials board */}
            <Card title="🍻 Today's Specials">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#F5E6D3]">
                  <span>🍺 Draft Beer</span>
                  <span className="text-[#FFD700]">$4</span>
                </div>
                <div className="flex justify-between text-[#F5E6D3]">
                  <span>🍕 Pizza Slice</span>
                  <span className="text-[#FFD700]">$3</span>
                </div>
                <div className="flex justify-between text-[#F5E6D3]">
                  <span>🌭 Hot Dog</span>
                  <span className="text-[#FFD700]">$2</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🎱</span>
            <p className="text-xs text-[#8B4513]">
              TABLESUCKER SPORTS BAR • EST. 2024 • "WHERE CHAMPIONS PLAY"
            </p>
            <span className="text-xl">🎱</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
