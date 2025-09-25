"use client";

import { cn } from "@/lib/utils/cn";
import { ReactNode, useEffect, useRef, useState } from "react";

interface SelectProps {
  items: string[];
  selected?: string;
  renderSelected?: (item: string) => ReactNode;
  renderItem?: (item: string) => ReactNode;
  onChange: (item: string) => void;
}

export const Select = ({
  items,
  selected = "Select an item",
  renderSelected,
  renderItem,
  onChange,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block w-fit">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="cursor-pointer"
      >
        {renderSelected ? renderSelected(selected) : selected}
      </button>

      {open && (
        <div className="absolute left-0 w-fit mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
          {items.map((item) => (
            <button
              key={item}
              className={cn(
                "w-full text-left px-4 py-2 cursor-pointer hover:bg-foreground/[.5]",
                {
                  "font-semibold": item === selected,
                }
              )}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              tabIndex={0}
            >
              {renderItem ? renderItem(item) : item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
