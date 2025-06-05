'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function StatementSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  // Model image: enters from above with smoother animation
  const yImage = useSpring(useTransform(scrollYProgress, [0.1, 0.4], [-150, 0]), {
    stiffness: 45,
    damping: 30,
  });
  const opacityImage = useSpring(useTransform(scrollYProgress, [0.1, 0.4], [0, 1]), {
    stiffness: 45,
    damping: 30,
  });

  // Text blocks: enter from below with smoother animation
  const yText = useSpring(useTransform(scrollYProgress, [0.5, 1], [100, 0]), {
    stiffness: 45,
    damping: 30,
  });
  const opacityText = useSpring(useTransform(scrollYProgress, [0.55, 1], [0, 1]), {
    stiffness: 45,
    damping: 30,
  });

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center py-32 bg-black border-t-4 border-black overflow-hidden"
    >
      {/* Brand Logo or Hero Image */}
      <motion.div
        style={{ y: yImage, opacity: opacityImage }}
        className="w-96 md:w-[520px] mb-16"
      >
        <Image
          src="/model.png"
          alt="Urban Vault Fashion"
          width={800}
          height={800}
          className="w-full h-auto object-contain"
          priority
        />
      </motion.div>

      {/* Text Row */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="flex flex-col md:flex-row justify-between w-full max-w-6xl px-6 gap-10"
      >
        {/* Left Text - Brand Promise */}
        <div className="flex-1 text-left p-6">
          <h3 className="text-3xl font-extrabold text-white uppercase tracking-tighter">
            Style Sanctuary
          </h3>
          <p className="mt-4 text-lg text-white font-semibold">
            Your ultimate destination for curated fashion. Discover exclusive brands and timeless pieces that define urban elegance.
          </p>
        </div>

        {/* Right Text - Value Proposition */}
        <div className="flex-1 text-right p-6">
          <h3 className="text-3xl font-extrabold text-white uppercase tracking-tighter">
            Urban Heritage
          </h3>
          <p className="mt-4 text-lg text-white font-semibold">
            Where street culture meets luxury. Each collection in our vault is handpicked for the fashion-forward urbanite.
          </p>
        </div>
      </motion.div>
    </section>
  );
}