"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  springConfig?: { stiffness: number; damping: number };
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  ripple?: boolean;
  glow?: boolean;
  /**
   * When true, skips built-in padding/variant styles so you can fully control appearance via className.
   * Useful for very small controls like dots, icons, etc.
   */
  unstyled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  magneticStrength = 0.4,
  springConfig = { stiffness: 150, damping: 15 },
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  ripple = true,
  glow = true,
  unstyled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rippleStyle, setRippleStyle] = useState<{
    x: number;
    y: number;
    show: boolean;
  }>({ x: 0, y: 0, show: false });

  // Motion values for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Transform for the inner content (moves more than the button)
  const innerX = useTransform(springX, (val) => val * 0.3);
  const innerY = useTransform(springY, (val) => val * 0.3);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      x.set(distanceX * magneticStrength);
      y.set(distanceY * magneticStrength);
    },
    [disabled, magneticStrength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      // Ripple effect
      if (ripple && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setRippleStyle({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          show: true,
        });
        setTimeout(() => setRippleStyle((prev) => ({ ...prev, show: false })), 600);
      }

      onClick?.();
    },
    [disabled, ripple, onClick]
  );

  // Variant styles
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-primary to-secondary text-white
      hover:shadow-xl hover:shadow-primary/30
    `,
    secondary: `
      bg-muted/80 text-foreground border border-primary/20
      hover:border-primary/40 hover:bg-muted
    `,
    ghost: `
      bg-transparent text-foreground
      hover:bg-primary/10
    `,
    outline: `
      bg-transparent border-2 border-primary/50 text-primary
      hover:bg-primary/10 hover:border-primary
    `,
  };

  // Size styles
  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      disabled={disabled}
      style={{
        x: springX,
        y: springY,
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden cursor-pointer font-semibold
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${unstyled ? "" : variantStyles[variant]}
        ${unstyled ? "" : sizeStyles[size]}
        ${className}
      `}
    >
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur-xl opacity-0 transition-opacity duration-300 -z-10"
          animate={{ opacity: isHovered ? 0.4 : 0 }}
        />
      )}

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      </motion.div>

      {/* Ripple effect */}
      {ripple && rippleStyle.show && (
        <motion.span
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            left: rippleStyle.x,
            top: rippleStyle.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Inner content with additional magnetic movement */}
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        style={{ x: innerX, y: innerY }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
