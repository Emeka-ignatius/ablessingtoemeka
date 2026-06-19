'use client';
import { motion } from 'framer-motion';
import { CONFIG } from '@/constants/content';
import { Button } from '@/components/ui/button';

export const EpilogueScene = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black pointer-events-auto"
    >
      <video 
        src={CONFIG.epilogue.videoUrl} 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover" 
      />
      
      {/* 40% dark overlay to maintain visual warmth */}
      <div className="absolute inset-0 bg-[#080410]/40" />

      {/* Text Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 2 }}
          className="text-space-gold text-xs uppercase tracking-[0.3em] mb-4"
        >
          AND THIS IS US NOW
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 4.5 }}
          className="text-space-rose font-serif italic text-3xl md:text-5xl mb-8 leading-tight max-w-2xl"
        >
          Still choosing each other.<br />Every day.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 7.5 }}
          className="text-space-paper/60 text-sm md:text-base font-serif italic tracking-wide mt-4"
        >
          Happy Anniversary, Momo. I love you. 💕
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 10 }}
        className="absolute bottom-12 z-20"
      >
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="bg-transparent border-white/20 text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300 rounded-full px-6"
        >
          Take Me To The Beginning
        </Button>
      </motion.div>
    </motion.div>
  );
};
