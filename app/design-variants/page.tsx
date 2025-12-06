import Link from "next/link";

const variants = [
  {
    name: "Fun & Playful",
    href: "/design-variants/fun",
    description: "Vibrant purples, pinks, and yellows with bouncy animations",
    gradient: "from-purple-500 via-pink-500 to-yellow-400",
  },
  {
    name: "Neo-Brutalism",
    href: "/design-variants/brutalism",
    description: "Bold black borders, hard shadows, oversized typography",
    gradient: "from-black via-blue-600 to-black",
  },
  {
    name: "Glassmorphism",
    href: "/design-variants/glass",
    description: "Frosted glass effects, soft gradients, elegant transparency",
    gradient: "from-sky-400 via-blue-500 to-purple-500",
  },
  {
    name: "Retro / Y2K",
    href: "/design-variants/retro",
    description: "Pixel fonts, neon colors, CRT scan-lines, nostalgic vibes",
    gradient: "from-green-400 via-pink-500 to-cyan-400",
  },
];

export default function DesignVariantsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-4xl font-bold">Design Variants</h1>
        <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
          Explore 4 different design directions for Tablesucker. Each has dark
          and light mode support.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {variants.map((variant) => (
            <Link
              key={variant.href}
              href={variant.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:scale-[1.02] hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${variant.gradient} opacity-0 transition-opacity group-hover:opacity-10`}
              />
              <h2 className="mb-2 text-2xl font-semibold">{variant.name}</h2>
              <p className="text-slate-600 dark:text-slate-400">
                {variant.description}
              </p>
              <div
                className={`mt-4 h-2 w-full rounded-full bg-gradient-to-r ${variant.gradient}`}
              />
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <strong>Tip:</strong> Use the theme toggle in the sidebar to switch
            between dark and light modes on each variant page.
          </p>
        </div>
      </div>
    </div>
  );
}
