"use client";

import Link from "next/link";
import { useState } from "react";

const colorSchemes = [
  {
    name: "Emerald",
    description: "Sports-themed, fresh and energetic",
    dark: {
      primary: "#10B981",
      primaryHover: "#059669",
      primaryText: "#ffffff",
      background: "#0f0f0f",
      surface: "#1a1a1a",
      surfaceLight: "#262626",
      surfaceLightHover: "#333333",
      text: "#e5e5e5",
      textMuted: "#a3a3a3",
      border: "#404040",
      borderHover: "#525252",
      chart: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"],
    },
    light: {
      primary: "#10B981",
      primaryHover: "#059669",
      primaryText: "#ffffff",
      background: "#f5f5f5",
      surface: "#ffffff",
      surfaceLight: "#f0f0f0",
      surfaceLightHover: "#e5e5e5",
      text: "#171717",
      textMuted: "#737373",
      border: "#e5e5e5",
      borderHover: "#d4d4d4",
      chart: ["#059669", "#2563EB", "#D97706", "#DC2626", "#7C3AED", "#DB2777"],
    },
  },
  {
    name: "Amber",
    description: "Warm, inviting, good for dark mode",
    dark: {
      primary: "#F59E0B",
      primaryHover: "#D97706",
      primaryText: "#1c1917",
      background: "#1c1917",
      surface: "#292524",
      surfaceLight: "#3f3a38",
      surfaceLightHover: "#4a4543",
      text: "#e7e5e4",
      textMuted: "#a8a29e",
      border: "#57534e",
      borderHover: "#6b6660",
      chart: ["#F59E0B", "#22C55E", "#06B6D4", "#F43F5E", "#A855F7", "#3B82F6"],
    },
    light: {
      primary: "#D97706",
      primaryHover: "#B45309",
      primaryText: "#ffffff",
      background: "#fafaf9",
      surface: "#ffffff",
      surfaceLight: "#f5f5f4",
      surfaceLightHover: "#e7e5e4",
      text: "#1c1917",
      textMuted: "#78716c",
      border: "#e7e5e4",
      borderHover: "#d6d3d1",
      chart: ["#B45309", "#16A34A", "#0891B2", "#E11D48", "#9333EA", "#2563EB"],
    },
  },
  {
    name: "Indigo",
    description: "Professional, modern SaaS look",
    dark: {
      primary: "#818CF8",
      primaryHover: "#6366F1",
      primaryText: "#111111",
      background: "#111111",
      surface: "#1c1c1c",
      surfaceLight: "#282828",
      surfaceLightHover: "#353535",
      text: "#e5e5e5",
      textMuted: "#a3a3a3",
      border: "#3f3f3f",
      borderHover: "#525252",
      chart: ["#818CF8", "#34D399", "#FBBF24", "#F87171", "#F472B6", "#22D3EE"],
    },
    light: {
      primary: "#6366F1",
      primaryHover: "#4F46E5",
      primaryText: "#ffffff",
      background: "#f8fafc",
      surface: "#ffffff",
      surfaceLight: "#f1f5f9",
      surfaceLightHover: "#e2e8f0",
      text: "#0f172a",
      textMuted: "#64748b",
      border: "#e2e8f0",
      borderHover: "#cbd5e1",
      chart: ["#4F46E5", "#059669", "#D97706", "#DC2626", "#DB2777", "#0891B2"],
    },
  },
  {
    name: "Teal",
    description: "Modern, balanced between pro and fun",
    dark: {
      primary: "#2DD4BF",
      primaryHover: "#14B8A6",
      primaryText: "#0c0c0c",
      background: "#0c0c0c",
      surface: "#171717",
      surfaceLight: "#232323",
      surfaceLightHover: "#303030",
      text: "#e5e5e5",
      textMuted: "#a3a3a3",
      border: "#3d3d3d",
      borderHover: "#505050",
      chart: ["#2DD4BF", "#A78BFA", "#FB923C", "#F87171", "#38BDF8", "#4ADE80"],
    },
    light: {
      primary: "#14B8A6",
      primaryHover: "#0D9488",
      primaryText: "#ffffff",
      background: "#f0fdfa",
      surface: "#ffffff",
      surfaceLight: "#f0fdfa",
      surfaceLightHover: "#ccfbf1",
      text: "#134e4a",
      textMuted: "#5f9ea0",
      border: "#99f6e4",
      borderHover: "#5eead4",
      chart: ["#0D9488", "#7C3AED", "#EA580C", "#DC2626", "#0284C7", "#16A34A"],
    },
  },
];

type ThemeColors = (typeof colorSchemes)[number]["dark"];

interface ButtonProps {
  children: React.ReactNode;
  variant: "primary" | "outline" | "secondary";
  colors: ThemeColors;
}

