import { GeistSans } from "geist/font/sans";
import "@/styles/globals.css";
import Menu from "@/components/layout/menu";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/page-header";
import { Toaster } from "@/components/ui/toaster";
import { ModeToggle } from "@/components/layout/mode-toggle";
import MobileMenu from "@/components/layout/mobile-menu";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "tablesucker",
  description: "See who sucks at table soccer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className=" min-h-screen dark:bg-gray-950 sm:grid sm:grid-cols-[56px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <aside className="hidden sm:block">
            <Menu />
          </aside>
          <MobileMenu />
          <main className="flex flex-col px-4 pt-6 sm:pt-8 sm:px-8">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
