'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Bot, Code2, MessageSquare, Puzzle, Sparkles, Zap, Check, Play } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
    {
        icon: MessageSquare,
        title: 'Dynamic Conversations',
        description: 'NPCs respond naturally to player input with context-aware dialogue that feels authentic and engaging.',
        gradient: 'from-cyan-500 to-blue-500',
    },
    {
        icon: Puzzle,
        title: 'Easy Integration',
        description: 'Drop our SDK into your game and get started in 5 minutes. Unity, Unreal, and REST API support.',
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        icon: Zap,
        title: 'Scalable Pricing',
        description: 'Pay only for what you use. Start free, scale as your game grows. No hidden fees.',
        gradient: 'from-orange-500 to-red-500',
    },
];

const pricingTiers = [
    {
        name: 'Free',
        price: '$0',
        period: '/forever',
        description: 'Perfect for prototyping and testing',
        features: [
            '1,000 API calls/month',
            '3 NPCs',
            'Basic personalities',
            'Community support',
            'Watermark in dialogue',
        ],
        cta: 'Start Free',
        popular: false,
    },
    {
        name: 'Indie',
        price: '$19',
        period: '/month',
        description: 'Great for indie developers and small studios',
        features: [
            '50,000 API calls/month',
            'Unlimited NPCs',
            'Advanced personalities',
            'Priority support',
            'No watermark',
            'Custom voice styles',
        ],
        cta: 'Start Trial',
        popular: true,
    },
    {
        name: 'Studio',
        price: '$99',
        period: '/month',
        description: 'For professional studios and large games',
        features: [
            'Unlimited API calls',
            'Unlimited NPCs',
            'Custom AI training',
            'Dedicated support',
            'SLA guarantee',
            'White-label solution',
            'API analytics',
        ],
        cta: 'Contact Sales',
        popular: false,
    },
];

const stats = [
    { value: '10M+', label: 'API Calls Served' },
    { value: '500+', label: 'Games Using Scriptless' },
    { value: '99.9%', label: 'Uptime' },
    { value: '<50ms', label: 'Avg Response Time' },
];

const trustedBy = [
    'Terdessa Games',
    'Pixel Forge',
    'NexGen Studios',
    'Indie Collective',
    'GameCraft',
];

