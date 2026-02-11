"use client";

import * as React from "react";

export interface ChipClassNames {
  base?: string;
  content?: string;
}

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "classNames"> {
  size?: "sm" | "md";
  classNames?: ChipClassNames;
}

export function Chip({ size = "md", className = "", classNames, children, ...props }: ChipProps) {
  const sizeClasses = size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm";
  const baseClasses = classNames?.base || "";
  const contentClasses = classNames?.content || "";

  return (
    <div
      className={`inline-flex items-center rounded-full bg-background/80 border border-foreground/10 text-foreground/80 ${sizeClasses} ${baseClasses} ${className}`}
      {...props}
    >
      <span className={contentClasses}>{children}</span>
    </div>
  );
}

