import type { Metadata } from 'next'
import '@/styles/globals.css'
import { getSiteSettings } from '@/sanity/client'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: settings.title,
      template: `%s | ${settings.title}`,
    },
    description: settings.subtitle,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  )
}
