import Link from "next/link";
import { Card } from "./components/card";
import { Button } from "./components/button";
import { Badge } from "./components/badge";
import { Input } from "./components/input";
import { GameCard } from "./components/game-card";
import { StatsCard } from "./components/stats-card";
import { DemoPlayer } from "./components/player-avatar";

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

export default function SynthwaveVariantPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FFE4EC] via-[#E0B0FF] to-[#87CEEB] p-8 transition-colors dark:from-[#0d0221] dark:via-[#1a0533] dark:to-[#2d1b4e]">
      {/* Sunset/Grid Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Sun */}
        <div className="absolute bottom-[20%] left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FF6B9D] to-[#FFB347] opacity-30 blur-sm dark:from-[#FF1493] dark:to-[#FF6B00] dark:opacity-60" />

        {/* Grid Floor */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%] opacity-20 dark:opacity-40"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #FF00FF 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
          }}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, #FF00FF 1px, transparent 1px),
                linear-gradient(0deg, #FF00FF 1px, transparent 1px)
              `,
              backgroundSize: '60px 30px',
              transform: 'perspective(200px) rotateX(60deg)',
              transformOrigin: 'bottom',
            }}
          />
        </div>
      </div>

      {/* Chrome/Neon Glow Overlay */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-gradient-to-t from-transparent via-transparent to-[#FF00FF]/5 dark:to-[#FF00FF]/10" />

      <div className="relative z-20 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/design-variants/retro"
              className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-[#FF1493] hover:text-[#00FFFF] dark:text-[#FF00FF] dark:hover:text-[#00FFFF]"
            >
              ← BACK
            </Link>
            <h1
              className="text-5xl font-black uppercase italic tracking-tight text-transparent"
              style={{
                background: 'linear-gradient(180deg, #FF00FF 0%, #00FFFF 50%, #FF00FF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(255,0,255,0.5), 0 0 60px rgba(0,255,255,0.3)',
              }}
            >
              SYNTHWAVE
            </h1>
            <p className="mt-2 text-sm font-bold uppercase tracking-widest text-[#FF1493]/70 dark:text-[#FF00FF]/60">
              ▲ NEON DREAMS ▲
            </p>
          </div>
          <Badge variant="active">ONLINE</Badge>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-6 gap-6">
          {/* Left Column */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
            <Card title="MATCH HISTORY">
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

            <Card title="STATS WAVE">
              <div className="flex h-[180px] items-end justify-around px-4">
                {[65, 80, 45, 90, 70, 55, 85].map((height, i) => (
                  <div
                    key={i}
                    className="w-8 rounded-t-sm bg-gradient-to-t from-[#FF00FF] to-[#00FFFF] dark:shadow-[0_0_15px_rgba(255,0,255,0.5)]"
                    style={{
                      height: `${height}%`,
                      animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`,
                    }}
                  />
                ))}
              </div>
            </Card>

            <Card title="ACTIONS">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">START</Button>
                <Button variant="secondary">BOOST</Button>
                <Button variant="outline">PAUSE</Button>
                <Button variant="ghost">EXIT</Button>
              </div>
            </Card>

            <Card title="PLAYER SETUP">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="HANDLE:" placeholder="Enter name..." />
                <Input label="SCORE:" type="number" placeholder="0" />
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-2">
            <StatsCard
              title="LEADERBOARD"
              items={[
                { player: demoPlayers[0], value: "78%", highlight: true },
                { player: demoPlayers[1], value: "65%" },
                { player: demoPlayers[2], value: "52%" },
                { player: demoPlayers[3], value: "48%" },
              ]}
            />
            <StatsCard
              title="TOP PLAYERS"
              items={[
                { player: demoPlayers[1], value: "142", highlight: true },
                { player: demoPlayers[0], value: "128" },
                { player: demoPlayers[4], value: "95" },
                { player: demoPlayers[5], value: "87" },
              ]}
            />

            <Card title="STATUS">
              <div className="flex flex-wrap gap-2">
                <Badge variant="active">LIVE</Badge>
                <Badge variant="upcoming">NEXT</Badge>
                <Badge variant="completed">DONE</Badge>
                <Badge variant="winner">MVP</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p
            className="text-sm font-bold uppercase tracking-widest"
            style={{
              background: 'linear-gradient(90deg, #FF00FF, #00FFFF, #FF00FF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            ◆ TABLESUCKER NEON EDITION ◆ {new Date().getFullYear()} ◆
          </p>
        </div>
      </div>
    </div>
  );
}
