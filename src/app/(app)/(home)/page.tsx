import AboutSection from '@/components/AboutSection';
import StatementSection from '@/components/StatementSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import HeroSlider from '@/components/HeroSlider';
import configPromise from '@payload-config'
import { getPayload } from 'payload'
export default async function Home() {
  const payload=await getPayload({
    config:configPromise,
  })
  const data=await payload.find({collection:"categories"})
  console.log(JSON.stringify(data,null,2))
  return (
    <main className="min-h-screen bg-[#F5F5DC]">
      <HeroSlider />
      <AboutSection />
      <StatementSection />
      <TestimonialsSection />
    </main>
  );
}
