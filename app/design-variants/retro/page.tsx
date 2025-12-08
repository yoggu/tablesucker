import Link from "next/link";

const retroVariants = [
  {
    name: "CRT Terminal",
    href: "/design-variants/retro/crt",
    description: "Y2K computing vibes with scanlines and phosphor glow",
    colors: "from-[#39FF14] to-[#00FF00]",
  },
  {
    name: "Atari Arcade",
    href: "/design-variants/retro/atari",
    description: "Classic 8-bit arcade aesthetic with chunky pixels",
    colors: "from-[#FF6600] to-[#FFCC00]",
  },
  {
    name: "Synthwave",
    href: "/design-variants/retro/synthwave",
    description: "80s neon, chrome, and sunset grid aesthetics",
    colors: "from-[#FF00FF] via-[#00FFFF] to-[#FF00FF]",
  },
  {
    name: "Mortal Kombat",
    href: "/design-variants/retro/kombat",
    description: "Fight! Blood, gold, and fatality vibes from the arcade",
    colors: "from-[#8B0000] via-[#FFD700] to-[#8B0000]",
  },
  {
    name: "Cuphead",
    href: "/design-variants/retro/cuphead",
    description: "1930s cartoon aesthetic with watercolor and film grain",
    colors: "from-[#8B4513] via-[#DAA520] to-[#C41E3A]",
  },
  {
    name: "Game Boy",
    href: "/design-variants/retro/gameboy",
    description: "Classic dot matrix LCD with 4-shade green palette",
    colors: "from-[#0F380F] via-[#306230] to-[#9BBC0F]",
  },
  {
    name: "Foosball",
    href: "/design-variants/retro/foosball",
    description: "Table football aesthetic with green felt and wooden rails",
    colors: "from-[#5D4037] via-[#4CAF50] to-[#5D4037]",
  },
  {
    name: "Kanagawa",
    href: "/design-variants/retro/kanagawa",
    description: "Japanese wave art inspired with indigo and cream tones",
    colors: "from-[#1F1F28] via-[#7E9CD8] to-[#DCD7BA]",
  },
  {
    name: "Catppuccin",
    href: "/design-variants/retro/catppuccin",
    description: "Soothing pastel colors on a warm dark background",
    colors: "from-[#F38BA8] via-[#CBA6F7] to-[#89B4FA]",
  },
  {
    name: "Stadium Scoreboard",
    href: "/design-variants/retro/scoreboard",
    description: "LED dot-matrix display with amber glow and live updates",
    colors: "from-[#FF6B00] via-[#FF0000] to-[#00BFFF]",
  },
  {
    name: "Sports Bar",
    href: "/design-variants/retro/sportsbar",
    description: "Warm wood tones, brass accents, and neon beer signs",
    colors: "from-[#8B4513] via-[#FFD700] to-[#228B22]",
  },
  {
    name: "Vintage Foosball",
    href: "/design-variants/retro/vintage-foosball",
    description: "Classic wood grain and brass plaque championship style",
    colors: "from-[#B8860B] via-[#DEB887] to-[#8B0000]",
  },
  {
    name: "Pub League",
    href: "/design-variants/retro/pub-league",
    description: "Tuesday night football at the local with pints and banter",
    colors: "from-[#1B5E20] via-[#FDD835] to-[#D32F2F]",
  },
  {
    name: "FIFA 98",
    href: "/design-variants/retro/fifa98",
    description: "EA Sports Road to World Cup with gold menus and blue chrome",
    colors: "from-[#0D1F33] via-[#FFD700] to-[#1E3A5F]",
  },
  {
    name: "Sensible Soccer",
    href: "/design-variants/retro/sensible-soccer",
    description: "16-bit Amiga classic with pixel-perfect aftertouch",
    colors: "from-[#5A8F29] via-[#FFFF00] to-[#FF0000]",
  },
  {
    name: "Subbuteo",
    href: "/design-variants/retro/subbuteo",
    description: "Flick to kick tabletop miniatures since 1947",
    colors: "from-[#4A7C23] via-[#F5F5DC] to-[#C41E3A]",
  },
];

export default function RetroVariantsPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] p-8">
      {/* CRT Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_1px,transparent_1px,transparent_2px)]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <Link
          href="/design-variants"
          className="mb-4 inline-block font-mono text-sm text-[#39FF14] hover:underline"
        >
          &lt;-- BACK_TO_VARIANTS
        </Link>

        <h1 className="mb-2 font-mono text-4xl font-bold text-[#39FF14] [text-shadow:0_0_10px_#39FF14,0_0_20px_#39FF14]">
          RETRO_VARIANTS//
        </h1>
        <p className="mb-8 font-mono text-[#39FF14]/70">
          [ SELECT YOUR NOSTALGIA LEVEL ]
        </p>

        <div className="grid gap-6 md:grid-cols-1">
          {retroVariants.map((variant) => (
            <Link
              key={variant.href}
              href={variant.href}
              className="group relative overflow-hidden border-4 border-[#39FF14] bg-[#0D1117] p-6 transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-mono text-2xl font-bold text-[#39FF14]">
                    &gt; {variant.name}
                  </h2>
                  <p className="mt-1 font-mono text-sm text-[#39FF14]/60">
                    {variant.description}
                  </p>
                </div>
                <div
                  className={`h-16 w-32 rounded bg-gradient-to-r ${variant.colors} opacity-80`}
                />
              </div>
              <div className="mt-4 h-1 w-full bg-[#39FF14]/20">
                <div
                  className={`h-full w-0 bg-gradient-to-r ${variant.colors} transition-all duration-500 group-hover:w-full`}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center font-mono text-xs text-[#39FF14]/40">
          TABLESUCKER RETRO EDITION // CHOOSE YOUR FIGHTER
        </div>
      </div>
    </div>
  );
}
