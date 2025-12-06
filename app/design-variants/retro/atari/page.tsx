import Link from "next/link";

const atariVariants = [
  {
    name: "Classic Orange",
    href: "/design-variants/retro/atari/classic",
    description: "Warm orange and gold - the original Atari feel",
    colors: "from-[#FF6600] to-[#FFCC00]",
  },
  {
    name: "Mint Arcade",
    href: "/design-variants/retro/atari/mint",
    description: "Cool teal and turquoise - refreshing retro vibes",
    colors: "from-[#20B2AA] to-[#40E0D0]",
  },
  {
    name: "Cherry Arcade",
    href: "/design-variants/retro/atari/cherry",
    description: "Bold crimson and coral - classic cabinet energy",
    colors: "from-[#DC143C] to-[#FF6B6B]",
  },
  {
    name: "Grape Arcade",
    href: "/design-variants/retro/atari/grape",
    description: "Soft purple and lavender - mellow CRT glow",
    colors: "from-[#9370DB] to-[#DDA0DD]",
  },
  {
    name: "Cool Blue",
    href: "/design-variants/retro/atari/cool",
    description: "Ice blue and cyan - clean and modern arcade",
    colors: "from-[#0088FF] to-[#00DDFF]",
  },
  {
    name: "Neon Nights",
    href: "/design-variants/retro/atari/neon",
    description: "Electric green and purple - late night gaming",
    colors: "from-[#00FF88] via-[#AA00FF] to-[#00FF88]",
  },
];

export default function AtariVariantsPage() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] p-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/design-variants/retro"
          className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-[#FFCC00] hover:text-[#FF6600]"
        >
          ◄ BACK TO RETRO
        </Link>

        <h1 className="mb-2 text-4xl font-black uppercase tracking-tight text-[#FFCC00] [text-shadow:4px_4px_0_#FF6600]">
          ATARI ARCADE
        </h1>
        <p className="mb-8 text-lg font-bold uppercase tracking-widest text-[#FFCC00]/70">
          SELECT COLOR SCHEME
        </p>

        <div className="grid gap-6">
          {atariVariants.map((variant) => (
            <Link
              key={variant.href}
              href={variant.href}
              className="group relative overflow-hidden border-4 border-[#FFCC00] bg-[#0f0f1a] p-6 shadow-[8px_8px_0_#FF6600] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#FF6600]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black uppercase text-[#FFCC00]">
                    ► {variant.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[#FFCC00]/60">
                    {variant.description}
                  </p>
                </div>
                <div
                  className={`h-16 w-32 bg-gradient-to-r ${variant.colors}`}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center text-sm font-bold uppercase tracking-widest text-[#FFCC00]/40">
          ★ INSERT COIN TO CONTINUE ★
        </div>
      </div>
    </div>
  );
}
