'use client';

import { motion } from 'framer-motion';
import { Copy, Check, BookOpen, Code2, Terminal, Zap, Box, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { toast } from 'sonner';

const codeSnippets = {
    unity: `using Scriptless;
using UnityEngine;

public class DialogueController : MonoBehaviour
{
    private NPCClient client;
    public string npcId = "uncle-marco";

    void Start()
    {
        // Initialize with your API key
        client = new NPCClient("YOUR_API_KEY");
    }

    public async void OnPlayerInteract(string playerInput)
    {
        try
        {
            // Send message to NPC and get response
            NPCResponse response = await client.Chat(
                npcId: npcId,
                message: playerInput,
                context: new { 
                    location = "garage",
                    timeOfDay = "morning"
                }
            );

            // Display the NPC's response
            dialogueUI.ShowMessage(response.content);
            
            // Optional: Handle emotion/animation data
            if (response.emotion != null)
            {
                npcAnimator.SetTrigger(response.emotion);
            }
        }
        catch (NPCException e)
        {
            Debug.LogError($"NPC Error: {e.Message}");
        }
    }
}`,
    unreal: `// NPCDialogueComponent.h
#pragma once
#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "ScriptlessSDK.h"
#include "NPCDialogueComponent.generated.h"

UCLASS(ClassGroup=(Custom), meta=(BlueprintSpawnableComponent))
class MYGAME_API UNPCDialogueComponent : public UActorComponent
{
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString NPCId = "uncle-marco";

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString APIKey = "YOUR_API_KEY";

    UFUNCTION(BlueprintCallable, Category = "NPC")
    void SendMessage(const FString& PlayerInput);

    UFUNCTION(BlueprintImplementableEvent, Category = "NPC")
    void OnResponseReceived(const FNPCResponse& Response);

private:
    TSharedPtr<FScriptlessClient> Client;

protected:
    virtual void BeginPlay() override;
};

// NPCDialogueComponent.cpp
#include "NPCDialogueComponent.h"

void UNPCDialogueComponent::BeginPlay()
{
    Super::BeginPlay();
    Client = MakeShared<FScriptlessClient>(APIKey);
}

void UNPCDialogueComponent::SendMessage(const FString& PlayerInput)
{
    Client->Chat(NPCId, PlayerInput, FOnNPCResponse::CreateLambda(
        [this](const FNPCResponse& Response)
        {
            OnResponseReceived(Response);
        }
    ));
}`,
    rest: `# Using cURL
curl -X POST "https://api.scriptless.ai/v1/chat" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "npc_id": "uncle-marco",
    "message": "Hey, can you help me fix my car?",
    "context": {
      "location": "garage",
      "player_state": "carrying_toolbox"
    }
  }'

# Response
{
  "id": "msg_abc123",
  "npc_id": "uncle-marco",
  "content": "*wipes hands on rag* Hey kid, need help with your car? Let me take a look under that hood...",
  "emotion": "friendly",
  "action": null,
  "tokens_used": 45
}


# Using Python
import scriptless

client = scriptless.Client("YOUR_API_KEY")

response = client.chat(
    npc_id="uncle-marco",
    message="Hey, can you help me fix my car?",
    context={
        "location": "garage",
        "player_state": "carrying_toolbox"
    }
)

print(response.content)


# Using JavaScript/Node.js
import { NPCClient } from 'scriptless';

const client = new NPCClient('YOUR_API_KEY');

const response = await client.chat({
  npcId: 'uncle-marco',
  message: 'Hey, can you help me fix my car?',
  context: {
    location: 'garage',
    playerState: 'carrying_toolbox'
  }
});

console.log(response.content);`,
};

const unityPasteCode = `// Paste this into a C# script in Unity. Set BaseUrl and ApiKey (from the NPC Builder),
// then call SendMessage from your NPC/interaction logic and use the returned content/emotion in your game.

using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

[Serializable]
public class NPCChatResponse
{
    public string id;
    public string npc_id;
    public string content;
    public string emotion;
    public string action;
    public int tokens_used;
}

public class ScriptlessNPCClient : MonoBehaviour
{
    [Tooltip("API base URL, e.g. https://your-app.vercel.app/api/v1")]
    public string baseUrl = "https://your-app.vercel.app/api/v1";

    [Tooltip("API key from the NPC Builder")]
    public string apiKey = "YOUR_API_KEY";

    public void SendMessage(string npcId, string message, Action<NPCChatResponse> onSuccess, Action<string> onError)
    {
        if (string.IsNullOrEmpty(baseUrl) || string.IsNullOrEmpty(apiKey))
        {
            onError?.Invoke("BaseUrl and ApiKey must be set.");
            return;
        }
        StartCoroutine(SendMessageCoroutine(npcId, message, onSuccess, onError));
    }

    private IEnumerator SendMessageCoroutine(string npcId, string message, Action<NPCChatResponse> onSuccess, Action<string> onError)
    {
        string url = baseUrl.TrimEnd('/') + "/chat";
        string body = JsonUtility.ToJson(new ChatRequest { npc_id = npcId, message = message });
        using (UnityWebRequest req = new UnityWebRequest(url, "POST"))
        {
            req.uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(body));
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("Content-Type", "application/json");
            req.SetRequestHeader("Authorization", "Bearer " + apiKey);
            yield return req.SendWebRequest();
            if (req.result != UnityWebRequest.Result.Success)
            {
                onError?.Invoke(req.error + (req.downloadHandler?.text ?? ""));
                yield break;
            }
            try
            {
                NPCChatResponse response = JsonUtility.FromJson<NPCChatResponse>(req.downloadHandler.text);
                onSuccess?.Invoke(response);
            }
            catch (Exception e) { onError?.Invoke("Parse error: " + e.Message); }
        }
    }

    [Serializable] private struct ChatRequest { public string npc_id; public string message; }
}`;

const quickstartSteps = [
    {
        step: 1,
        title: 'Create an account',
        description: 'Sign up for a free Scriptless account to get your API key.',
    },
    {
        step: 2,
        title: 'Build your NPC',
        description: 'Use the NPC Builder to configure your character\'s personality, occupation, and dialogue style.',
    },
    {
        step: 3,
        title: 'Install the SDK',
        description: 'Add the Scriptless SDK to your Unity or Unreal project, or use the REST API directly.',
    },
    {
        step: 4,
        title: 'Initialize the client',
        description: 'Create a new client instance with your API key.',
    },
    {
        step: 5,
        title: 'Send messages',
        description: 'Call the chat method with your NPC ID and player input to get dynamic responses.',
    },
    {
        step: 6,
        title: 'Display responses',
        description: 'Show the NPC\'s response in your game\'s dialogue UI.',
    },
];

function CodeBlock({ code, language }: { code: string; language: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-sm text-slate-400">{language}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-slate-400 hover:text-white h-8"
                >
                    {copied ? (
                        <Check className="w-4 h-4 mr-1" />
                    ) : (
                        <Copy className="w-4 h-4 mr-1" />
                    )}
                    {copied ? 'Copied!' : 'Copy'}
                </Button>
            </div>
            <pre className="p-4 overflow-x-auto bg-[#0d1117] max-h-[500px]">
                <code className="text-sm text-slate-300 whitespace-pre">{code}</code>
            </pre>
        </div>
    );
}

export default function DocsPage() {
    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-400">
                        Documentation
                    </Badge>
                    <h1 className="text-4xl font-bold mb-4">
                        Get started with <span className="gradient-text">Scriptless</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Everything you need to integrate intelligent NPCs into your game. Choose your platform and follow our step-by-step guides.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                    {/* Quick Links Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="hidden lg:block"
                    >
                        <Card className="glass-card border-white/10 sticky top-24">
                            <CardHeader>
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-cyan-400" />
                                    On this page
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <a href="#quickstart" className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                                    Quickstart Guide
                                </a>
                                <a href="#sdks" className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                                    SDK Installation
                                </a>
                                <a href="#code-examples" className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                                    Code Examples
                                </a>
                                <a href="#use-in-unity" className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                                    Use in Unity
                                </a>
                                <a href="#api-reference" className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                                    API Reference
                                </a>
                                <Separator className="bg-white/10 my-4" />
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline" className="border-white/20 text-xs">
                                        <Box className="w-3 h-3 mr-1" />
                                        Unity
                                    </Badge>
                                    <Badge variant="outline" className="border-white/20 text-xs">
                                        <Zap className="w-3 h-3 mr-1" />
                                        Unreal
                                    </Badge>
                                    <Badge variant="outline" className="border-white/20 text-xs">
                                        <Globe className="w-3 h-3 mr-1" />
                                        REST
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-12"
                    >
                        {/* Quickstart Guide */}
                        <section id="quickstart">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Terminal className="w-6 h-6 text-cyan-400" />
                                Quickstart Guide
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {quickstartSteps.map((step, index) => (
                                    <motion.div
                                        key={step.step}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                    >
                                        <Card className="glass-card border-white/10 h-full">
                                            <CardHeader className="pb-2">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-3">
                                                    <span className="text-white font-bold">{step.step}</span>
                                                </div>
                                                <CardTitle className="text-base">{step.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription>{step.description}</CardDescription>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* SDK Installation */}
                        <section id="sdks">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Box className="w-6 h-6 text-purple-400" />
                                SDK Installation
                            </h2>
                            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                                <Card className="glass-card border-white/10">
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Box className="w-5 h-5" />
                                            Unity
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <code className="text-sm text-cyan-400 bg-white/5 px-2 py-1 rounded">
                                            com.scriptless.sdk
                                        </code>
                                        <p className="text-sm text-slate-400 mt-3">
                                            Add via Package Manager using the git URL.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="glass-card border-white/10">
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Zap className="w-5 h-5" />
                                            Unreal Engine
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <code className="text-sm text-cyan-400 bg-white/5 px-2 py-1 rounded">
                                            ScriptlessPlugin
                                        </code>
                                        <p className="text-sm text-slate-400 mt-3">
                                            Download from Marketplace or build from source.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="glass-card border-white/10">
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Globe className="w-5 h-5" />
                                            REST API
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <code className="text-sm text-cyan-400 bg-white/5 px-2 py-1 rounded">
                                            api.scriptless.ai/v1
                                        </code>
                                        <p className="text-sm text-slate-400 mt-3">
                                            Use with any language or platform.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* Code Examples */}
                        <section id="code-examples">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Code2 className="w-6 h-6 text-cyan-400" />
                                Code Examples
                            </h2>
                            <Tabs defaultValue="unity" className="w-full">
                                <TabsList className="glass border border-white/10 mb-4">
                                    <TabsTrigger value="unity" className="data-[state=active]:bg-white/10">
                                        <Box className="w-4 h-4 mr-2" />
                                        Unity (C#)
                                    </TabsTrigger>
                                    <TabsTrigger value="unreal" className="data-[state=active]:bg-white/10">
                                        <Zap className="w-4 h-4 mr-2" />
                                        Unreal (C++)
                                    </TabsTrigger>
                                    <TabsTrigger value="rest" className="data-[state=active]:bg-white/10">
                                        <Globe className="w-4 h-4 mr-2" />
                                        REST API
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="unity">
                                    <CodeBlock code={codeSnippets.unity} language="C# - Unity" />
                                </TabsContent>
                                <TabsContent value="unreal">
                                    <CodeBlock code={codeSnippets.unreal} language="C++ - Unreal Engine" />
                                </TabsContent>
                                <TabsContent value="rest">
                                    <CodeBlock code={codeSnippets.rest} language="REST API - Multiple Languages" />
                                </TabsContent>
                            </Tabs>
                        </section>

                        {/* Use in Unity */}
                        <section id="use-in-unity">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Box className="w-6 h-6 text-cyan-400" />
                                Use in Unity
                            </h2>
                            <p className="text-slate-400 mb-4">
                                This app provides a mock API at <code className="text-cyan-400 bg-white/5 px-1.5 py-0.5 rounded">POST /api/v1/chat</code> when deployed.
                                In the <strong>NPC Builder</strong> you define the character and <strong>what they should know about the game</strong>, then <strong>Generate API Key</strong>.
                                Paste the code below into Unity, set <strong>Base URL</strong> to your deployed app (e.g. <code className="text-cyan-400 bg-white/5 px-1.5 py-0.5 rounded">https://your-app.vercel.app/api/v1</code>) and <strong>API key</strong> from the Builder, then call the client from your NPC logic and use <code className="text-cyan-400 bg-white/5 px-1.5 py-0.5 rounded">content</code> / <code className="text-cyan-400 bg-white/5 px-1.5 py-0.5 rounded">emotion</code> however you like (no chat UI specified).
                            </p>
                            <CodeBlock code={unityPasteCode} language="C# - Paste into Unity" />
                        </section>

                        {/* API Reference Preview */}
                        <section id="api-reference">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Terminal className="w-6 h-6 text-purple-400" />
                                API Reference
                            </h2>
                            <Card className="glass-card border-white/10">
                                <CardHeader>
                                    <CardTitle>POST /v1/chat</CardTitle>
                                    <CardDescription>Send a message to an NPC and receive a response</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-start gap-3 p-2 rounded bg-white/5">
                                                <code className="text-cyan-400">npc_id</code>
                                                <span className="text-slate-400">string, required</span>
                                                <span className="text-slate-500 flex-1">The unique identifier of the NPC</span>
                                            </div>
                                            <div className="flex items-start gap-3 p-2 rounded bg-white/5">
                                                <code className="text-cyan-400">message</code>
                                                <span className="text-slate-400">string, required</span>
                                                <span className="text-slate-500 flex-1">The player's message to the NPC</span>
                                            </div>
                                            <div className="flex items-start gap-3 p-2 rounded bg-white/5">
                                                <code className="text-cyan-400">context</code>
                                                <span className="text-slate-400">object, optional</span>
                                                <span className="text-slate-500 flex-1">Additional context for the conversation</span>
                                            </div>
                                            <div className="flex items-start gap-3 p-2 rounded bg-white/5">
                                                <code className="text-cyan-400">history</code>
                                                <span className="text-slate-400">array, optional</span>
                                                <span className="text-slate-500 flex-1">Previous messages in the conversation</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator className="bg-white/10" />
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Response</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-start gap-3 p-2 rounded bg-white/5">
                                                <code className="text-purple-400">content</code>
                                                <span className="text-slate-400">string</span>
                                                <span className="text-slate-500 flex-1">The NPC's response message</span>
                                            </div>
                                            <div className="flex items-start gap-3 p-2 rounded bg-white/5">
                                                <code className="text-purple-400">emotion</code>
                                                <span className="text-slate-400">string</span>
                                                <span className="text-slate-500 flex-1">Detected emotion for animation triggers</span>
                                            </div>
                                            <div className="flex items-start gap-3 p-2 rounded bg-white/5">
                                                <code className="text-purple-400">tokens_used</code>
                                                <span className="text-slate-400">integer</span>
                                                <span className="text-slate-500 flex-1">Number of tokens consumed</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
