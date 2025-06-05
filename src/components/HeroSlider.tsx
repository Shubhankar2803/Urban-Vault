'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax effects with different speeds
  const yImage = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), {
    stiffness: 100,
    damping: 30,
  });

  const yContent = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), {
    stiffness: 100,
    damping: 30,
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.2]), {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), {
    stiffness: 100,
    damping: 30,
  });

  // Text animations
  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      },
    },
  };

  const subtitleVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.6,
      },
    },
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: '100%',
      transition: {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 1,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: yImage, scale }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/slider1.jpg"
          alt="Urban Fashion Model"
          fill
          className="object-cover grayscale contrast-125"
          priority
          quality={100}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content Container */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-8"
      >
        {/* Main Title */}
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-8"
        >
          LUXURY
          <br />
          FINDS
        </motion.h1>

        {/* Animated Line */}
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="h-1 bg-white mx-auto mb-8 max-w-md"
        />

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-white font-light tracking-wide uppercase"
        >
          Curated Fashion Collective
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 1.4,
            },
          }}
          className="mt-12"
        >
          
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.8 },
        }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}