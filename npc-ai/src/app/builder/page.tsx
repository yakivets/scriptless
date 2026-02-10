'use client';

import { motion } from 'framer-motion';
import { Bot, Send, Trash2, Key, Save, RefreshCw, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useNPCStore, Occupation, DialogueStyle } from '@/lib/store';

const occupations: Occupation[] = ['Merchant', 'Guard', 'Quest Giver', 'Mechanic', 'Bartender', 'Villager'];
const dialogueStyles: DialogueStyle[] = ['Formal', 'Casual', 'Slang', 'Poetic'];

export default function BuilderPage() {
    const { currentConfig, setCurrentConfig, resetConfig, saveNPC, addMessage, clearChat, chatMessages, isTyping } = useNPCStore();
    const [playerInput, setPlayerInput] = useState('');
    const [apiKey, setApiKey] = useState<string | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const handleSendMessage = () => {
        if (!playerInput.trim()) return;
        addMessage('player', playerInput);
        setPlayerInput('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSaveNPC = () => {
        if (!currentConfig.name.trim()) {
            toast.error('Please enter an NPC name');
            return;
        }
        const id = saveNPC();
        toast.success('NPC saved successfully!', {
            description: `${currentConfig.name} has been added to your NPCs.`,
        });
    };

    const handleGenerateApiKey = () => {
        const key = `npc_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        setApiKey(key);
        navigator.clipboard.writeText(key);
        toast.success('API Key generated and copied!', {
            description: 'The key has been copied to your clipboard.',
        });
    };

    const getPersonalityDescription = () => {
        const traits = [];
        if (currentConfig.friendliness > 70) traits.push('friendly');
        else if (currentConfig.friendliness < 30) traits.push('grumpy');

        if (currentConfig.intelligence > 70) traits.push('wise');
        else if (currentConfig.intelligence < 30) traits.push('simple');

        if (currentConfig.humor > 70) traits.push('witty');
        else if (currentConfig.humor < 30) traits.push('serious');

        return traits.length > 0 ? traits.join(', ') : 'balanced';
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-400">
                        NPC Builder
                    </Badge>
                    <h1 className="text-4xl font-bold mb-2">
                        Create Your <span className="gradient-text">NPC</span>
                    </h1>
                    <p className="text-slate-400">
                        Configure your NPC's personality and test it in real-time.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-[400px_1fr] gap-8">
                    {/* Left Sidebar - Configuration */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="glass-card border-white/10 sticky top-24">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bot className="w-5 h-5 text-cyan-400" />
                                    NPC Configuration
                                </CardTitle>
                                <CardDescription>
                                    Define your character's traits
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="npc-name">NPC Name</Label>
                                    <Input
                                        id="npc-name"
                                        placeholder="Enter NPC name..."
                                        value={currentConfig.name}
                                        onChange={(e) => setCurrentConfig({ name: e.target.value })}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>

                                {/* Occupation Select */}
                                <div className="space-y-2">
                                    <Label>Occupation</Label>
                                    <Select
                                        value={currentConfig.occupation}
                                        onValueChange={(value: Occupation) => setCurrentConfig({ occupation: value })}
                                    >
                                        <SelectTrigger className="bg-white/5 border-white/10">
                                            <SelectValue placeholder="Select occupation" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1e293b] border-white/10">
                                            {occupations.map((occupation) => (
                                                <SelectItem key={occupation} value={occupation}>
                                                    {occupation}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator className="bg-white/10" />

                                {/* Personality Sliders */}
                                <div className="space-y-6">
                                    <h3 className="text-sm font-medium text-slate-400">Personality Traits</h3>

                                    {/* Friendliness */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <Label className="text-sm">Friendliness</Label>
                                            <span className="text-sm text-cyan-400">{currentConfig.friendliness}%</span>
                                        </div>
                                        <Slider
                                            value={[currentConfig.friendliness]}
                                            onValueChange={([value]) => setCurrentConfig({ friendliness: value })}
                                            max={100}
                                            step={1}
                                            className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-cyan-500 [&_[role=slider]]:to-purple-500"
                                        />
                                        <div className="flex justify-between text-xs text-slate-500">
                                            <span>Hostile</span>
                                            <span>Friendly</span>
                                        </div>
                                    </div>

                                    {/* Intelligence */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <Label className="text-sm">Intelligence</Label>
                                            <span className="text-sm text-cyan-400">{currentConfig.intelligence}%</span>
                                        </div>
                                        <Slider
                                            value={[currentConfig.intelligence]}
                                            onValueChange={([value]) => setCurrentConfig({ intelligence: value })}
                                            max={100}
                                            step={1}
                                            className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-cyan-500 [&_[role=slider]]:to-purple-500"
                                        />
                                        <div className="flex justify-between text-xs text-slate-500">
                                            <span>Simple</span>
                                            <span>Genius</span>
                                        </div>
                                    </div>

                                    {/* Humor */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <Label className="text-sm">Humor</Label>
                                            <span className="text-sm text-cyan-400">{currentConfig.humor}%</span>
                                        </div>
                                        <Slider
                                            value={[currentConfig.humor]}
                                            onValueChange={([value]) => setCurrentConfig({ humor: value })}
                                            max={100}
                                            step={1}
                                            className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-cyan-500 [&_[role=slider]]:to-purple-500"
                                        />
                                        <div className="flex justify-between text-xs text-slate-500">
                                            <span>Serious</span>
                                            <span>Hilarious</span>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-white/10" />

                                {/* Dialogue Style */}
                                <div className="space-y-3">
                                    <Label>Dialogue Style</Label>
                                    <RadioGroup
                                        value={currentConfig.dialogueStyle}
                                        onValueChange={(value: DialogueStyle) => setCurrentConfig({ dialogueStyle: value })}
                                        className="grid grid-cols-2 gap-3"
                                    >
                                        {dialogueStyles.map((style) => (
                                            <div key={style} className="flex items-center space-x-2">
                                                <RadioGroupItem value={style} id={style} />
                                                <Label htmlFor={style} className="text-sm cursor-pointer">
                                                    {style}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <Separator className="bg-white/10" />

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Button
                                        onClick={handleSaveNPC}
                                        className="w-full gradient-button text-white border-0"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save NPC
                                    </Button>
                                    <Button
                                        onClick={handleGenerateApiKey}
                                        variant="outline"
                                        className="w-full border-white/20 hover:bg-white/5"
                                    >
                                        <Key className="w-4 h-4 mr-2" />
                                        Generate API Key
                                    </Button>
                                    {apiKey && (
                                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                            <p className="text-xs text-slate-400 mb-1">Your API Key:</p>
                                            <code className="text-xs text-cyan-400 break-all">{apiKey}</code>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Right Panel - Chat Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="glass-card border-white/10 h-[calc(100vh-200px)] flex flex-col">
                            <CardHeader className="flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                                            <Bot className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                {currentConfig.name || 'Unnamed NPC'}
                                                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 text-xs">
                                                    {currentConfig.occupation}
                                                </Badge>
                                            </CardTitle>
                                            <CardDescription className="capitalize">
                                                {getPersonalityDescription()} • {currentConfig.dialogueStyle.toLowerCase()} speech
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            clearChat();
                                            toast.info('Chat cleared');
                                        }}
                                        className="text-slate-400 hover:text-white"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardHeader>

                            <Separator className="bg-white/10" />

                            {/* Chat Messages */}
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4">
                                    {chatMessages.length === 0 && (
                                        <div className="text-center py-12">
                                            <Bot className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                            <p className="text-slate-500">Start a conversation with your NPC!</p>
                                            <p className="text-slate-600 text-sm mt-2">
                                                Type a message below to test your NPC's responses.
                                            </p>
                                        </div>
                                    )}

                                    {chatMessages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex items-start gap-3 ${message.role === 'player' ? 'flex-row-reverse' : ''
                                                }`}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'player'
                                                        ? 'bg-white/10'
                                                        : 'bg-gradient-to-br from-cyan-500 to-purple-500'
                                                    }`}
                                            >
                                                {message.role === 'player' ? (
                                                    <User className="w-4 h-4 text-slate-300" />
                                                ) : (
                                                    <Bot className="w-4 h-4 text-white" />
                                                )}
                                            </div>
                                            <div
                                                className={`max-w-[75%] rounded-2xl p-4 ${message.role === 'player'
                                                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-tr-none'
                                                        : 'bg-white/5 rounded-tl-none'
                                                    }`}
                                            >
                                                <p className="text-sm text-slate-200">{message.content}</p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Typing Indicator */}
                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="bg-white/5 rounded-2xl rounded-tl-none p-4">
                                                <div className="typing-indicator flex gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div ref={chatEndRef} />
                                </div>
                            </ScrollArea>

                            <Separator className="bg-white/10" />

                            {/* Input Area */}
                            <div className="p-4 flex-shrink-0">
                                <div className="flex gap-3">
                                    <Input
                                        placeholder="Type your message..."
                                        value={playerInput}
                                        onChange={(e) => setPlayerInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="flex-1 bg-white/5 border-white/10"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        className="gradient-button text-white border-0"
                                        disabled={!playerInput.trim()}
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-slate-500 mt-2 text-center">
                                    Test your NPC before purchasing • Changes apply in real-time
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
