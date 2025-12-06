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

export default function CupheadPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F5E6D3] transition-colors dark:bg-[#0D0804]">
      {/* Watercolor/Paper Texture Background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-30 dark:opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Sepia Tint / Warm glow */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[#D4A574] opacity-[0.08] dark:bg-gradient-to-b dark:from-[#D4A574]/5 dark:via-transparent dark:to-transparent dark:opacity-100" />

      {/* Vignette Effect */}
      <div className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(90,60,30,0.3)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

      {/* Film Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[3] opacity-[0.08] mix-blend-multiply dark:opacity-[0.12] dark:mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header - Vintage Banner Style */}
          <header className="mb-8">
            <Link
              href="/design-variants/retro"
              className="mb-3 inline-flex items-center gap-2 font-serif text-sm font-bold text-[#8B4513] transition-colors hover:text-[#C41E3A] dark:text-[#D4A574] dark:hover:text-[#DAA520]"
            >
              ← Back to Retro Variants
            </Link>

            {/* Title Banner */}
            <div className="relative mb-4 inline-block">
              <div className="absolute -inset-2 rounded-sm bg-[#8B4513] opacity-10 dark:opacity-0" />
              <h1
                className="relative font-serif text-5xl font-black italic tracking-tight text-[#5D3A1A] dark:text-[#D4A574] lg:text-6xl"
                style={{
                  textShadow: '3px 3px 0 #D4A574, 4px 4px 0 #8B4513',
                }}
              >
                A Brawl is Surely Brewing!
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-serif text-lg italic text-[#8B4513] dark:text-[#8B4513]">
                Active Season — Winter 1930
              </p>
              <Badge variant="active">Now Playing!</Badge>
            </div>
          </header>

          {/* Decorative Divider */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-[#8B4513] to-transparent opacity-30 dark:opacity-20" />
            <span className="font-serif text-2xl text-[#8B4513] dark:text-[#DAA520]">❧</span>
            <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-[#8B4513] to-transparent opacity-30 dark:opacity-20" />
          </div>

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Recent Games */}
              <Card title="Recent Bouts">
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

          {/* Footer - Vintage Style */}
          <footer className="mt-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-4">
              <div className="h-0.5 w-16 bg-[#8B4513] opacity-30 dark:bg-[#D4A574] dark:opacity-20" />
              <span className="font-serif text-xl text-[#8B4513] dark:text-[#DAA520]">☙</span>
              <div className="h-0.5 w-16 bg-[#8B4513] opacity-30 dark:bg-[#D4A574] dark:opacity-20" />
            </div>
            <p className="font-serif text-sm italic text-[#8B4513]/70 dark:text-[#8B4513]/70">
              Tablesucker Studios presents... A Swell Time! — Est. 1930
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
