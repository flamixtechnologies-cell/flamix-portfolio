"use client";

import * as React from "react";

interface TextareaClassNames {
  input?: string;
  inputWrapper?: string;
  label?: string;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  variant?: "bordered" | "flat";
  size?: "sm" | "md" | "lg";
  classNames?: TextareaClassNames;
  minRows?: number;
}

const sizeClasses: Record<NonNullable<TextareaProps["size"]>, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-4 py-3 text-base",
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      className = "",
      classNames,
      variant = "bordered",
      size = "md",
      minRows,
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
          <textarea
            ref={ref}
            className={`w-full bg-transparent outline-none placeholder:text-foreground/40 resize-none ${sizeClasses[size]} ${
              classNames?.input ?? ""
            } ${className}`}
            rows={minRows}
            {...props}
          />
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

