import AuthButton from "@/components/auth/auth-button";
import AppleSplash from "@/components/layout/apple-splash";
import Menu from "@/components/layout/menu";
import MobileMenu from "@/components/layout/mobile-menu";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Suspense } from "react";

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
            <Suspense fallback={<MenuSkeleton />}>
              <Menu />
            </Suspense>
          </aside>
          <Suspense fallback={<MobileMenuSkeleton />}>
            <MobileMenu>
              <Suspense fallback={<AuthButtonSkeleton />}>
                <AuthButton />
              </Suspense>
            </MobileMenu>
          </Suspense>
          <main className="flex flex-col px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

function MenuSkeleton() {
  return (
    <nav className="relative z-10 h-full min-h-screen border-r bg-white px-2 py-8 dark:border-slate-700 dark:bg-slate-950">
      <menu className="sticky bottom-8 top-8 flex h-full max-h-[calc(100vh-64px)] flex-col gap-2">
        <li className="h-10 w-10 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
        <li className="h-10 w-10 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
        <li className="h-10 w-10 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
        <li className="mt-auto h-10 w-10 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
        <li className="h-10 w-10 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
        <li className="h-10 w-10 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
      </menu>
    </nav>
  );
}

function AuthButtonSkeleton() {
  return (
    <div className="h-10 w-10 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
  );
}

function MobileMenuSkeleton() {
  return (
    <nav className="relative z-[50] pt-2 sm:hidden">
      <div className="flex justify-between gap-4 px-2">
        <div className="h-10 w-10 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
      </div>
    </nav>
  );
}
