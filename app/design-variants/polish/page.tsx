"use client";

import Link from "next/link";
import { useState } from "react";
import { Radio, Users, CalendarDays, Award } from "lucide-react";

const styleVariants = [
  {
    name: "Current",
    description: "Existing slate-based styling",
    background: "bg-gray-900",
    surface: "bg-slate-950",
    surfaceAlt: "bg-slate-800",
    border: "border-slate-700",
    text: "text-slate-50",
    textMuted: "text-slate-400",
    accent: "text-slate-300",
    buttonPrimary: "bg-slate-50 text-slate-900 hover:bg-slate-50/90",
    buttonSecondary: "bg-slate-800 text-slate-50 hover:bg-slate-800/80",
    buttonOutline: "border-slate-700 bg-transparent hover:bg-slate-800",
    inputBg: "bg-slate-950 border-slate-800",
    inputFocus: "focus:ring-slate-300",
    menuActive: "bg-slate-800 text-slate-50",
    menuHover: "hover:bg-slate-800",
  },
  {
    name: "Sky Accent",
    description: "Keep slate, add sky blue accent",
    background: "bg-slate-950",
    surface: "bg-slate-900",
    surfaceAlt: "bg-slate-800",
    border: "border-slate-700",
    text: "text-slate-50",
    textMuted: "text-slate-400",
    accent: "text-sky-400",
    buttonPrimary: "bg-sky-500 text-white hover:bg-sky-400",
    buttonSecondary: "bg-slate-800 text-slate-50 hover:bg-slate-700",
    buttonOutline: "border-slate-600 bg-transparent hover:bg-slate-800",
    inputBg: "bg-slate-900 border-slate-700",
    inputFocus: "focus:ring-sky-500",
    menuActive: "bg-sky-500/10 text-sky-400",
    menuHover: "hover:bg-slate-800",
  },
  {
    name: "Violet Accent",
    description: "Slate with violet/purple accent",
    background: "bg-slate-950",
    surface: "bg-slate-900",
    surfaceAlt: "bg-slate-800",
    border: "border-slate-700",
    text: "text-slate-50",
    textMuted: "text-slate-400",
    accent: "text-violet-400",
    buttonPrimary: "bg-violet-500 text-white hover:bg-violet-400",
    buttonSecondary: "bg-slate-800 text-slate-50 hover:bg-slate-700",
    buttonOutline: "border-slate-600 bg-transparent hover:bg-slate-800",
    inputBg: "bg-slate-900 border-slate-700",
    inputFocus: "focus:ring-violet-500",
    menuActive: "bg-violet-500/10 text-violet-400",
    menuHover: "hover:bg-slate-800",
  },
  {
    name: "Amber Accent",
    description: "Warm amber/orange accent",
    background: "bg-slate-950",
    surface: "bg-slate-900",
    surfaceAlt: "bg-slate-800",
    border: "border-slate-700",
    text: "text-slate-50",
    textMuted: "text-slate-400",
    accent: "text-amber-400",
    buttonPrimary: "bg-amber-500 text-slate-900 hover:bg-amber-400",
    buttonSecondary: "bg-slate-800 text-slate-50 hover:bg-slate-700",
    buttonOutline: "border-slate-600 bg-transparent hover:bg-slate-800",
    inputBg: "bg-slate-900 border-slate-700",
    inputFocus: "focus:ring-amber-500",
    menuActive: "bg-amber-500/10 text-amber-400",
    menuHover: "hover:bg-slate-800",
  },
  {
    name: "Rose Accent",
    description: "Softer pink/rose accent",
    background: "bg-slate-950",
    surface: "bg-slate-900",
    surfaceAlt: "bg-slate-800",
    border: "border-slate-700",
    text: "text-slate-50",
    textMuted: "text-slate-400",
    accent: "text-rose-400",
    buttonPrimary: "bg-rose-500 text-white hover:bg-rose-400",
    buttonSecondary: "bg-slate-800 text-slate-50 hover:bg-slate-700",
    buttonOutline: "border-slate-600 bg-transparent hover:bg-slate-800",
    inputBg: "bg-slate-900 border-slate-700",
    inputFocus: "focus:ring-rose-500",
    menuActive: "bg-rose-500/10 text-rose-400",
    menuHover: "hover:bg-slate-800",
  },
  {
    name: "Minimal White",
    description: "Clean white accent, no color",
    background: "bg-slate-950",
    surface: "bg-slate-900",
    surfaceAlt: "bg-slate-800",
    border: "border-slate-700",
    text: "text-slate-50",
    textMuted: "text-slate-400",
    accent: "text-white",
    buttonPrimary: "bg-white text-slate-900 hover:bg-slate-100",
    buttonSecondary: "bg-slate-800 text-slate-50 hover:bg-slate-700",
    buttonOutline: "border-slate-600 bg-transparent hover:bg-slate-800",
    inputBg: "bg-slate-900 border-slate-700",
    inputFocus: "focus:ring-white",
    menuActive: "bg-white/10 text-white",
    menuHover: "hover:bg-slate-800",
  },
];

