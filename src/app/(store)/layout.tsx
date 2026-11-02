import { getSiteSettings } from '@/sanity/client'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header settings={settings} />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer settings={settings} />
    </div>
  )
}
