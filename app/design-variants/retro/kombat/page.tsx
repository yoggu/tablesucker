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
  { id: 1, name: "Scorpion", image_url: "https://i.pravatar.cc/150?u=scorpion" },
  { id: 2, name: "Sub-Zero", image_url: "https://i.pravatar.cc/150?u=subzero" },
  { id: 3, name: "Raiden", image_url: "https://i.pravatar.cc/150?u=raiden" },
  { id: 4, name: "Liu Kang", image_url: "https://i.pravatar.cc/150?u=liukang" },
  { id: 5, name: "Kitana", image_url: "https://i.pravatar.cc/150?u=kitana" },
  { id: 6, name: "Johnny", image_url: "https://i.pravatar.cc/150?u=johnny" },
  { id: 7, name: "Sonya", image_url: "https://i.pravatar.cc/150?u=sonya" },
  { id: 8, name: "Jax", image_url: "https://i.pravatar.cc/150?u=jax" },
];

export default function KombatVariantPage() {
  return (
    <div className="relative min-h-screen bg-[#2a2a2a] p-8 transition-colors dark:bg-[#0a0a0a]">
      {/* Blood Splatter Texture */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10">
        <div className="absolute right-10 top-20 h-32 w-32 rounded-full bg-[#8B0000] blur-xl" />
        <div className="absolute bottom-40 left-20 h-24 w-24 rounded-full bg-[#8B0000] blur-xl" />
      </div>

      {/* Dragon Logo Watermark */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-5">
        <div className="text-[300px] font-black text-[#FFD700]">龍</div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/design-variants/retro"
              className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-[#FFD700] hover:text-[#FF4500]"
            >
              ← BACK
            </Link>
            <h1 className="text-5xl font-black uppercase tracking-tight text-[#FFD700] [text-shadow:0_0_20px_#FF4500,0_4px_0_#8B0000,0_8px_0_#4a0000]">
              MORTAL KOMBAT
            </h1>
            <p className="mt-2 animate-pulse text-sm font-black uppercase tracking-widest text-[#FF4500]">
              ⚔️ FIGHT! ⚔️
            </p>
          </div>
          <Badge variant="active">ROUND 1</Badge>
        </div>

        {/* VS Banner */}
        <div className="mb-8 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse bg-[#FF4500] blur-xl opacity-50" />
            <div className="relative border-4 border-[#FFD700] bg-gradient-to-r from-[#8B0000] via-[#000] to-[#8B0000] px-12 py-4">
              <span className="text-4xl font-black text-[#FFD700] [text-shadow:0_0_10px_#FF4500]">
                CHOOSE YOUR FIGHTER
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-6 gap-6">
          {/* Left Column */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
            <Card title="BATTLE HISTORY">
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

            <Card title="FATALITY ZONE">
              <div className="flex h-[160px] items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 text-6xl font-black text-[#FF4500] [text-shadow:0_0_20px_#FF4500]">
                    FINISH HIM!
                  </div>
                  <div className="flex justify-center gap-4">
                    {['↓', '→', '↓', '→', 'P'].map((key, i) => (
                      <div
                        key={i}
                        className="flex h-12 w-12 items-center justify-center border-4 border-[#FFD700] bg-[#1a1a1a] text-xl font-black text-[#FFD700]"
                      >
                        {key}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card title="KOMBAT MOVES">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">ATTACK</Button>
                <Button variant="secondary">BLOCK</Button>
                <Button variant="outline">SPECIAL</Button>
                <Button variant="ghost">FATALITY</Button>
              </div>
            </Card>

            <Card title="ENTER KOMBATANT">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="FIGHTER NAME:" placeholder="Enter name..." />
                <Input label="WINS:" type="number" placeholder="0" />
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-2">
            <StatsCard
              title="TOWER RANKINGS"
              items={[
                { player: demoPlayers[0], value: "78%", highlight: true },
                { player: demoPlayers[1], value: "65%" },
                { player: demoPlayers[2], value: "52%" },
                { player: demoPlayers[3], value: "48%" },
              ]}
            />
            <StatsCard
              title="FLAWLESS VICTORIES"
              items={[
                { player: demoPlayers[1], value: "142", highlight: true },
                { player: demoPlayers[0], value: "128" },
                { player: demoPlayers[4], value: "95" },
                { player: demoPlayers[5], value: "87" },
              ]}
            />

            <Card title="BATTLE STATUS">
              <div className="flex flex-wrap gap-2">
                <Badge variant="active">FIGHTING</Badge>
                <Badge variant="upcoming">NEXT</Badge>
                <Badge variant="completed">K.O.</Badge>
                <Badge variant="winner">CHAMPION</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-block border-4 border-[#FFD700] bg-gradient-to-r from-[#8B0000] via-[#1a1a1a] to-[#8B0000] px-8 py-3">
            <span className="font-black uppercase tracking-widest text-[#FFD700]">
              TABLESUCKER KOMBAT EDITION © 1992
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
