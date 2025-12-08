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

export default function VintageFoosballPage() {
  return (
    <div
      className="min-h-screen p-6 lg:p-8"
      style={{
        background: "linear-gradient(180deg, #3D2914 0%, #2A1B0E 50%, #3D2914 100%)",
      }}
    >
      {/* Subtle wood grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.05]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 4px,
            rgba(139,115,85,0.3) 4px,
            rgba(139,115,85,0.3) 5px
          )`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants/retro"
            className="mb-3 inline-flex items-center gap-2 font-serif text-sm text-[#8B7355] transition-colors hover:text-[#DEB887]"
          >
            ← Back to Retro
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1
                className="font-serif text-4xl font-bold italic text-[#DEB887] lg:text-5xl"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                Vintage Foosball
              </h1>
              <p className="mt-2 font-serif text-sm italic text-[#8B7355]">
                Season 2024 • Championship Series • Match XII
              </p>
            </div>
            <Badge variant="active">● In Play</Badge>
          </div>
        </header>

        {/* Decorative brass plate banner */}
        <div
          className="mb-8 rounded border-2 border-[#8B7355] p-1"
          style={{
            background: "linear-gradient(to bottom, #B8860B, #8B6914)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <div
            className="rounded px-6 py-3 text-center"
            style={{
              background: "linear-gradient(to bottom, #DAA520, #B8860B)",
            }}
          >
            <span
              className="font-serif text-lg font-bold tracking-wide text-[#3D2914]"
              style={{ textShadow: "1px 1px 0 rgba(255,255,255,0.3)" }}
            >
              ★ TABLESUCKER CHAMPIONSHIP ★
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card title="Current Matches">
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

            <Card title="Performance History">
              <Chart players={demoPlayers} />
            </Card>

            <Card title="Actions">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">New Match</Button>
                <Button variant="secondary">Add Player</Button>
                <Button variant="outline">View Archives</Button>
              </div>
            </Card>

            <Card title="Record Score">
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

            <Card title="Match Status">
              <div className="flex flex-wrap gap-2">
                <Badge variant="active">In Play</Badge>
                <Badge variant="upcoming">Upcoming</Badge>
                <Badge variant="completed">Final</Badge>
                <Badge variant="winner">Champion</Badge>
              </div>
            </Card>

            {/* Vintage rules plaque */}
            <Card title="House Rules">
              <div className="space-y-2 font-serif text-sm italic text-[#DEB887]/80">
                <p>I. First to 10 goals wins</p>
                <p>II. No spinning allowed</p>
                <p>III. Winner stays on</p>
                <p>IV. Loser buys drinks</p>
              </div>
            </Card>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <div
            className="mx-auto inline-block rounded border-2 border-[#8B7355] px-8 py-2"
            style={{
              background: "linear-gradient(to bottom, #B8860B, #8B6914)",
            }}
          >
            <p
              className="font-serif text-sm font-bold text-[#3D2914]"
              style={{ textShadow: "1px 1px 0 rgba(255,255,255,0.2)" }}
            >
              Est. 2024 • Tablesucker
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
