import Link from "next/link";
import { Card } from "./components/card";
import { Button } from "./components/button";
import { Badge } from "./components/badge";
import { Input } from "./components/input";
import { GameCard } from "./components/game-card";
import { StatsCard } from "./components/stats-card";

export default function GlassVariantPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-sky-200 via-blue-300 to-purple-300 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900" />

      {/* Decorative Blobs */}
      <div className="fixed -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl dark:bg-blue-600/20" />
      <div className="fixed -bottom-32 -right-32 -z-10 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl dark:bg-purple-600/20" />
      <div className="fixed left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/20 blur-3xl dark:bg-pink-600/10" />

      <div className="relative z-10 p-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link
                href="/design-variants"
                className="mb-2 inline-block text-sm text-blue-700 hover:text-blue-800 dark:text-sky-400 dark:hover:text-sky-300"
              >
                &larr; Back to variants
              </Link>
              <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
                Glassmorphism
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Frosted glass effects with elegant transparency
              </p>
            </div>
            <Badge variant="active">Active Season</Badge>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-6 gap-6">
            {/* Left Column */}
            <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
              {/* Game Cards */}
              <Card>
                <h2 className="mb-4 text-xl font-semibold text-slate-800 dark:text-white">
                  Recent Games
                </h2>
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
              <Card>
                <h2 className="mb-4 text-xl font-semibold text-slate-800 dark:text-white">
                  Win Rate Over Time
                </h2>
                <div className="flex h-[200px] items-center justify-center rounded-2xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm dark:from-white/10 dark:to-white/5">
                  <div className="text-center">
                    <div className="mb-2 text-4xl">📊</div>
                    <p className="text-slate-600 dark:text-slate-300">
                      Chart Placeholder
                    </p>
                  </div>
                </div>
              </Card>

              {/* Buttons */}
              <Card>
                <h2 className="mb-4 text-xl font-semibold text-slate-800 dark:text-white">
                  Buttons
                </h2>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </Card>

              {/* Form Elements */}
              <Card>
                <h2 className="mb-4 text-xl font-semibold text-slate-800 dark:text-white">
                  Form Elements
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Player Name" placeholder="Enter name..." />
                  <Input label="Score" type="number" placeholder="0" />
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="col-span-full flex flex-col gap-6 lg:col-span-2">
              <StatsCard
                title="Win Rate"
                items={[
                  { name: "Alice", value: "78%", highlight: true },
                  { name: "Bob", value: "65%" },
                  { name: "Charlie", value: "52%" },
                  { name: "Diana", value: "48%" },
                ]}
              />
              <StatsCard
                title="Top Scorers"
                items={[
                  { name: "Bob", value: "142 goals", highlight: true },
                  { name: "Alice", value: "128 goals" },
                  { name: "Eve", value: "95 goals" },
                  { name: "Frank", value: "87 goals" },
                ]}
              />

              {/* Badges */}
              <Card>
                <h2 className="mb-4 text-xl font-semibold text-slate-800 dark:text-white">
                  Badges
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="active">Active</Badge>
                  <Badge variant="upcoming">Upcoming</Badge>
                  <Badge variant="completed">Completed</Badge>
                  <Badge variant="winner">Winner</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
