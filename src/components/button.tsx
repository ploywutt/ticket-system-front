"use client";

import { cn } from "@/lib/utils/cn";
import { Loader } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  icon?: React.ReactNode;
  variant?: keyof typeof VARIANTS_CLASS;
  className?: string;
}

const BASE_CLASS =
  "font-semibold text-sm text-primary cursor-pointer rounded-md px-4 py-1";

const VARIANTS_CLASS = {
  default: "bg-primary text-white hover:bg-primary/[.80]",
  outline: "ring-1 ring-primary/[.5] text-primary hover:bg-primary/[.10]",
  ghost:
    "hover:bg-disabled hover:ring-1 hover:ring-primary/[.25] hover:ring-offset-1",
  icon: "flex pl-2 w-8 h-8 rounded-full",
};

export const Button = ({
  title,
  icon,
  variant,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        BASE_CLASS,
        VARIANTS_CLASS[variant || "default"],
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-center">
        {disabled ? <Loader className="size-3" /> : icon}
        <p>{title}</p>
      </div>
    </button>
  );
};
