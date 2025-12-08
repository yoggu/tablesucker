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

export default function Fifa98Page() {
  return (
    <div
      className="min-h-screen p-6 lg:p-8"
      style={{
        background: "linear-gradient(180deg, #0D1F33 0%, #1E3A5F 50%, #0D1F33 100%)",
      }}
    >
      {/* CRT scanline effect */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants/retro"
            className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-[#C0C0C0] transition-colors hover:text-[#FFD700]"
          >
            ← BACK
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              {/* EA Sports style header */}
              <div
                className="mb-2 inline-block rounded px-4 py-1"
                style={{ background: "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)" }}
              >
                <span className="text-xs font-black uppercase tracking-widest text-[#0D1F33]">
                  EA Sports
                </span>
              </div>
              <h1
                className="text-4xl font-black uppercase tracking-wide text-[#FFD700] lg:text-5xl"
                style={{
                  textShadow: "0 0 30px rgba(255,215,0,0.5), 2px 2px 0 #FFA500",
                  fontFamily: "Impact, sans-serif",
                }}
              >
                FIFA 98
              </h1>
              <p className="mt-1 font-bold uppercase tracking-wider text-[#C0C0C0]">
                Road to World Cup • Season Mode
              </p>
            </div>
            <Badge variant="active">● LIVE</Badge>
          </div>
        </header>

        {/* Tournament banner */}
        <div
          className="mb-8 overflow-hidden rounded border-2 border-[#FFD700]"
          style={{ background: "linear-gradient(90deg, #0D1F33, #1E3A5F, #0D1F33)" }}
        >
          <div
            className="py-1 text-center text-xs font-black uppercase tracking-widest text-[#0D1F33]"
            style={{ background: "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)" }}
          >
            World Cup France 98
          </div>
          <div className="flex items-center justify-center gap-8 py-4">
            <div className="text-center">
              <div className="text-2xl font-black text-[#FFD700]">32</div>
              <div className="text-xs font-bold text-[#C0C0C0]">TEAMS</div>
            </div>
            <div className="h-8 w-px bg-[#FFD700]" />
            <div className="text-center">
              <div className="text-2xl font-black text-[#FFD700]">64</div>
              <div className="text-xs font-bold text-[#C0C0C0]">MATCHES</div>
            </div>
            <div className="h-8 w-px bg-[#FFD700]" />
            <div className="text-center">
              <div className="text-2xl font-black text-[#FFD700]">1</div>
              <div className="text-xs font-bold text-[#C0C0C0]">CHAMPION</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card title="LIVE MATCHES">
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

            <Card title="STATISTICS">
              <Chart players={demoPlayers} />
            </Card>

            <Card title="MENU">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">New Match</Button>
                <Button variant="secondary">Add Player</Button>
                <Button variant="outline">View All</Button>
              </div>
            </Card>

            <Card title="ENTER SCORE">
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
              title="WIN RATE"
              items={[
                { player: demoPlayers[0], value: "78%", highlight: true },
                { player: demoPlayers[1], value: "65%" },
                { player: demoPlayers[2], value: "52%" },
                { player: demoPlayers[3], value: "48%" },
              ]}
            />

            <StatsCard
              title="TOP SCORERS"
              items={[
                { player: demoPlayers[1], value: "142", highlight: true },
                { player: demoPlayers[0], value: "128" },
                { player: demoPlayers[4], value: "95" },
                { player: demoPlayers[5], value: "87" },
              ]}
            />

            <Card title="STATUS">
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
          <div
            className="inline-block rounded px-6 py-2"
            style={{ background: "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)" }}
          >
            <p className="text-xs font-black uppercase tracking-widest text-[#0D1F33]">
              IT'S IN THE GAME
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
