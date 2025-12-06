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
