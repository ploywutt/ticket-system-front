import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { type ReactNode } from "react";
import { ClientProviders } from "@/app/client-providers";
import { cn } from "@/lib/utils/cn";
import { Navigation } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ticket System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex-1",
          geistSans.variable,
          geistMono.variable,
          "antialiased"
        )}
        suppressHydrationWarning={true}
      >
        <ClientProviders>
          <Navigation />
          <div className="flex-1 h-full px-8 pt-20">{children}</div>
        </ClientProviders>
      </body>
    </html>
  );
}
