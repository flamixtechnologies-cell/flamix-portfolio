"use client";

import * as React from "react";

interface InputClassNames {
  input?: string;
  inputWrapper?: string;
  label?: string;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, React.PropsWithChildren {
  label?: string;
  variant?: "bordered" | "flat";
  size?: "sm" | "md" | "lg";
  classNames?: InputClassNames;
}

const sizeClasses: Record<NonNullable<InputProps["size"]>, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-4 py-3 text-base",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      className = "",
      classNames,
      variant = "bordered",
      size = "md",
      ...props
    },
    ref,
  ) => {
    const wrapperBase =
      "w-full rounded-xl bg-background/60 backdrop-blur-sm transition-all duration-200";
    const variantClasses =
      variant === "bordered"
        ? "border border-primary/20 hover:border-primary/40 focus-within:border-primary"
        : "border border-transparent";

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            className={`block text-sm font-medium text-foreground/60 ${
              classNames?.label ?? ""
            }`}
          >
            {label}
          </label>
        )}
        <div
          className={`${wrapperBase} ${variantClasses} ${
            classNames?.inputWrapper ?? ""
          }`}
        >
          <input
            ref={ref}
            className={`w-full bg-transparent outline-none placeholder:text-foreground/40 ${sizeClasses[size]} ${
              classNames?.input ?? ""
            } ${className}`}
            {...props}
          />
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

