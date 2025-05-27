import AboutSection from '@/components/AboutSection';
import StatementSection from '@/components/StatementSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import HeroSlider from '@/components/HeroSlider';

export default async function Home() {

  return (
    <main className="min-h-screen bg-[#F5F5DC]">
      <HeroSlider />
      <AboutSection />
      <StatementSection />
      <TestimonialsSection />
    </main>
  );
}
