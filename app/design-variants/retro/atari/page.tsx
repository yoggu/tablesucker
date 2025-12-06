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

export default function AtariVariantPage() {
  return (
    <div className="relative min-h-screen bg-[#F5E6D3] p-8 transition-colors dark:bg-[#1a1a2e]">
      {/* Pixel Grid Overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
        backgroundSize: '4px 4px'
      }} />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/design-variants/retro"
              className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-[#FF6600] hover:text-[#FF9900] dark:text-[#FFCC00] dark:hover:text-[#FFE066]"
            >
              ◄ BACK
            </Link>
            <h1 className="text-5xl font-black uppercase tracking-tight text-[#FF6600] dark:text-[#FFCC00] dark:[text-shadow:0_0_20px_#FF6600,0_4px_0_#CC5200]" style={{ fontFamily: 'system-ui' }}>
              ATARI ARCADE
            </h1>
            <p className="mt-2 text-sm font-bold uppercase tracking-widest text-[#8B4513] dark:text-[#FFCC00]/60">
              ★ INSERT COIN TO PLAY ★
            </p>
          </div>
          <Badge variant="active">PLAYER 1</Badge>
        </div>

        {/* Score Display */}
        <div className="mb-8 flex justify-center">
          <div className="border-4 border-[#FF6600] bg-black px-8 py-4 dark:border-[#FFCC00]">
            <div className="text-center font-mono text-xs text-[#FF6600] dark:text-[#FFCC00]">HIGH SCORE</div>
            <div className="text-center font-mono text-4xl font-bold text-[#FF6600] dark:text-[#FFCC00] dark:[text-shadow:0_0_10px_#FFCC00]">
              999,999
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-6 gap-6">
          {/* Left Column */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
            <Card title="BATTLE LOG">
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

            <Card title="POWER UPS">
              <div className="flex h-[160px] items-center justify-center">
                <div className="grid grid-cols-4 gap-4">
                  {['🎮', '🕹️', '👾', '🚀'].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-16 w-16 items-center justify-center border-4 border-[#FF6600] bg-black text-3xl dark:border-[#FFCC00]"
                      style={{ animation: `pulse 1s ease-in-out ${i * 0.2}s infinite` }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card title="CONTROLS">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">START</Button>
                <Button variant="secondary">SELECT</Button>
                <Button variant="outline">PAUSE</Button>
                <Button variant="ghost">MENU</Button>
              </div>
            </Card>

            <Card title="ENTER NAME">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="PLAYER:" placeholder="AAA" />
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
              title="TOP SCORES"
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
                <Badge variant="completed">GAME OVER</Badge>
                <Badge variant="winner">CHAMPION</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-block border-4 border-[#FF6600] bg-black px-6 py-2 dark:border-[#FFCC00]">
            <span className="font-bold uppercase tracking-widest text-[#FF6600] dark:text-[#FFCC00]">
              © 1982 TABLESUCKER INC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
