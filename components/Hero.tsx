"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const phrases = [
  "production-ready systems",
  "real-time platforms",
  "scalable architectures",
  "AI-driven applications"
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000); // Slower, more dramatic pacing
    return () => clearInterval(interval);
  }, []);

  // Generate random particles (spores for the "Upside Down" effect)
  const [spores, setSpores] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  useEffect(() => {
    setSpores(Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5
    })));
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-zinc-300 font-sans">
      
      {/* "Upside Down" Spores Background Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
        {spores.map((spore) => (
          <motion.div
            key={spore.id}
            className="absolute bg-zinc-400 rounded-full blur-[1px]"
            style={{
              left: `${spore.x}%`,
              top: `${spore.y}%`,
              width: spore.size,
              height: spore.size,
            }}
            animate={{
              y: [0, -100, -200],
              x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: spore.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Ominous Red Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[80vw] h-[50vh] bg-red-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="z-10 flex flex-col items-center text-center px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-lg md:text-2xl font-medium tracking-[0.3em] text-red-500/80 uppercase mb-4"
        >
          I engineer
        </motion.p>

        <div className="h-40 md:h-60 flex items-center justify-center overflow-hidden w-full">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-900 text-center uppercase drop-shadow-[0_0_20px_rgba(220,38,38,0.7)]"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
            >
              {phrases[index].split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word} <br className={i === 0 ? "hidden md:block" : "hidden"} />
                </React.Fragment>
              ))}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="flex items-center gap-4 text-xl md:text-4xl font-serif italic text-red-100/60 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
        >
          <span>that scale seamlessly.</span>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1.5, delay: 1.5 }}
           className="mt-16 flex items-center gap-4 text-xs md:text-sm font-bold tracking-[0.4em] text-red-700 uppercase"
        >
          <span>Shubham Varshney</span>
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full drop-shadow-[0_0_5px_rgba(220,38,38,1)] animate-pulse"></span>
          <span>Full-Stack Engineer</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-red-900/60 hover:text-red-500 transition-colors"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]" />
        </motion.div>
      </motion.div>
      
      {/* Ominous Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-[circle_at_center] from-transparent via-transparent to-[#020000] z-5"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-[#020000] via-[#050000]/50 to-transparent z-5"></div>
    </section>
  );
};

export default Hero;
