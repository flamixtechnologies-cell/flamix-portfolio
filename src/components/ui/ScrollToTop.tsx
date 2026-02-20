"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUp, Rocket } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 700) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const percentage = scrollableHeight > 0 
        ? Math.min((scrollTop / scrollableHeight) * 100, 100)
        : 0;
      setScrollPercentage(percentage);
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = (e.clientX - rect.left - centerX) * 0.3; // Reduce movement by 70%
    const y = (e.clientY - rect.top - centerY) * 0.3; // Reduce movement by 70%
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 50 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50"
        >
          <motion.button
            onClick={scrollToTop}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Scroll to top"
          >
            {/* Morphing blob container */}
            <div className="relative w-14 h-14 md:w-16 md:h-16">
              {/* Animated gradient background with morphing */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from ${scrollPercentage * 3.6}deg, #7A1CAC, #AD49E1, #EBD3F8, #AD49E1, #7A1CAC)`,
                  filter: "blur(8px)",
                  opacity: 0.6,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Main button with glassmorphism */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-primary backdrop-blur-xl border-2 border-white/20 shadow-2xl overflow-hidden"
                style={{
                  x: springX,
                  y: springY,
                }}
                whileHover={{
                  boxShadow: "0 0 40px rgba(122, 28, 172, 0.8), 0 0 80px rgba(173, 73, 225, 0.4)",
                }}
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: `linear-gradient(${scrollPercentage * 3.6}deg, rgba(122, 28, 172, 0.8), rgba(173, 73, 225, 0.6))`,
                  }}
                  animate={{
                    background: [
                      "linear-gradient(0deg, rgba(122, 28, 172, 0.8), rgba(173, 73, 225, 0.6))",
                      "linear-gradient(180deg, rgba(173, 73, 225, 0.8), rgba(122, 28, 172, 0.6))",
                      "linear-gradient(360deg, rgba(122, 28, 172, 0.8), rgba(173, 73, 225, 0.6))",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Speed lines effect */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      style={{
                        background: `conic-gradient(from ${i * 45}deg, transparent 0deg, rgba(255, 255, 255, 0.3) ${scrollPercentage * 0.36}deg, transparent ${scrollPercentage * 0.36 + 5}deg)`,
                      }}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>

                {/* Icon container */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Rocket className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
                  </motion.div>
                </div>

                {/* Progress indicator ring */}
                <svg
                  className="absolute inset-0 w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 48}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 48 * (1 - scrollPercentage / 100),
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
              </motion.div>

              {/* Floating particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                    x: [
                      "50%",
                      `${50 + Math.cos((i * 72 * Math.PI) / 180) * 40}%`,
                      "50%",
                    ],
                    y: [
                      "50%",
                      `${50 + Math.sin((i * 72 * Math.PI) / 180) * 40}%`,
                      "50%",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 blur-sm" />
                </motion.div>
              ))}

              {/* Hover ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{
                  scale: 1.3,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </div>

            {/* Tooltip with morphing */}
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              whileHover={{ opacity: 1, x: 0, scale: 1 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-2 bg-gradient-to-r from-primary/95 to-secondary/95 backdrop-blur-md text-white text-xs font-medium rounded-lg shadow-xl pointer-events-none border border-white/20"
            >
              Back to top
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-primary/95" />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
