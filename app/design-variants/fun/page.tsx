import Link from "next/link";
import { Card } from "./components/card";
import { Button } from "./components/button";
import { Badge } from "./components/badge";
import { Input } from "./components/input";
import { GameCard } from "./components/game-card";
import { StatsCard } from "./components/stats-card";

export default function FunVariantPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] p-8 transition-colors dark:bg-[#1A1625]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/design-variants"
              className="mb-2 inline-block text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400"
            >
              &larr; Back to variants
            </Link>
            <h1 className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-4xl font-bold text-transparent">
              Fun & Playful
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Vibrant colors, rounded corners, and playful interactions
            </p>
          </div>
          <Badge variant="active">Active Season</Badge>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-6 gap-6">
          {/* Left Column - Games & Chart */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
            {/* Game Cards */}
            <Card>
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
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
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                Win Rate Over Time
              </h2>
              <div className="flex h-[200px] items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                <div className="text-center">
                  <div className="mb-2 text-4xl">📈</div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Chart Placeholder
                  </p>
                </div>
              </div>
            </Card>

            {/* Buttons Demo */}
            <Card>
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
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
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                Form Elements
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Player Name" placeholder="Enter name..." />
                <Input label="Score" type="number" placeholder="0" />
              </div>
            </Card>
          </div>

          {/* Right Column - Stats */}
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

            {/* Badges Demo */}
            <Card>
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
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
  );
}
