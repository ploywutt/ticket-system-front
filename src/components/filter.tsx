"use client";

import { ReactNode } from "react";
import { Select } from "./select";
import { XIcon } from "lucide-react";

interface FilterProps<T extends { [key: string]: string }> {
  item: T;
  selected?: string;
  renderSelected: (item: string) => ReactNode;
  renderItem: (item: string) => ReactNode;
  onChange: (item: string) => void;
  onClear?: () => void;
  label: string;
}

export const Filter = <T extends { [key: string]: string }>({
  item,
  selected,
  renderSelected,
  renderItem,
  onChange,
  onClear,
  label,
}: FilterProps<T>) => {
  return (
    <div className="relative w-fit">
      <Select
        items={Object.values(item)}
        selected={selected ?? label}
        renderSelected={(item) => (
          <div className="flex items-center">
            <div className="select-container">
              <p className="text-xs font-extrabold">{selected ?? label}</p>
              {renderSelected(item)}
            </div>
          </div>
        )}
        renderItem={(item) => renderItem(item)}
        onChange={(item) => onChange(item)}
      />
      {selected && onClear && (
        <XIcon
          className="absolute top-2 -right-1 size-4 cursor-pointer text-mute bg-white rounded-full z-10"
          onClick={onClear}
        />
      )}
    </div>
  );
};
