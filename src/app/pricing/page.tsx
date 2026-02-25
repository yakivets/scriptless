'use client';

import { motion } from 'framer-motion';
import { Check, X, Zap, Star, Building2, HelpCircle, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface PricingFeature {
    name: string;
    included: boolean;
    tooltip?: string;
}

interface PricingTier {
    name: string;
    icon: LucideIcon;
    price: string;
    period: string;
    description: string;
    features: PricingFeature[];
    cta: string;
    ctaVariant: 'default' | 'outline';
    popular: boolean;
    gradient: string;
}

const pricingTiers: PricingTier[] = [
    {
        name: 'Free',
        icon: Zap,
        price: '$0',
        period: '/forever',
        description: 'Perfect for prototyping and testing your ideas',
        features: [
            { name: '1,000 API calls/month', included: true },
            { name: '3 NPCs maximum', included: true },
            { name: 'Basic personality traits', included: true },
            { name: 'Community support', included: true },
            { name: 'Watermark in dialogue', included: true, tooltip: 'A small Scriptless attribution appears in responses' },
            { name: 'Advanced personalities', included: false },
            { name: 'Custom voice styles', included: false },
            { name: 'Priority support', included: false },
            { name: 'API analytics', included: false },
        ],
        cta: 'Start Free',
        ctaVariant: 'outline' as const,
        popular: false,
        gradient: 'from-slate-500 to-zinc-600',
    },
    {
        name: 'Indie',
        icon: Star,
        price: '$19',
        period: '/month',
        description: 'Great for indie developers and small studios',
        features: [
            { name: '50,000 API calls/month', included: true },
            { name: 'Unlimited NPCs', included: true },
            { name: 'Advanced personality traits', included: true },
            { name: 'Priority email support', included: true },
            { name: 'No watermark', included: true },
            { name: 'Custom voice styles', included: true },
            { name: 'Conversation history', included: true },
            { name: 'Basic analytics', included: true },
            { name: 'Custom AI training', included: false },
        ],
        cta: 'Start Free Trial',
        ctaVariant: 'default' as const,
        popular: true,
        gradient: 'from-cyan-500 to-purple-500',
    },
    {
        name: 'Studio',
        icon: Building2,
        price: '$99',
        period: '/month',
        description: 'For professional studios and large games',
        features: [
            { name: 'Unlimited API calls', included: true },
            { name: 'Unlimited NPCs', included: true },
            { name: 'Custom AI training', included: true, tooltip: 'Train NPCs on your own lore and dialogue' },
            { name: 'Dedicated support manager', included: true },
            { name: 'SLA guarantee (99.9%)', included: true },
            { name: 'White-label solution', included: true },
            { name: 'Advanced analytics', included: true },
            { name: 'Multi-game support', included: true },
            { name: 'SSO & team management', included: true },
        ],
        cta: 'Contact Sales',
        ctaVariant: 'outline' as const,
        popular: false,
        gradient: 'from-amber-500 to-orange-500',
    },
];

const faqs = [
    {
        question: 'What counts as an API call?',
        answer: 'Each message sent to an NPC and the response received counts as one API call. Batch operations may count as multiple calls.',
    },
    {
        question: 'Can I upgrade or downgrade at any time?',
        answer: 'Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the start of your next billing cycle.',
    },
    {
        question: 'Do you offer discounts for annual billing?',
        answer: 'Yes! Annual plans receive a 20% discount. Contact our sales team for more details on annual pricing.',
    },
    {
        question: 'What happens if I exceed my API limit?',
        answer: 'We\'ll notify you when you\'re approaching your limit. On Free plans, API calls are paused until the next month. On paid plans, you can choose to upgrade or pay overage fees.',
    },
    {
        question: 'Is there a free trial for paid plans?',
        answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start.',
    },
    {
        question: 'Can I cancel my subscription?',
        answer: 'Yes, you can cancel at any time. You\'ll continue to have access until the end of your current billing period.',
    },
];

const comparisonFeatures = [
    { name: 'API Calls', free: '1,000/mo', indie: '50,000/mo', studio: 'Unlimited' },
    { name: 'NPCs', free: '3', indie: 'Unlimited', studio: 'Unlimited' },
    { name: 'Personality Depth', free: 'Basic', indie: 'Advanced', studio: 'Custom' },
    { name: 'Support', free: 'Community', indie: 'Email', studio: 'Dedicated' },
    { name: 'Analytics', free: '-', indie: 'Basic', studio: 'Advanced' },
    { name: 'Custom Training', free: '-', indie: '-', studio: '✓' },
    { name: 'White Label', free: '-', indie: '-', studio: '✓' },
    { name: 'SLA', free: '-', indie: '-', studio: '99.9%' },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400">
                        Pricing
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        Simple, transparent <span className="gradient-text">pricing</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Start free, upgrade when you're ready. No hidden fees, no surprises.
                        14-day free trial on all paid plans.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                    <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-4 py-1">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}
                            <Card
                                className={`h-full border-white/10 ${tier.popular
                                    ? 'glass-card glow-purple scale-105 relative z-10'
                                    : 'bg-white/5'
                                    }`}
                            >
                                <CardHeader className="text-center pb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mx-auto mb-4`}>
                                        <tier.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                                    <div className="mt-4">
                                        <span className="text-5xl font-bold">{tier.price}</span>
                                        <span className="text-slate-400">{tier.period}</span>
                                    </div>
                                    <CardDescription className="mt-3">{tier.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 mb-8">
                                        {tier.features.map((feature) => (
                                            <li
                                                key={feature.name}
                                                className={`flex items-center gap-3 text-sm ${feature.included ? 'text-slate-300' : 'text-slate-500'
                                                    }`}
                                            >
                                                {feature.included ? (
                                                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                                ) : (
                                                    <X className="w-4 h-4 text-slate-600 flex-shrink-0" />
                                                )}
                                                <span className="flex-1">{feature.name}</span>
                                                {feature.tooltip && (
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <HelpCircle className="w-4 h-4 text-slate-500" />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-[#1e293b] border-white/10">
                                                            <p className="max-w-xs text-sm">{feature.tooltip}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href={tier.name === 'Studio' ? '/contact' : '/builder'}>
                                        <Button
                                            className={`w-full ${tier.popular
                                                ? 'gradient-button text-white border-0'
                                                : 'bg-white/10 hover:bg-white/20 border-0'
                                                }`}
                                        >
                                            {tier.cta}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Feature Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>
                    <Card className="glass-card border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left p-4 font-medium text-slate-400">Feature</th>
                                        <th className="text-center p-4 font-medium">Free</th>
                                        <th className="text-center p-4 font-medium text-cyan-400">Indie</th>
                                        <th className="text-center p-4 font-medium">Studio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonFeatures.map((feature, index) => (
                                        <tr
                                            key={feature.name}
                                            className={index !== comparisonFeatures.length - 1 ? 'border-b border-white/5' : ''}
                                        >
                                            <td className="p-4 text-slate-300">{feature.name}</td>
                                            <td className="p-4 text-center text-slate-400">{feature.free}</td>
                                            <td className="p-4 text-center text-slate-300 bg-white/5">{feature.indie}</td>
                                            <td className="p-4 text-center text-slate-400">{feature.studio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mb-24"
                >
                    <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={faq.question}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="glass-card border-white/10">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">{faq.question}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-400 text-sm">{faq.answer}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Card className="glass-card border-white/10 p-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">
                                Still have questions?
                            </h2>
                            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                                Our team is here to help. Contact us for custom pricing, enterprise solutions,
                                or any other questions you might have.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/builder">
                                    <Button className="gradient-button text-white border-0 px-8">
                                        Start Building Free
                                    </Button>
                                </Link>
                                <Button variant="outline" className="border-white/20 hover:bg-white/5 px-8">
                                    Contact Sales
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
