import Link from "next/link";
import { Card } from "./components/card";
import { Button } from "./components/button";
import { Badge } from "./components/badge";
import { Input } from "./components/input";
import { GameCard } from "./components/game-card";
import { StatsCard } from "./components/stats-card";

export default function RetroVariantPage() {
  return (
    <div className="relative min-h-screen bg-[#E0F2F1] p-8 transition-colors dark:bg-[#0D1117]">
      {/* CRT Scanlines Overlay (dark mode only) */}
      <div className="pointer-events-none fixed inset-0 z-50 hidden bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_1px,transparent_1px,transparent_2px)] dark:block" />

      {/* CRT Glow Effect (dark mode only) */}
      <div className="pointer-events-none fixed inset-0 z-40 hidden bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] dark:block" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/design-variants"
              className="mb-2 inline-block font-mono text-sm text-[#FF6B35] hover:underline dark:text-[#39FF14]"
            >
              &lt;-- BACK_TO_MENU
            </Link>
            <h1 className="font-mono text-5xl font-bold tracking-tight text-[#FF6B35] dark:text-[#39FF14] dark:[text-shadow:0_0_10px_#39FF14,0_0_20px_#39FF14,0_0_30px_#39FF14]">
              RETRO//Y2K
            </h1>
            <p className="mt-2 font-mono text-sm text-slate-600 dark:text-[#39FF14]/70">
              [ LOADING NOSTALGIA... 100% COMPLETE ]
            </p>
          </div>
          <Badge variant="active">:: LIVE ::</Badge>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-6 gap-6">
          {/* Left Column */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
            {/* Game Cards */}
            <Card title="RECENT_GAMES.exe">
              <div className="space-y-4">
                <GameCard
                  redTeam={["Alice", "Bob"]}
                  blueTeam={["Charlie", "Diana"]}
                  redScore={10}
                  blueScore={7}
                />
                <GameCard
                  redTeam={["Eve", "Frank"]}
                  blueTeam={["Grace", "Henry"]}
                  redScore={5}
                  blueScore={10}
                />
              </div>
            </Card>

            {/* Chart Placeholder */}
            <Card title="STATS_VISUALIZER.exe">
              <div className="flex h-[200px] items-center justify-center border-4 border-dashed border-[#FF6B35]/50 bg-[#FF6B35]/10 dark:border-[#39FF14]/50 dark:bg-[#39FF14]/5">
                <div className="text-center font-mono">
                  <div className="mb-2 text-4xl">[ CHART ]</div>
                  <p className="animate-pulse text-sm text-slate-600 dark:text-[#39FF14]/70">
                    &gt; RENDERING DATA...
                  </p>
                </div>
              </div>
            </Card>

            {/* Buttons */}
            <Card title="BUTTON_STYLES.dll">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">&gt; PRIMARY</Button>
                <Button variant="secondary">&gt; SECONDARY</Button>
                <Button variant="outline">&gt; OUTLINE</Button>
                <Button variant="ghost">&gt; GHOST</Button>
              </div>
            </Card>

            {/* Form Elements */}
            <Card title="INPUT_HANDLER.sys">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="PLAYER_NAME:" placeholder="enter_value..." />
                <Input label="SCORE_VALUE:" type="number" placeholder="0" />
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-2">
            <StatsCard
              title="WIN_RATE.dat"
              items={[
                { name: "Alice", value: "78%", highlight: true },
                { name: "Bob", value: "65%" },
                { name: "Charlie", value: "52%" },
                { name: "Diana", value: "48%" },
              ]}
            />
            <StatsCard
              title="TOP_SCORES.dat"
              items={[
                { name: "Bob", value: "142", highlight: true },
                { name: "Alice", value: "128" },
                { name: "Eve", value: "95" },
                { name: "Frank", value: "87" },
              ]}
            />

            {/* Badges */}
            <Card title="STATUS_CODES.log">
              <div className="flex flex-wrap gap-2">
                <Badge variant="active">:: LIVE ::</Badge>
                <Badge variant="upcoming">[PENDING]</Badge>
                <Badge variant="completed">{"{DONE}"}</Badge>
                <Badge variant="winner">*WINNER*</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center font-mono text-xs text-slate-500 dark:text-[#39FF14]/50">
          &copy; 2000 TABLESUCKER v1.0 // ALL RIGHTS RESERVED // BEST VIEWED IN
          800x600
        </div>
      </div>
    </div>
  );
}
