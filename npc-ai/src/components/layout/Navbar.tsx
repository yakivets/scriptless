'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/builder', label: 'NPC Builder' },
    { href: '/my-npcs', label: 'My NPCs' },
    { href: '/docs', label: 'Documentation' },
    { href: '/pricing', label: 'Pricing' },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="w-10 h-10 rounded-xl overflow-hidden"
                        >
                            <Image src="/logo.png" alt="Scriptless" width={40} height={40} className="w-full h-full object-cover" />
                        </motion.div>
                        <span className="text-xl font-bold gradient-text">Scriptless</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                        ? 'text-cyan-400 bg-cyan-400/10'
                                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.label}
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button variant="ghost" className="text-slate-300 hover:text-white">
                            Sign In
                        </Button>
                        <Button className="gradient-button text-white border-0">
                            Start Free Trial
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="glass border-l border-white/10 w-[280px]">
                            <div className="flex flex-col gap-4 mt-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${pathname === link.href
                                            ? 'text-cyan-400 bg-cyan-400/10'
                                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="border-t border-white/10 pt-4 mt-4 space-y-3">
                                    <Button variant="ghost" className="w-full justify-start text-slate-300">
                                        Sign In
                                    </Button>
                                    <Button className="w-full gradient-button text-white border-0">
                                        Start Free Trial
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.nav>
    );
}
