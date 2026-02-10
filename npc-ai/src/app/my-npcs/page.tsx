'use client';

import { motion } from 'framer-motion';
import { Bot, Plus, Edit2, Trash2, Key, MoreVertical, Activity, Calendar, Copy } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useNPCStore } from '@/lib/store';
import { useState } from 'react';

const occupationColors: Record<string, string> = {
    'Mechanic': 'from-orange-500 to-red-500',
    'Merchant': 'from-emerald-500 to-teal-500',
    'Guard': 'from-slate-500 to-zinc-600',
    'Quest Giver': 'from-purple-500 to-pink-500',
    'Bartender': 'from-amber-500 to-orange-500',
    'Villager': 'from-lime-500 to-green-500',
};

export default function MyNPCsPage() {
    const { npcs, deleteNPC, generateApiKey } = useNPCStore();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedNpcId, setSelectedNpcId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        deleteNPC(id);
        setDeleteDialogOpen(false);
        toast.success('NPC deleted successfully');
    };

    const handleGenerateKey = (npcId: string, npcName: string) => {
        const key = generateApiKey(npcId);
        navigator.clipboard.writeText(key);
        toast.success(`API key generated for ${npcName}`, {
            description: 'Copied to clipboard!',
        });
    };

    const handleCopyKey = (apiKey: string) => {
        navigator.clipboard.writeText(apiKey);
        toast.success('API key copied to clipboard');
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
                >
                    <div>
                        <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400">
                            Your NPCs
                        </Badge>
                        <h1 className="text-4xl font-bold mb-2">
                            My <span className="gradient-text">NPCs</span>
                        </h1>
                        <p className="text-slate-400">
                            Manage and configure your AI-powered characters.
                        </p>
                    </div>
                    <Link href="/builder">
                        <Button className="gradient-button text-white border-0">
                            <Plus className="w-4 h-4 mr-2" />
                            Create New NPC
                        </Button>
                    </Link>
                </motion.div>

                {/* Stats Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                    <Card className="glass-card border-white/10">
                        <CardContent className="pt-6">
                            <div className="text-3xl font-bold gradient-text">{npcs.length}</div>
                            <p className="text-sm text-slate-400">Total NPCs</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-white/10">
                        <CardContent className="pt-6">
                            <div className="text-3xl font-bold gradient-text">
                                {npcs.reduce((sum, npc) => sum + npc.apiCalls, 0).toLocaleString()}
                            </div>
                            <p className="text-sm text-slate-400">Total API Calls</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-white/10">
                        <CardContent className="pt-6">
                            <div className="text-3xl font-bold gradient-text">
                                {npcs.filter(npc => npc.apiKey).length}
                            </div>
                            <p className="text-sm text-slate-400">Active Keys</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-white/10">
                        <CardContent className="pt-6">
                            <div className="text-3xl font-bold text-emerald-400">Active</div>
                            <p className="text-sm text-slate-400">Account Status</p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* NPCs Grid */}
                {npcs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center py-16"
                    >
                        <Bot className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No NPCs yet</h3>
                        <p className="text-slate-400 mb-6">Create your first NPC to get started.</p>
                        <Link href="/builder">
                            <Button className="gradient-button text-white border-0">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Your First NPC
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {npcs.map((npc, index) => (
                            <motion.div
                                key={npc.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                            >
                                <Card className="glass-card border-white/10 hover-lift group">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${occupationColors[npc.occupation] || 'from-cyan-500 to-purple-500'} flex items-center justify-center`}>
                                                    <Bot className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">{npc.name}</CardTitle>
                                                    <CardDescription className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline" className="text-xs border-white/20">
                                                            {npc.occupation}
                                                        </Badge>
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-[#1e293b] border-white/10">
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Edit2 className="w-4 h-4 mr-2" />
                                                        Edit NPC
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onClick={() => handleGenerateKey(npc.id, npc.name)}
                                                    >
                                                        <Key className="w-4 h-4 mr-2" />
                                                        Generate API Key
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/10" />
                                                    <DropdownMenuItem
                                                        className="cursor-pointer text-red-400 focus:text-red-400"
                                                        onClick={() => {
                                                            setSelectedNpcId(npc.id);
                                                            setDeleteDialogOpen(true);
                                                        }}
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Delete NPC
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {/* Personality Bars */}
                                        <div className="space-y-3 mb-4">
                                            <div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-slate-500">Friendliness</span>
                                                    <span className="text-slate-400">{npc.friendliness}%</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-white/10">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
                                                        style={{ width: `${npc.friendliness}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-slate-500">Intelligence</span>
                                                    <span className="text-slate-400">{npc.intelligence}%</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-white/10">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
                                                        style={{ width: `${npc.intelligence}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-slate-500">Humor</span>
                                                    <span className="text-slate-400">{npc.humor}%</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-white/10">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
                                                        style={{ width: `${npc.humor}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Activity className="w-4 h-4" />
                                                <span>{npc.apiCalls.toLocaleString()} calls</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(npc.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        {/* API Key */}
                                        {npc.apiKey && (
                                            <div
                                                className="mt-4 p-2 rounded-lg bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
                                                onClick={() => handleCopyKey(npc.apiKey!)}
                                            >
                                                <code className="text-xs text-cyan-400 truncate">
                                                    {npc.apiKey.slice(0, 20)}...
                                                </code>
                                                <Copy className="w-3 h-3 text-slate-400" />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}

                        {/* Create New NPC Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + npcs.length * 0.05 }}
                        >
                            <Link href="/builder">
                                <Card className="border-dashed border-2 border-white/10 hover:border-cyan-500/50 transition-colors cursor-pointer h-full min-h-[280px] flex items-center justify-center bg-transparent">
                                    <CardContent className="text-center">
                                        <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                            <Plus className="w-7 h-7 text-slate-400" />
                                        </div>
                                        <h3 className="font-semibold text-slate-300 mb-1">Create New NPC</h3>
                                        <p className="text-sm text-slate-500">Add another character to your collection</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent className="glass-card border-white/10">
                        <DialogHeader>
                            <DialogTitle>Delete NPC?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete the NPC and revoke any associated API keys.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setDeleteDialogOpen(false)}
                                className="border-white/20"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => selectedNpcId && handleDelete(selectedNpcId)}
                            >
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
