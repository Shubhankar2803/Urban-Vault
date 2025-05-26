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

  // Model image: enters from above
  const yImage = useSpring(useTransform(scrollYProgress, [0.1, 0.4], [-150, 0]), {
    stiffness: 80,
    damping: 20,
  });
  const opacityImage = useSpring(useTransform(scrollYProgress, [0.1, 0.4], [0, 1]), {
    stiffness: 80,
    damping: 20,
  });

  // Text blocks: enter from below
  const yText = useSpring(useTransform(scrollYProgress, [0.5, 1], [100, 0]), {
    stiffness: 70,
    damping: 20,
  });
  const opacityText = useSpring(useTransform(scrollYProgress, [0.55, 1], [0, 1]), {
    stiffness: 70,
    damping: 20,
  });

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center py-32 bg-[#e6ddff] border-t-4 border-black overflow-hidden"
    >
      {/* Model Image */}
      <motion.div
        style={{ y: yImage, opacity: opacityImage }}
        className="w-80 md:w-[420px] mb-16"
      >
        <Image
          src="/model.png"
          alt="Statement"
          width={600}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />
      </motion.div>

      {/* Text Row */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="flex flex-col md:flex-row justify-between w-full max-w-6xl px-6 gap-10"
      >
        {/* Left Text */}
        <div className="flex-1 text-left p-6">
          <h3 className="text-3xl font-extrabold text-black uppercase tracking-tighter">
            Unfiltered Vision
          </h3>
          <p className="mt-4 text-lg text-black font-semibold">
            Every design reflects bold individuality. No filters. No compromise.
          </p>
        </div>

        {/* Right Text */}
        <div className="flex-1 text-right p-6">
          <h3 className="text-3xl font-extrabold text-black uppercase tracking-tighter">
            Loud and Proud
          </h3>
          <p className="mt-4 text-lg text-black font-semibold">
            Neobrutalist roots, maximalist soul. We're here to make noise.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
