'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function AboutSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });

  const yText = useSpring(useTransform(scrollYProgress, [0, 1], [100, 0]), {
    stiffness: 70,
    damping: 20,
  });

  const opacityText = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const yImage = useSpring(useTransform(scrollYProgress, [0, 1], [-80, 0]), {
    stiffness: 80,
    damping: 20,
  });

  const scaleImage = useSpring(useTransform(scrollYProgress, [0, 1], [1.05, 1]), {
    stiffness: 60,
    damping: 18,
  });

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-8 py-20 bg-[#e6ddff]"
    >
      {/* Text Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#ff007f] leading-tight mb-6">
          About Our Brand
        </h2>
        <p className="text-lg md:text-xl text-black font-medium max-w-xl">
          We're not just selling products—we’re creating a bold identity. Our style is
          rooted in neobrutalism, layered with maximalist energy and clean, intentional design.
        </p>
      </motion.div>

      {/* Image */}
      <motion.div
        style={{ y: yImage, scale: scaleImage }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/about.jpeg"
            alt="About us"
            fill
            priority
            className="object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