export default function Home() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden min-h-[90vh] flex items-center">
                {/* Animated Background */}
                <div className="absolute inset-0 animated-bg" />
                <div className="absolute inset-0 grid-pattern" />

                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"
                />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ opacity, scale }}
                        className="text-center"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-slate-300">Now supporting Unreal Engine 5.4</span>
                            <ArrowRight className="w-4 h-4 text-cyan-400" />
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
                        >
                            Build Intelligent NPCs
                            <br />
                            <span className="gradient-text">in Minutes</span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10"
                        >
                            No coding required. AI-powered characters for Unity, Unreal, and more.
                            Create dynamic conversations that make your game world feel alive.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link href="/builder">
                                <Button size="lg" className="gradient-button text-white border-0 text-lg px-8 py-6">
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/20 hover:bg-white/5">
                                <Play className="w-5 h-5 mr-2" />
                                Watch Demo
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto"
                        >
                            {stats.map((stat, index) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
                    >
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Trusted By Section */}
            <section className="py-16 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-slate-500 text-sm mb-8">TRUSTED BY GAME DEVELOPERS WORLDWIDE</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        {trustedBy.map((company) => (
                            <motion.div
                                key={company}
                                whileHover={{ scale: 1.05 }}
                                className="text-slate-500 text-lg font-semibold hover:text-slate-300 transition-colors"
                            >
                                {company}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-400">
                            Features
                        </Badge>
                        <h2 className="text-4xl font-bold mb-4">
                            Everything you need to create
                            <br />
                            <span className="gradient-text">memorable NPCs</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Our AI-powered platform gives you the tools to create NPCs that players will remember long after they finish your game.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="glass-card hover-lift h-full border-white/10 bg-white/5">
                                    <CardHeader>
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                                            <feature.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-slate-400 text-base">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Video Section */}
            <section className="py-24 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400">
                            See It In Action
                        </Badge>
                        <h2 className="text-4xl font-bold mb-4">
                            Watch NPCs come to life
                        </h2>
                        <p className="text-slate-400 max-w-xl mx-auto">
                            See how easy it is to create and integrate intelligent NPCs into your game.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl overflow-hidden glass-card glow-purple"
                    >
                        <div className="aspect-video bg-[#111827]">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/VJHO_udwu6c"
                                title="Scriptless Demo"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* NPC Builder Preview */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-400">
                                NPC Builder
                            </Badge>
                            <h2 className="text-4xl font-bold mb-6">
                                Create unique characters
                                <br />
                                <span className="gradient-text">with visual controls</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8">
                                Use our intuitive NPC Builder to design characters with unique personalities. Adjust friendliness, intelligence, humor, and more with simple sliders.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Visual personality configuration',
                                    'Real-time chat preview',
                                    'Multiple dialogue styles',
                                    'Instant API key generation',
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-slate-300">
                                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/builder">
                                <Button className="gradient-button text-white border-0">
                                    Try the Builder
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="glass-card rounded-2xl p-6 glow-cyan">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Uncle Marco</h3>
                                        <p className="text-sm text-slate-400">Mechanic • Casual</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-400">Friendliness</span>
                                            <span className="text-cyan-400">75%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/10">
                                            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-400">Humor</span>
                                            <span className="text-cyan-400">80%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/10">
                                            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#111827] rounded-xl p-4">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="bg-white/5 rounded-lg rounded-tl-none p-3">
                                            <p className="text-sm text-slate-300">Hey kid, need help with your car? I've been fixing engines since before you were born!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Code Integration Section */}
            <section className="py-24 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="glass-card rounded-2xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-sm text-slate-400 ml-2">NPCManager.cs</span>
                                </div>
                                <pre className="p-4 overflow-x-auto text-sm">
                                    <code className="text-slate-300">
                                        {`using Scriptless;

public class DialogueController : MonoBehaviour
{
    private NPCClient client;

    void Start()
    {
        // Initialize with your API key
        client = new NPCClient("sl_abc123xyz");
    }

    public async void OnPlayerInteract(string input)
    {
        // Get AI response from your NPC
        var response = await client.Chat(
            npcId: "uncle-marco",
            message: input
        );

        // Display in your game UI
        dialogueUI.ShowResponse(response);
    }
}`}
                                    </code>
                                </pre>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-400">
                                Integration
                            </Badge>
                            <h2 className="text-4xl font-bold mb-6">
                                Add to your game
                                <br />
                                <span className="gradient-text">in 5 minutes</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8">
                                Our SDKs make integration effortless. Just add a few lines of code and your NPCs are ready to chat with players.
                            </p>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {['Unity', 'Unreal Engine', 'Godot', 'REST API'].map((platform) => (
                                    <div
                                        key={platform}
                                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300"
                                    >
                                        {platform}
                                    </div>
                                ))}
                            </div>
                            <Link href="/docs">
                                <Button variant="outline" className="border-white/20 hover:bg-white/5">
                                    <Code2 className="w-4 h-4 mr-2" />
                                    View Documentation
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400">
                            Pricing
                        </Badge>
                        <h2 className="text-4xl font-bold mb-4">
                            Simple, transparent
                            <br />
                            <span className="gradient-text">pricing</span>
                        </h2>
                        <p className="text-slate-400 max-w-xl mx-auto">
                            Start free, upgrade when you're ready. No hidden fees, no surprises.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {pricingTiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                        <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}
                                <Card className={`h-full border-white/10 ${tier.popular ? 'glass-card glow-purple scale-105' : 'bg-white/5'}`}>
                                    <CardHeader className="text-center pb-2">
                                        <CardTitle className="text-xl">{tier.name}</CardTitle>
                                        <div className="mt-4">
                                            <span className="text-4xl font-bold">{tier.price}</span>
                                            <span className="text-slate-400">{tier.period}</span>
                                        </div>
                                        <CardDescription className="mt-2">{tier.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3 mb-6">
                                            {tier.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                                                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            className={`w-full ${tier.popular ? 'gradient-button text-white border-0' : 'bg-white/10 hover:bg-white/20'}`}
                                        >
                                            {tier.cta}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card rounded-3xl p-12 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-4">
                                Ready to bring your NPCs to life?
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                                Join hundreds of game developers who are creating memorable gaming experiences with Scriptless.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/builder">
                                    <Button size="lg" className="gradient-button text-white border-0 text-lg px-8">
                                        Start Building Free
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 hover:bg-white/5">
                                    Book a Demo
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
