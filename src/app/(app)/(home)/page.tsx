"use client";
import AboutSection from '@/components/AboutSection';
import StatementSection from '@/components/StatementSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import HeroSlider from '@/components/HeroSlider';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export default  function Home() {
  const trpc = useTRPC();

  const {data} =  useQuery(trpc.auth.session.queryOptions());
  return (
    <main className="min-h-screen bg-[#F5F5DC]">
    {JSON.stringify(data?.user, null, 2)}
      <HeroSlider />
      <AboutSection />
      <StatementSection />
      <TestimonialsSection />
    </main>
  );
}


