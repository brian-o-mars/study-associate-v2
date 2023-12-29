import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Pricing from '@/components/Pricing'


export default function Home() {
  return (
    <div className="bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-300">
      <Header />
      <Hero />
      <Pricing />
      <Footer />
    </div>
  )
}
