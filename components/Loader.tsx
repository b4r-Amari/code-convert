'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

function LoaderContent() {
  return (
    <div className="relative z-10 flex flex-col items-center gap-10">
      {/* Logo — matches site logo treatment */}
      <div className="flex items-center gap-3">
        <motion.div
          className="flex h-11 sm:h-13 px-3 sm:px-4 rounded-xl items-center justify-center bg-[#FF1E1E] shrink-0"
          animate={{ scaleX: [1, 0, 1] }}
          transition={{
            duration: 0.4,
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 1.6,
            ease: 'easeInOut',
          }}
        >
          <span className="font-bold text-sm sm:text-base tracking-tighter text-white select-none">
            C&C
          </span>
        </motion.div>

        <div className="flex flex-col justify-center items-start">
          <span className="text-sm sm:text-base font-bold tracking-tight text-white uppercase leading-tight">
            Code & Convert
          </span>
          <span className="text-[10px] sm:text-[11px] text-neutral-500 font-medium uppercase tracking-[0.2em] leading-none mt-1">
            We code, you convert
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-28 h-px bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#FF1E1E] rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

export default function Loader({ inline = false }: { inline?: boolean }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (inline) return;
    const handleLoad = () => setTimeout(() => setIsVisible(false), 300);
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [inline]);

  if (inline) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center">
        <LoaderContent />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          <LoaderContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
