import { Card } from "./components/card";
import { Button } from "./components/button";
import { Badge } from "./components/badge";
import { Input } from "./components/input";
import { GameCard } from "./components/game-card";
import { StatsCard } from "./components/stats-card";
import { DemoPlayer } from "./components/player-avatar";
import { Chart } from "./components/chart";
import Link from "next/link";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const demoPlayers: DemoPlayer[] = [
  { id: 1, name: "PLAYER1", image_url: null },
  { id: 2, name: "PLAYER2", image_url: null },
  { id: 3, name: "PLAYER3", image_url: null },
  { id: 4, name: "PLAYER4", image_url: null },
];

export default function GameBoyVariantPage() {
  return (
    <div className={`relative min-h-screen bg-[#9BBC0F] p-8 transition-colors dark:bg-[#0a0a14] ${pressStart2P.className}`}>
      {/* Pixel grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 opacity-10 bg-[repeating-linear-gradient(0deg,#0F380F_0px,#0F380F_1px,transparent_1px,transparent_4px),repeating-linear-gradient(90deg,#0F380F_0px,#0F380F_1px,transparent_1px,transparent_4px)] dark:opacity-5 dark:bg-[repeating-linear-gradient(0deg,#6868a8_0px,#6868a8_1px,transparent_1px,transparent_4px),repeating-linear-gradient(90deg,#6868a8_0px,#6868a8_1px,transparent_1px,transparent_4px)]" />

      {/* LCD screen effect */}
      <div className="pointer-events-none fixed inset-0 z-30 bg-gradient-to-b from-transparent via-[#0F380F]/5 to-[#0F380F]/10 dark:via-[#000]/5 dark:to-[#000]/20" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Link
          href="/design-variants/retro"
          className="mb-6 inline-block text-sm font-bold text-[#0F380F] hover:underline dark:text-[#6868a8]"
        >
          ◀ BACK
        </Link>

        <h1 className="mb-2 text-2xl font-bold text-[#0F380F] dark:text-[#8888c8]">
          GAME BOY
        </h1>
        <p className="mb-8 text-xs text-[#306230] dark:text-[#4a4a6a]">
          DOT MATRIX WITH STEREO SOUND
        </p>

        {/* Buttons */}
        <Card title="BUTTONS">
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">A BUTTON</Button>
            <Button variant="secondary">B BUTTON</Button>
            <Button variant="outline">SELECT</Button>
            <Button variant="ghost">START</Button>
          </div>
        </Card>

        {/* Badges */}
        <Card title="STATUS">
          <div className="flex flex-wrap gap-3">
            <Badge variant="active">● PLAYING</Badge>
            <Badge variant="upcoming">PAUSED</Badge>
            <Badge variant="completed">GAME OVER</Badge>
            <Badge variant="winner">★ HIGH SCORE</Badge>
          </div>
        </Card>

        {/* Input */}
        <Card title="ENTER NAME">
          <Input label="PLAYER NAME" placeholder="AAA" />
        </Card>

        {/* Chart */}
        <Card title="STATS">
          <Chart />
        </Card>

        {/* Game Card */}
        <div className="mt-6">
          <h2 className="mb-4 text-sm font-bold text-[#0F380F] dark:text-[#9898b8]">
            MATCH RESULT
          </h2>
          <GameCard
            redTeam={[demoPlayers[0], demoPlayers[1]]}
            blueTeam={[demoPlayers[2], demoPlayers[3]]}
            redScore={10}
            blueScore={7}
          />
        </div>

        {/* Stats Cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <StatsCard
            title="TOP SCORERS"
            items={[
              { player: demoPlayers[0], value: "99", highlight: true },
              { player: demoPlayers[1], value: "87" },
              { player: demoPlayers[2], value: "65" },
            ]}
          />
          <StatsCard
            title="WIN RATE"
            items={[
              { player: demoPlayers[2], value: "80%", highlight: true },
              { player: demoPlayers[0], value: "75%" },
              { player: demoPlayers[3], value: "60%" },
            ]}
          />
        </div>

        <div className="mt-12 text-center text-xs text-[#306230] dark:text-[#4a4a6a]">
          © TABLESUCKER™
        </div>
      </div>
    </div>
  );
}
