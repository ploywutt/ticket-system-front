"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import { Button } from "../button";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const Navigation = () => {
  const router = useRouter();
  const path = usePathname().split("/");
  const isCreatePage = path[path.length - 1] === "create";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-8 bg-background">
      <div className="flex-center gap-4">
        <Image
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-lg border border-white/[.145]"
        />
        <p className="hidden md:block xl:text-2xl font-bold text-foreground">
          Ticket System
        </p>
      </div>
      {!isCreatePage && (
        <Button
          variant="ghost"
          title="Create"
          icon={<Plus className="size-4" />}
          onClick={() => router.push("/tickets/create")}
          className="bg-white text-primary px-4 border-2 border-white/[.25] rounded-full"
        />
      )}
    </div>
  );
};
