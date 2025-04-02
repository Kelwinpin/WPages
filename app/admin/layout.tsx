"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="text-xl font-bold">
                                Landing Page Generator
                            </Link>
                            <div className="hidden md:flex items-center gap-4">
                                <Link
                                    href="/admin"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Administração
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <ModeToggle />
                        </div>
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
