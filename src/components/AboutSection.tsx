'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Ultra-smooth minimal animations
  const yContent = useSpring(useTransform(scrollYProgress, [0.2, 0.6], [50, 0]), {
    stiffness: 30,
    damping: 40,
  });

  const opacityContent = useSpring(useTransform(scrollYProgress, [0.2, 0.5], [0, 1]), {
    stiffness: 30,
    damping: 40,
  });

  // Subtle line animation
  const lineWidth = useSpring(useTransform(scrollYProgress, [0.4, 0.7], [0, 100]), {
    stiffness: 25,
    damping: 35,
  });

  // Additional content animations
  const ySubContent = useSpring(useTransform(scrollYProgress, [0.5, 0.8], [30, 0]), {
    stiffness: 30,
    damping: 40,
  });

  const opacitySubContent = useSpring(useTransform(scrollYProgress, [0.5, 0.8], [0, 1]), {
    stiffness: 30,
    damping: 40,
  });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-black relative"
    >
      {/* Minimal Content */}
      <motion.div
        style={{ y: yContent, opacity: opacityContent }}
        className="text-center max-w-4xl mx-auto px-8"
      >
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
          Urban Vault
        </h1>

        {/* Animated Line */}
        <motion.div
          style={{ width: `${lineWidth}%` }}
          className="h-px bg-white mx-auto mb-8"
        />

        {/* Main Description */}
        <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-12">
          Curated fashion for the bold
        </p>

        {/* Additional Content */}
        <motion.div
          style={{ y: ySubContent, opacity: opacitySubContent }}
          className="space-y-8"
        >
          {/* Mission Statement */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-4">
              Our Mission
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
              To vault the finest pieces from emerging and established brands, creating a sanctuary for those who refuse to blend in.
            </p>
          </div>

          {/* Stats/Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">50+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Curated Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">1000+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Unique Pieces</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">24/7</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Style Support</div>
            </div>
          </div>

          {/* Values */}
          <div className="mt-16 space-y-6">
            <div className="w-16 h-px bg-white mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2">Authenticity</h3>
                <p className="text-gray-400 text-sm">Every piece is verified for quality and originality.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2">Exclusivity</h3>
                <p className="text-gray-400 text-sm">Limited drops and rare finds you won't see everywhere.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}