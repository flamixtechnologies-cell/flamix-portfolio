"use client";

import * as React from "react";
import Link from "next/link";
import { MagneticButton as BaseMagneticButton } from "./MagneticButton";

type ButtonVariant = "solid" | "bordered" | "ghost" | "light";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "as"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isIconOnly?: boolean;
  as?: React.ElementType;
}

// Map Button variants to MagneticButton variants
const mapVariant = (variant: ButtonVariant): "primary" | "secondary" | "ghost" | "outline" => {
  switch (variant) {
    case "solid":
      return "primary";
    case "bordered":
      return "outline";
    case "ghost":
      return "ghost";
    case "light":
      return "ghost";
    default:
      return "primary";
  }
};

export function Button({
  className = "",
  children,
  variant = "solid",
  size = "md",
  isLoading,
  startContent,
  endContent,
  isIconOnly,
  disabled,
  as,
  onClick,
  ...props
}: ButtonProps) {
  const content = (
    <>
      {startContent && (
        <span className="mr-2 inline-flex items-center justify-center">
          {startContent}
        </span>
      )}
      <span className={isIconOnly ? "sr-only" : ""}>{children}</span>
      {endContent && (
        <span className="ml-2 inline-flex items-center justify-center">
          {endContent}
        </span>
      )}
    </>
  );

  // If using as Link, render Link with button styling
  if (as === Link || (as && typeof as !== "string")) {
    const Component = as || Link;
    const { href, ...linkProps } = props as any;
    return (
      <Component href={href} {...linkProps} className="inline-block">
        <BaseMagneticButton
          variant={mapVariant(variant)}
          size={size}
          disabled={disabled || isLoading}
          className={className}
          onClick={onClick as () => void}
          glow={variant === "solid"}
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            content
          )}
        </BaseMagneticButton>
      </Component>
    );
  }

  // Regular button usage
  return (
    <BaseMagneticButton
      variant={mapVariant(variant)}
      size={size}
      disabled={disabled || isLoading}
      className={className}
      onClick={onClick as unknown as () => void}
      glow={variant === "solid"}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : (
        content
      )}
    </BaseMagneticButton>
  );
}

