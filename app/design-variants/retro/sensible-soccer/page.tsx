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

export default function SensibleSoccerPage() {
  return (
    <div className="min-h-screen bg-[#5A8F29] p-6 lg:p-8">
      {/* Pitch stripe pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.05) 40px,
            rgba(255,255,255,0.05) 80px
          )`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants/retro"
            className="mb-3 inline-flex items-center gap-2 font-mono text-sm font-bold text-white transition-colors hover:text-[#FFFF00]"
          >
            &lt; BACK
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1
                className="font-mono text-4xl font-black uppercase text-white lg:text-5xl"
                style={{ textShadow: "4px 4px 0 #000" }}
              >
                Sensible Soccer
              </h1>
              <p className="mt-2 font-mono text-sm font-bold uppercase text-[#FFFF00]">
                International Edition * Season 94-95
              </p>
            </div>
            <Badge variant="active">* PLAYING</Badge>
          </div>
        </header>

        {/* Amiga-style title bar */}
        <div
          className="mb-8 overflow-hidden rounded-none border-4 border-[#000]"
          style={{ boxShadow: "4px 4px 0 #000" }}
        >
          <div className="bg-[#0000AA] px-4 py-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-white">
                SENSIBLE SOFTWARE PRESENTS
              </span>
              <div className="flex gap-1">
                <div className="h-4 w-4 rounded-none border-2 border-[#000] bg-[#00FF00]" />
                <div className="h-4 w-4 rounded-none border-2 border-[#000] bg-[#FFFF00]" />
                <div className="h-4 w-4 rounded-none border-2 border-[#000] bg-[#FF0000]" />
              </div>
            </div>
          </div>
          <div className="bg-[#5A8F29] px-4 py-3 text-center">
            <span
              className="font-mono text-xl font-bold text-white"
              style={{ textShadow: "2px 2px 0 #000" }}
            >
              GOAL! GOAL! GOAL!
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card title="LIVE MATCHES">
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

            <Card title="STATS">
              <Chart players={demoPlayers} />
            </Card>

            <Card title="MENU">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">New Match</Button>
                <Button variant="secondary">Add Player</Button>
                <Button variant="outline">Options</Button>
              </div>
            </Card>

            <Card title="SCORE">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Red" type="number" placeholder="0" />
                <Input label="Blue" type="number" placeholder="0" />
              </div>
              <div className="mt-4">
                <Button variant="primary">OK</Button>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <StatsCard
              title="WIN RATE"
              items={[
                { player: demoPlayers[0], value: "78%", highlight: true },
                { player: demoPlayers[1], value: "65%" },
                { player: demoPlayers[2], value: "52%" },
                { player: demoPlayers[3], value: "48%" },
              ]}
            />

            <StatsCard
              title="TOP SCORERS"
              items={[
                { player: demoPlayers[1], value: "142", highlight: true },
                { player: demoPlayers[0], value: "128" },
                { player: demoPlayers[4], value: "95" },
                { player: demoPlayers[5], value: "87" },
              ]}
            />

            <Card title="STATUS">
              <div className="flex flex-wrap gap-2">
                <Badge variant="active">Playing</Badge>
                <Badge variant="upcoming">Next</Badge>
                <Badge variant="completed">Final</Badge>
                <Badge variant="winner">Winner</Badge>
              </div>
            </Card>

            <Card title="CONTROLS">
              <div className="space-y-2 font-mono text-sm text-white">
                <div className="flex justify-between">
                  <span>FIRE:</span>
                  <span className="text-[#FFFF00]">SHOOT/TACKLE</span>
                </div>
                <div className="flex justify-between">
                  <span>UP+FIRE:</span>
                  <span className="text-[#FFFF00]">BANANA SHOT</span>
                </div>
                <div className="flex justify-between">
                  <span>DOWN+FIRE:</span>
                  <span className="text-[#FFFF00]">AFTERTOUCH</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p
            className="font-mono text-sm font-bold uppercase text-white"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            * SENSIBLE SOFTWARE 1994 * TABLESUCKER EDITION *
          </p>
        </footer>
      </div>
    </div>
  );
}
