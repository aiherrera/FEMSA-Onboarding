import Banner from '@/layout/banner'
import Header from '@/layout/header/header'

export const metadata = {
  title: 'Next.js Template Starter',
  description: 'A Next.js & Tailwind template starter',
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <Banner />

      {children}
    </div>
  )
}
