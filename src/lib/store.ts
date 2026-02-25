import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Occupation = 'Merchant' | 'Guard' | 'Quest Giver' | 'Mechanic' | 'Bartender' | 'Villager';
export type DialogueStyle = 'Formal' | 'Casual' | 'Slang' | 'Poetic';

export interface NPC {
    id: string;
    name: string;
    occupation: Occupation;
    friendliness: number;
    intelligence: number;
    humor: number;
    dialogueStyle: DialogueStyle;
    gameKnowledge?: string;
    apiCalls: number;
    createdAt: Date;
    apiKey?: string;
}

export interface NPCConfig {
    name: string;
    occupation: Occupation;
    friendliness: number;
    intelligence: number;
    humor: number;
    dialogueStyle: DialogueStyle;
    gameKnowledge: string;
}

export interface Message {
    id: string;
    role: 'player' | 'npc';
    content: string;
    timestamp: Date;
}

interface NPCStore {
    npcs: NPC[];
    currentConfig: NPCConfig;
    chatMessages: Message[];
    isTyping: boolean;

    // Actions
    setCurrentConfig: (config: Partial<NPCConfig>) => void;
    resetConfig: () => void;
    saveNPC: () => string;
    deleteNPC: (id: string) => void;
    updateNPC: (id: string, updates: Partial<NPC>) => void;
    generateApiKey: (npcId: string) => string;
    addMessage: (role: 'player' | 'npc', content: string) => void;
    clearChat: () => void;
    setIsTyping: (isTyping: boolean) => void;
}

const defaultConfig: NPCConfig = {
    name: 'Uncle Marco',
    occupation: 'Mechanic',
    friendliness: 75,
    intelligence: 65,
    humor: 80,
    dialogueStyle: 'Casual',
    gameKnowledge: '',
};

// Sample NPC responses based on configuration
const generateNPCResponse = (config: NPCConfig, playerMessage: string): string => {
    const responses: Record<Occupation, string[]> = {
        'Mechanic': [
            "Hey kid, need help with your car?",
            "Let me take a look under that hood...",
            "I've been fixing engines since before you were born!",
            "That's gonna cost ya, but I'll give you a fair deal.",
            "You know, back in my day, cars didn't have all these fancy computers.",
        ],
        'Merchant': [
            "Welcome, welcome! Take a look at my wares.",
            "I have just the thing you're looking for!",
            "A fine choice! You have excellent taste.",
            "Perhaps I can interest you in something special?",
            "Everything here is of the finest quality, I assure you.",
        ],
        'Guard': [
            "Halt! State your business.",
            "Keep moving, citizen. Nothing to see here.",
            "I've got my eye on you...",
            "The streets are dangerous at night. Be careful.",
            "Any trouble and you'll answer to me.",
        ],
        'Quest Giver': [
            "Ah, a brave adventurer! I have a task for you.",
            "There's been trouble in the old ruins...",
            "Complete this quest, and you'll be rewarded handsomely.",
            "I've been waiting for someone with your skills.",
            "The fate of the village rests in your hands.",
        ],
        'Bartender': [
            "What'll it be, stranger?",
            "You look like you could use a drink.",
            "I hear all sorts of interesting rumors in here...",
            "We don't serve your kind here. Just kidding!",
            "Another round? Coming right up!",
        ],
        'Villager': [
            "Beautiful day, isn't it?",
            "Have you heard the latest news?",
            "Times have been tough lately...",
            "It's nice to see a friendly face.",
            "The harvest was good this year.",
        ],
    };

    let response = responses[config.occupation][Math.floor(Math.random() * responses[config.occupation].length)];

    // Apply dialogue style modifications
    if (config.dialogueStyle === 'Formal') {
        response = response.replace(/Hey|Hey kid/g, 'Good day').replace(/gonna/g, 'going to');
    } else if (config.dialogueStyle === 'Slang') {
        response = response.replace(/Hello|Welcome/g, "Yo, what's up").replace(/you/g, 'ya');
    } else if (config.dialogueStyle === 'Poetic') {
        response = `*${response}* — as the wind whispers through the ages...`;
    }

    // Apply friendliness
    if (config.friendliness > 80) {
        response = `*smiles warmly* ${response}`;
    } else if (config.friendliness < 30) {
        response = `*grumbles* ${response}`;
    }

    // Apply humor
    if (config.humor > 70 && Math.random() > 0.5) {
        response += " Ha! Just kidding... well, mostly.";
    }

    return response;
};