function HoverButton({ children, variant, colors }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: isHovered ? colors.primaryHover : colors.primary,
          color: colors.primaryText,
        };
      case "outline":
        return {
          backgroundColor: isHovered ? colors.surfaceLight : "transparent",
          borderColor: isHovered ? colors.borderHover : colors.border,
          color: colors.text,
        };
      case "secondary":
        return {
          backgroundColor: isHovered ? colors.surfaceLightHover : colors.surfaceLight,
          color: colors.text,
        };
    }
  };

  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${variant === "outline" ? "border" : ""}`}
      style={getStyles()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}

interface NavItemProps {
  active?: boolean;
  colors: ThemeColors;
  children: React.ReactNode;
}

function NavItem({ active, colors, children }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-md transition-colors"
      style={{
        backgroundColor: active
          ? colors.primary
          : isHovered
            ? colors.surfaceLightHover
            : colors.surfaceLight,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}

interface ThemePreviewProps {
  colors: ThemeColors;
  mode: "dark" | "light";
}

function ThemePreview({ colors, mode }: ThemePreviewProps) {
  return (
    <div
      className="p-4"
      style={{ backgroundColor: colors.background }}
    >
      {/* Mode Label */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: colors.textMuted }}
        >
          {mode} mode
        </span>
      </div>

      {/* Sample Card */}
      <div
        className="mb-4 rounded-lg border p-3"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <h3
          className="mb-1 text-sm font-semibold"
          style={{ color: colors.text }}
        >
          Sample Card
        </h3>
        <p
          className="mb-3 text-xs"
          style={{ color: colors.textMuted }}
        >
          Content preview with this color scheme.
        </p>

        {/* Mini Stats */}
        <div className="mb-3 flex gap-2">
          <div
            className="flex-1 rounded p-2 text-center"
            style={{ backgroundColor: colors.surfaceLight }}
          >
            <div
              className="text-lg font-bold"
              style={{ color: colors.primary }}
            >
              42
            </div>
            <div
              className="text-[10px]"
              style={{ color: colors.textMuted }}
            >
              Games
            </div>
          </div>
          <div
            className="flex-1 rounded p-2 text-center"
            style={{ backgroundColor: colors.surfaceLight }}
          >
            <div
              className="text-lg font-bold"
              style={{ color: colors.primary }}
            >
              78%
            </div>
            <div
              className="text-[10px]"
              style={{ color: colors.textMuted }}
            >
              Win
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <HoverButton variant="primary" colors={colors}>
            Primary
          </HoverButton>
          <HoverButton variant="outline" colors={colors}>
            Outline
          </HoverButton>
          <HoverButton variant="secondary" colors={colors}>
            Secondary
          </HoverButton>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span
          className="rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{
            backgroundColor: colors.primary,
            color: colors.primaryText,
          }}
        >
          Active
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{
            backgroundColor: colors.surfaceLight,
            color: colors.text,
          }}
        >
          Pending
        </span>
        <span
          className="rounded-full border px-2 py-0.5 text-xs font-semibold"
          style={{
            borderColor: colors.border,
            color: colors.textMuted,
          }}
        >
          Done
        </span>
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter name..."
        className="mb-3 w-full rounded border px-3 py-1.5 text-xs outline-none"
        style={{
          backgroundColor: colors.surfaceLight,
          borderColor: colors.border,
          color: colors.text,
        }}
      />

      {/* Nav Preview */}
      <div className="flex gap-1">
        <NavItem active colors={colors}>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke={colors.primaryText}
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </NavItem>
        <NavItem colors={colors}>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke={colors.textMuted}
            strokeWidth={2}
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        </NavItem>
        <NavItem colors={colors}>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke={colors.textMuted}
            strokeWidth={2}
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </NavItem>
      </div>

      {/* Chart Colors Preview */}
      <div className="mt-4">
        <span
          className="mb-2 block text-[10px] font-medium uppercase tracking-wider"
          style={{ color: colors.textMuted }}
        >
          Chart Colors
        </span>
        <div className="flex gap-1">
          {colors.chart.map((color, index) => (
            <div
              key={index}
              className="h-6 flex-1 rounded"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        {/* Mini bar chart preview */}
        <div
          className="mt-2 flex h-12 items-end gap-1 rounded p-2"
          style={{ backgroundColor: colors.surfaceLight }}
        >
          {[0.6, 0.9, 0.4, 0.75, 0.5, 0.85].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t"
              style={{
                backgroundColor: colors.chart[index],
                height: `${height * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ColorSchemesPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/design-variants"
            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            ← Back to Design Variants
          </Link>
          <h1 className="text-3xl font-bold text-white">Color Scheme Options</h1>
          <p className="mt-2 text-slate-400">
            Compare different color palettes for the main app design (dark & light modes)
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {colorSchemes.map((scheme) => (
            <div
              key={scheme.name}
              className="overflow-hidden rounded-xl border-2"
              style={{ borderColor: scheme.dark.primary }}
            >
              {/* Scheme Header */}
              <div
                className="px-6 py-4"
                style={{ backgroundColor: scheme.dark.surface }}
              >
                <h2
                  className="text-2xl font-bold"
                  style={{ color: scheme.dark.primary }}
                >
                  {scheme.name}
                </h2>
                <p style={{ color: scheme.dark.textMuted }}>{scheme.description}</p>
              </div>

              {/* Color Swatches */}
              <div
                className="flex gap-2 px-6 py-3"
                style={{ backgroundColor: scheme.dark.background }}
              >
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-8 w-8 rounded-lg"
                    style={{ backgroundColor: scheme.dark.primary }}
                  />
                  <span className="text-[10px] text-slate-500">Primary</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-8 w-8 rounded-lg border border-slate-600"
                    style={{ backgroundColor: scheme.dark.background }}
                  />
                  <span className="text-[10px] text-slate-500">BG</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-8 w-8 rounded-lg"
                    style={{ backgroundColor: scheme.dark.surface }}
                  />
                  <span className="text-[10px] text-slate-500">Surface</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="h-8 w-8 rounded-lg"
                    style={{ backgroundColor: scheme.dark.surfaceLight }}
                  />
                  <span className="text-[10px] text-slate-500">Card</span>
                </div>
              </div>

              {/* Dark and Light previews side by side */}
              <div className="grid grid-cols-2">
                <ThemePreview colors={scheme.dark} mode="dark" />
                <ThemePreview colors={scheme.light} mode="light" />
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Pick your favorite and let me know which one to apply!
          </p>
        </footer>
      </div>
    </div>
  );
}
