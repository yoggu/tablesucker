import Link from "next/link";
import { Card } from "./components/card";
import { Button } from "./components/button";
import { Badge } from "./components/badge";
import { Input } from "./components/input";
import { GameCard } from "./components/game-card";
import { StatsCard } from "./components/stats-card";

export default function BrutalismVariantPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF5] p-8 transition-colors dark:bg-black">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/design-variants"
              className="mb-2 inline-block border-b-2 border-black text-sm font-bold uppercase tracking-wider text-black hover:bg-[#0066FF] hover:text-white dark:border-white dark:text-white dark:hover:bg-[#00FFFF] dark:hover:text-black"
            >
              &larr; BACK
            </Link>
            <h1 className="text-6xl font-black uppercase tracking-tight text-black dark:text-white">
              NEO-BRUTALISM
            </h1>
            <p className="mt-2 text-lg font-medium uppercase tracking-wide text-black/70 dark:text-white/70">
              Bold. Raw. Unapologetic.
            </p>
          </div>
          <Badge variant="active">ACTIVE</Badge>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-6 gap-6">
          {/* Left Column */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
            {/* Game Cards */}
            <Card>
              <h2 className="mb-4 text-2xl font-black uppercase text-black dark:text-white">
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
              <h2 className="mb-4 text-2xl font-black uppercase text-black dark:text-white">
                Win Rate
              </h2>
              <div className="flex h-[200px] items-center justify-center border-4 border-black bg-[#0066FF] dark:border-white dark:bg-[#00FFFF]">
                <div className="text-center">
                  <div className="text-6xl font-black text-white dark:text-black">
                    CHART
                  </div>
                </div>
              </div>
            </Card>

            {/* Buttons */}
            <Card>
              <h2 className="mb-4 text-2xl font-black uppercase text-black dark:text-white">
                Buttons
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">PRIMARY</Button>
                <Button variant="secondary">SECONDARY</Button>
                <Button variant="outline">OUTLINE</Button>
                <Button variant="ghost">GHOST</Button>
              </div>
            </Card>

            {/* Form Elements */}
            <Card>
              <h2 className="mb-4 text-2xl font-black uppercase text-black dark:text-white">
                Form Elements
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="PLAYER NAME" placeholder="Enter name..." />
                <Input label="SCORE" type="number" placeholder="0" />
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-2">
            <StatsCard
              title="WIN RATE"
              items={[
                { name: "Alice", value: "78%", highlight: true },
                { name: "Bob", value: "65%" },
                { name: "Charlie", value: "52%" },
                { name: "Diana", value: "48%" },
              ]}
            />
            <StatsCard
              title="TOP SCORERS"
              items={[
                { name: "Bob", value: "142", highlight: true },
                { name: "Alice", value: "128" },
                { name: "Eve", value: "95" },
                { name: "Frank", value: "87" },
              ]}
            />

            {/* Badges */}
            <Card>
              <h2 className="mb-4 text-2xl font-black uppercase text-black dark:text-white">
                Badges
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="active">ACTIVE</Badge>
                <Badge variant="upcoming">UPCOMING</Badge>
                <Badge variant="completed">DONE</Badge>
                <Badge variant="winner">WINNER</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
