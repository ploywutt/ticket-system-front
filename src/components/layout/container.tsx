"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  isNavigationBack?: boolean;
  className?: string;
}

export const Container = ({
  children,
  isNavigationBack = true,
  className,
}: ContainerProps) => {
  const router = useRouter();
  return (
    <main className={cn("flex flex-col gap-2 h-full", className)}>
      <div className="w-full space-y-4">
        <div className="flex justify-between">
          {isNavigationBack && (
            <Button
              title="Back"
              variant="outline"
              className="mr-auto text-white"
              icon={<ChevronLeft className="size-4" />}
              onClick={() => router.back()}
            />
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </main>
  );
};
