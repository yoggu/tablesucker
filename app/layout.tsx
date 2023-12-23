import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Menu from "@/components/layout/menu-x";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/header-x";

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
      <body className="dark:bg-slate-800 min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex">
            <aside>
              <Menu />
            </aside>
            <main className="flex-grow flex flex-col items-center">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
