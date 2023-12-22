import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Menu from '@/components/layout/Menu'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'tablesucker',
  description: 'See who sucks at table soccer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex dark:bg-slate-800">
        <aside>
          <Menu />
        </aside>
        <main className="min-h-screen flex-grow flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}