export const useNPCStore = create<NPCStore>()(
    persist(
        (set, get) => ({
            npcs: [
                {
                    id: '1',
                    name: 'Uncle Marco',
                    occupation: 'Mechanic',
                    friendliness: 75,
                    intelligence: 65,
                    humor: 80,
                    dialogueStyle: 'Casual',
                    gameKnowledge: '',
                    apiCalls: 1234,
                    createdAt: new Date('2025-01-15'),
                    apiKey: 'npc_demo_xxxxxxxx',
                },
                {
                    id: '2',
                    name: 'Lady Evelyn',
                    occupation: 'Quest Giver',
                    friendliness: 60,
                    intelligence: 90,
                    humor: 30,
                    dialogueStyle: 'Formal',
                    gameKnowledge: '',
                    apiCalls: 567,
                    createdAt: new Date('2025-02-01'),
                },
                {
                    id: '3',
                    name: 'Grug the Guard',
                    occupation: 'Guard',
                    friendliness: 40,
                    intelligence: 45,
                    humor: 20,
                    dialogueStyle: 'Casual',
                    gameKnowledge: '',
                    apiCalls: 890,
                    createdAt: new Date('2025-02-05'),
                },
            ],
            currentConfig: defaultConfig,
            chatMessages: [],
            isTyping: false,

            setCurrentConfig: (config) =>
                set((state) => ({
                    currentConfig: { ...state.currentConfig, ...config },
                })),

            resetConfig: () => set({ currentConfig: defaultConfig, chatMessages: [] }),

            saveNPC: () => {
                const { currentConfig, npcs } = get();
                const newNPC: NPC = {
                    id: Date.now().toString(),
                    ...currentConfig,
                    apiCalls: 0,
                    createdAt: new Date(),
                };
                set({ npcs: [...npcs, newNPC] });
                return newNPC.id;
            },

            deleteNPC: (id) =>
                set((state) => ({
                    npcs: state.npcs.filter((npc) => npc.id !== id),
                })),

            updateNPC: (id, updates) =>
                set((state) => ({
                    npcs: state.npcs.map((npc) =>
                        npc.id === id ? { ...npc, ...updates } : npc
                    ),
                })),

            generateApiKey: (npcId) => {
                const apiKey = `npc_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
                get().updateNPC(npcId, { apiKey });
                return apiKey;
            },

            addMessage: (role, content) => {
                const message: Message = {
                    id: Date.now().toString(),
                    role,
                    content,
                    timestamp: new Date(),
                };
                set((state) => ({
                    chatMessages: [...state.chatMessages, message],
                }));

                // If player message, generate NPC response
                if (role === 'player') {
                    set({ isTyping: true });
                    setTimeout(() => {
                        const response = generateNPCResponse(get().currentConfig, content);
                        const npcMessage: Message = {
                            id: (Date.now() + 1).toString(),
                            role: 'npc',
                            content: response,
                            timestamp: new Date(),
                        };
                        set((state) => ({
                            chatMessages: [...state.chatMessages, npcMessage],
                            isTyping: false,
                        }));
                    }, 1000 + Math.random() * 1000);
                }
            },

            clearChat: () => set({ chatMessages: [] }),

            setIsTyping: (isTyping) => set({ isTyping }),
        }),
        {
            name: 'npc-ai-storage',
            partialize: (state) => ({ npcs: state.npcs }),
        }
    )
);
