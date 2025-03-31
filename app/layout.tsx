"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect } from 'react';
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ['latin'] });

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFirstPathSegment(path: string): string {
  const segments = path.split("/").filter(Boolean); // Remove strings vazias do array resultante de split
  return segments.length > 0 ? segments[0] : "";
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const firstSegment = getFirstPathSegment(pathname);
      if (firstSegment) {
        document.title = `${capitalizeFirstLetter(firstSegment)}`;
      }
    }
  }, [pathname]);
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}