import { GeistSans } from "geist/font/sans";
import "@/styles/globals.css";
import Menu from "@/components/layout/menu";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/page-header";
import { Toaster } from "@/components/ui/toaster";
import { ModeToggle } from "@/components/layout/mode-toggle";
import MobileMenu from "@/components/layout/mobile-menu";
import AuthButton from "@/components/auth/auth-button";

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
      <body className=" min-h-screen bg-gray-100 sm:grid sm:grid-cols-[56px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)] dark:bg-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <aside className="hidden sm:block">
            <Menu />
          </aside>
          <MobileMenu>
            <AuthButton />
          </MobileMenu>
          <main className="flex flex-col px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
