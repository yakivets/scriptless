import { NextRequest, NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Mock canned responses (no per-NPC config; no DB)
const MOCK_RESPONSES = [
  "Hey, I hear you. Let me think about that...",
  "Interesting. Things have been busy around here lately.",
  "I've seen a thing or two. What do you need?",
  "*nods* Sure, I can help with that.",
  "Good question. Not everyone asks that.",
  "You know how it is. We do what we can.",
];

const MOCK_EMOTIONS = ['neutral', 'friendly', 'thoughtful', 'curious'];

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    const auth = request.headers.get('Authorization');
    const apiKey = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!apiKey?.trim()) {
      return NextResponse.json(
        { error: 'Missing or invalid Authorization header. Use: Bearer YOUR_API_KEY' },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body.npc_id !== 'string' || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'Request body must include npc_id (string) and message (string)' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const { npc_id, message } = body;
    const content =
      MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
    const emotion =
      MOCK_EMOTIONS[Math.floor(Math.random() * MOCK_EMOTIONS.length)];

    const response = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      npc_id,
      content,
      emotion,
      action: null,
      tokens_used: 42,
    };

    return NextResponse.json(response, { headers: CORS_HEADERS });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
