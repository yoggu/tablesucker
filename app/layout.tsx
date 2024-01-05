import { GeistSans } from "geist/font/sans";
import "@/styles/globals.css";
import Menu from "@/components/layout/menu";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import { ModeToggle } from "@/components/layout/mode-toggle";

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
      <body className="grid grid-cols-[56px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)] min-h-screen dark:bg-gray-950">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <ModeToggle /> */}
          <aside className="px-2 pt-6 border-r dark:border-r-gray-700 h-full min-h-screen
          ">
            <Menu />
          </aside>
          <main className="flex flex-col pt-6 px-4 xl:px-8">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
