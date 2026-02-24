'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
    product: [
        { label: 'Features', href: '/#features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/docs#api' },
    ],
    company: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
    ],
    resources: [
        { label: 'Unity Guide', href: '/docs#unity' },
        { label: 'Unreal Guide', href: '/docs#unreal' },
        { label: 'Examples', href: '/examples' },
        { label: 'Community', href: '/community' },
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
    ],
};

const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/yakivetsnikita', label: 'Instagram' },
    { icon: Github, href: 'https://github.com/yakivets', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mykyta-yakivets/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@scriptless.ai', label: 'Email' },
];

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#0a0e1a]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl overflow-hidden">
                                <Image src="/logo.png" alt="Scriptless" width={40} height={40} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-bold gradient-text">Scriptless</span>
                        </Link>
                        <p className="text-slate-400 text-sm mb-6 max-w-xs">
                            Build intelligent NPCs for your games with AI-powered conversations. No coding required.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © 2026 Scriptless. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-sm">
                        Made with ❤️ for game developers everywhere
                    </p>
                </div>
            </div>
        </footer>
    );
}
