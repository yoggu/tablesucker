import AuthButton from "@/components/auth/auth-button";
import AppleSplash from "@/components/layout/apple-splash";
import Menu from "@/components/layout/menu";
import MobileMenu from "@/components/layout/mobile-menu";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Tablesucker",
  description: "See who sucks at tablesoccer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <head>
        <AppleSplash />
      </head>
      <body className=" min-h-screen bg-gray-100 sm:grid sm:grid-cols-[56px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)] dark:bg-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
