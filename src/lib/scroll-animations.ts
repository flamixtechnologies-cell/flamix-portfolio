"use client";

import { Variants } from "framer-motion";

// Premium easing curves inspired by Apple & Stripe
export const easings = {
  // Apple's signature easing
  apple: [0.25, 0.1, 0.25, 1],
  // Stripe's smooth easing
  stripe: [0.4, 0, 0.2, 1],
  // Elastic bounce
  elastic: [0.68, -0.55, 0.265, 1.55],
  // Smooth deceleration
  smooth: [0.22, 1, 0.36, 1],
  // Dramatic entrance
  dramatic: [0.16, 1, 0.3, 1],
  // Snappy
  snappy: [0.87, 0, 0.13, 1],
} as const;

// Scroll-triggered reveal animations
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    },
  },
};

// Parallax effect for backgrounds
export const parallaxUp: Variants = {
  hidden: { y: 100 },
  visible: {
    y: 0,
    transition: {
      duration: 1.2,
      ease: easings.apple,
    },
  },
};

// Text split animation for character-by-character reveal
export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: easings.smooth,
    },
  }),
};

// Word-by-word reveal
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: easings.dramatic,
    },
  }),
};

// Line-by-line text reveal with mask
export const lineReveal: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    },
  },
};

// 3D card tilt hover effect values
export const tilt3D = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    z: 0,
  },
  hover: {
    scale: 1.02,
    z: 50,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    },
  },
};

// Stagger children with custom timing
export const staggerReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Fade blur in (like Linear.app)
export const fadeBlurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
};

// Scale up with rotation (dramatic entrance)
export const scaleRotateIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: easings.elastic,
    },
  },
};

// Slide from sides
export const slideFromLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easings.smooth,
    },
  },
};

export const slideFromRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easings.smooth,
    },
  },
};

// Floating animation for decorative elements
export const floating = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Glow pulse animation
export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(122, 28, 172, 0.3)",
      "0 0 60px rgba(122, 28, 172, 0.6)",
      "0 0 20px rgba(122, 28, 172, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Magnetic effect helper
export const magneticSpring = {
  type: "spring",
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

// Scroll progress animation
export const scrollProgressAnimation: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: "linear",
    },
  },
};

// Card flip animation
export const cardFlip: Variants = {
  front: {
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
  back: {
    rotateY: 180,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
};

// Marquee/infinite scroll animation
export const marquee = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 20,
        ease: "linear",
      },
    },
  },
};

// Viewport settings for scroll animations
export const viewportSettings = {
  once: true,
  margin: "-100px",
  amount: 0.3,
};

// Spring configs for different effects
export const springConfigs = {
  // Bouncy - for playful UI elements
  bouncy: { type: "spring", stiffness: 400, damping: 10 },
  // Smooth - for elegant transitions
  smooth: { type: "spring", stiffness: 100, damping: 20 },
  // Stiff - for quick, snappy movements
  stiff: { type: "spring", stiffness: 500, damping: 30 },
  // Slow - for dramatic reveals
  slow: { type: "spring", stiffness: 50, damping: 20 },
} as const;

// Hover scale with spring
export const hoverScale = {
  whileHover: {
    scale: 1.05,
    transition: springConfigs.bouncy,
  },
  whileTap: {
    scale: 0.98,
  },
};

// Gradient animation keyframes helper
export const gradientShift = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};
