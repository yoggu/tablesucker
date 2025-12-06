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

export default function CRTVariantPage() {
  return (
    <div className="relative min-h-screen bg-[#E0F2F1] p-8 transition-colors dark:bg-[#0a0a0a]">
      {/* CRT Scanlines Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15)_0px,rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] dark:bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.3)_0px,rgba(0,0,0,0.3)_1px,transparent_1px,transparent_2px)]" />

      {/* CRT Curvature/Vignette */}
      <div className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* Phosphor Flicker (subtle) */}
      <div className="pointer-events-none fixed inset-0 z-30 animate-pulse opacity-[0.02] dark:bg-[#39FF14]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/design-variants/retro"
              className="mb-2 inline-block font-mono text-sm text-[#006400] hover:underline dark:text-[#39FF14]"
            >
              &lt;-- BACK_TO_RETRO
            </Link>
            <h1 className="font-mono text-5xl font-bold tracking-tight text-[#006400] dark:text-[#39FF14] dark:[text-shadow:0_0_10px_#39FF14,0_0_20px_#39FF14,0_0_40px_#39FF14]">
              CRT_TERMINAL//
            </h1>
            <p className="mt-2 font-mono text-sm text-[#006400]/70 dark:text-[#39FF14]/60">
              &gt; SYSTEM READY_
              <span className="animate-pulse">|</span>
            </p>
          </div>
          <Badge variant="active">ONLINE</Badge>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-6 gap-6">
          {/* Left Column */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
            <Card title="MATCH_HISTORY.log">
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

            <Card title="GRAPH_OUTPUT.dat">
              <div className="flex h-[200px] items-center justify-center border-2 border-dashed border-[#006400]/50 bg-[#006400]/5 dark:border-[#39FF14]/30 dark:bg-[#39FF14]/5">
                <div className="text-center font-mono">
                  <pre className="text-xs text-[#006400] dark:text-[#39FF14]/80">
                    {`     100% |    *
      75% |   **  *
      50% |  ***  **
      25% | **** ****
       0% |___________
           J F M A M J`}
                  </pre>
                  <p className="mt-2 animate-pulse text-xs text-[#006400]/60 dark:text-[#39FF14]/40">
                    RENDERING COMPLETE
                  </p>
                </div>
              </div>
            </Card>

            <Card title="BUTTON_TEST.exe">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">[EXECUTE]</Button>
                <Button variant="secondary">[PROCESS]</Button>
                <Button variant="outline">[CANCEL]</Button>
                <Button variant="ghost">[SKIP]</Button>
              </div>
            </Card>

            <Card title="INPUT_BUFFER.sys">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="USER_ID:" placeholder="enter_name..." />
                <Input label="VALUE:" type="number" placeholder="0" />
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-2">
            <StatsCard
              title="RANKINGS.dat"
              items={[
                { player: demoPlayers[0], value: "78%", highlight: true },
                { player: demoPlayers[1], value: "65%" },
                { player: demoPlayers[2], value: "52%" },
                { player: demoPlayers[3], value: "48%" },
              ]}
            />
            <StatsCard
              title="HIGHSCORES.dat"
              items={[
                { player: demoPlayers[1], value: "142", highlight: true },
                { player: demoPlayers[0], value: "128" },
                { player: demoPlayers[4], value: "95" },
                { player: demoPlayers[5], value: "87" },
              ]}
            />

            <Card title="STATUS.log">
              <div className="flex flex-wrap gap-2">
                <Badge variant="active">ONLINE</Badge>
                <Badge variant="upcoming">QUEUED</Badge>
                <Badge variant="completed">DONE</Badge>
                <Badge variant="winner">MVP</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t-2 border-[#006400]/30 pt-4 text-center font-mono text-xs text-[#006400]/50 dark:border-[#39FF14]/20 dark:text-[#39FF14]/30">
          TABLESUCKER OS v2.0 // 640K OUGHT TO BE ENOUGH FOR ANYBODY // {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