type StyleVariant = (typeof styleVariants)[number];

interface StylePreviewProps {
  styles: StyleVariant;
}

function StylePreview({ styles }: StylePreviewProps) {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className={`rounded-xl ${styles.background} p-5`}>
      {/* Label */}
      <div className="mb-3">
        <span className={`text-sm font-semibold ${styles.text}`}>
          {styles.name}
        </span>
        <p className={`text-xs ${styles.textMuted}`}>{styles.description}</p>
      </div>

      {/* Mini Layout */}
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className={`w-12 rounded-lg ${styles.surface} ${styles.border} border p-2`}>
          <div className="flex flex-col gap-2">
            {[Radio, Users, CalendarDays].map((Icon, i) => (
              <button
                key={i}
                onClick={() => setActiveNav(i)}
                className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                  activeNav === i ? styles.menuActive : `${styles.menuHover} ${styles.textMuted}`
                }`}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Card */}
          <div className={`rounded-lg ${styles.surface} ${styles.border} border p-4`}>
            <h3 className={`mb-1 text-sm font-semibold ${styles.text}`}>Sample Card</h3>
            <p className={`mb-3 text-xs ${styles.textMuted}`}>
              Content preview with polished styling.
            </p>

            {/* Stats */}
            <div className="mb-3 flex gap-2">
              <div className={`flex-1 rounded p-2 text-center ${styles.surfaceAlt}`}>
                <div className={`text-lg font-bold ${styles.accent}`}>42</div>
                <div className={`text-[10px] ${styles.textMuted}`}>Games</div>
              </div>
              <div className={`flex-1 rounded p-2 text-center ${styles.surfaceAlt}`}>
                <div className={`text-lg font-bold ${styles.accent}`}>78%</div>
                <div className={`text-[10px] ${styles.textMuted}`}>Win</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${styles.buttonPrimary}`}
              >
                Primary
              </button>
              <button
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${styles.buttonOutline} ${styles.text}`}
              >
                Outline
              </button>
              <button
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${styles.buttonSecondary}`}
              >
                Secondary
              </button>
            </div>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Enter name..."
            className={`w-full rounded-md border px-3 py-2 text-xs outline-none ring-offset-2 transition-all ${styles.inputBg} ${styles.text} placeholder:${styles.textMuted} focus:ring-2 ${styles.inputFocus}`}
          />

          {/* Game Score Preview */}
          <div className={`rounded-lg ${styles.surface} ${styles.border} border p-3`}>
            <div className="flex items-center justify-between text-xs">
              <div className="text-right">
                <div className={`${styles.textMuted}`}>Team Red</div>
                <div className="mt-1 flex justify-end gap-1">
                  <div className={`h-6 w-6 rounded-full ${styles.surfaceAlt}`} />
                  <div className={`h-6 w-6 rounded-full ${styles.surfaceAlt}`} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${styles.text}`}>10</span>
                <span className={styles.textMuted}>:</span>
                <span className={`text-2xl font-bold ${styles.text}`}>7</span>
                <Award size={14} className={styles.accent} />
              </div>
              <div>
                <div className={`${styles.textMuted}`}>Team Blue</div>
                <div className="mt-1 flex gap-1">
                  <div className={`h-6 w-6 rounded-full ${styles.surfaceAlt}`} />
                  <div className={`h-6 w-6 rounded-full ${styles.surfaceAlt}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PolishPreviewPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants"
            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            &larr; Back to Design Variants
          </Link>
          <h1 className="text-3xl font-bold text-white">Accent Color Options</h1>
          <p className="mt-2 text-slate-400">
            Pick an accent color for buttons, active states, and highlights
          </p>
        </header>

        {/* Grid of all variants */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {styleVariants.map((variant) => (
            <StylePreview key={variant.name} styles={variant} />
          ))}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Let me know which accent color you prefer!
          </p>
        </footer>
      </div>
    </div>
  );
}
