import Banner from '@/layout/banner'
import Header from '@/layout/header/header'

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <Banner />
    </div>
  )
}
