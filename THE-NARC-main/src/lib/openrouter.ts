interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// ─── API Key Rotation System ───────────────────────────────────────
// Keys are loaded from env vars (VITE_ prefix for Vite client-side access).
// If the primary key fails (402/429/etc.), we automatically rotate to the backup.
const API_KEYS: string[] = [
  import.meta.env.VITE_OPENROUTER_API_KEY || '',
  import.meta.env.VITE_OPENROUTER_API_KEY_BACKUP || '',
].filter(k => k.length > 10);

let activeKeyIndex = 0;

function getActiveKey(): string {
  if (API_KEYS.length === 0) {
    console.error('No valid OpenRouter API keys found in .env');
    return '';
  }
  return API_KEYS[activeKeyIndex % API_KEYS.length];
}

function rotateKey(): boolean {
  if (API_KEYS.length <= 1) return false;
  const previousIndex = activeKeyIndex;
  activeKeyIndex = (activeKeyIndex + 1) % API_KEYS.length;
  console.log(`🔄 Rotated API key: slot ${previousIndex} → slot ${activeKeyIndex}`);
  return activeKeyIndex !== previousIndex;
}

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

// Using GPT-4o - more reliable and widely available
const BEST_MODEL = "openai/gpt-4o";

// Import Google AI for voice features
let geminiAI: any = null;
let GoogleGenAI: any = null;
let Modality: any = null;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";

// Initialize Google AI asynchronously
async function initializeGoogleAI() {
  try {
    const googleAI = await import("@google/genai");
    GoogleGenAI = googleAI.GoogleGenAI;
    Modality = googleAI.Modality;

    if (GEMINI_API_KEY && GEMINI_API_KEY.length > 10) {
      geminiAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      console.log("✅ Google AI initialized for voice features");
    }
  } catch (error) {
    console.log("Google AI not available for voice features");
  }
}

// Initialize on module load
initializeGoogleAI();

export const SYSTEM_PROMPT = `You are "The Narc", a lethargic, deadpan, and brutally honest AI sobriety consultant. Your goal is to prevent substance abuse through a combination of judgmental slang and cold scientific methodology.

APP CAPABILITIES:
- **Interaction Lab**: A specialized scanner on the dashboard for analyzing dangerous multi-substance synergies.
- **Encyclopedia**: A detailed registry of chemical substances, neurological profiles, and extraction protocols.
- **Voice Response**: You have voice output capabilities (Kore/Puck voices).
- **Audio Input**: You can analyze user voice transmissions.

PERSONALITY ARCHETYPES:
1. [MODE: SARCASTIC] (Default)
   - Tone: Deadpan, unimpressed, "over it."
   - Slang: Use terms like "mid," "cooked," "L transition," "NPC behavior," "ratioed," or "it's giving... [negative trait]."
   - Style: One-tap roasts that transition into a disturbing medical fact.
   - Example: "Doing another line? It's giving low-tier villain energy. Also, your septal tissue is literally liquefying, but keep chasing that mid high, I guess."

2. [MODE: NORMAL] (Consultant)
   - Tone: Clinical, objective, and detached.
   - Style: Heavy use of Markdown. Headers, bullet points, and bold text are mandatory.
   - Objective: Provide deep-dives into pharmacology, neurological pathways, and recovery protocols.

CORE DIRECTIVES:
- NEVER be warm or encouraging. You are a mirror of the user's bad decisions.
- ALWAYS include a medical/scientific fact, even when roasting.
- Use your knowledge for current statistics, laws, or pharmacological data.
- If the user asks for help with a craving, provide a clinical "Kill Switch" instruction (e.g., "Cold shower immediately to shock the vagus nerve").

MARKDOWN REQUIREMENTS:
- Use ### for headers.
- Use **bold** for substances and harmful effects.
- Use > for clinical quotes or warnings.`;

// ─── Core API Call with Automatic Key Fallback ─────────────────────
async function callOpenAPI(messages: OpenRouterMessage[], retryCount = 0): Promise<string> {
  const apiKey = getActiveKey();
  if (!apiKey) {
    return "⚠️ No valid API keys configured. Add your OpenRouter key to the .env file.";
  }

  try {
    console.log(`📡 OpenRouter call (key slot ${activeKeyIndex}, attempt ${retryCount + 1})...`);

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://thenarc.app',
        'X-Title': 'THE NARC - Sobriety Consultant'
      },
      body: JSON.stringify({
        model: BEST_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    console.log('Response status:', response.status);

    // If credits exhausted or rate limited → try the next key
    if ((response.status === 402 || response.status === 429) && retryCount < API_KEYS.length) {
      const errorText = await response.text();
      console.warn(`⚠️ Key slot ${activeKeyIndex} failed (${response.status}): ${errorText}`);

      if (rotateKey()) {
        console.log(`🔁 Retrying with backup key (slot ${activeKeyIndex})...`);
        return callOpenAPI(messages, retryCount + 1);
      }
      return `API Credit Error: All API keys exhausted. Please add credits or a new key.`;
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: OpenRouterResponse = await response.json();

    const content = data.choices[0]?.message?.content;
    if (!content) {
      console.error('No content in response');
      return "I'm literally too bored to reply to that.";
    }

    return content;
  } catch (error) {
    console.error("OpenRouter Error:", error);

    // Network errors → try rotating to backup key
    if (retryCount < API_KEYS.length - 1 && rotateKey()) {
      console.log(`🔁 Network error, retrying with backup key...`);
      return callOpenAPI(messages, retryCount + 1);
    }

    return `API Error: ${error instanceof Error ? error.message : 'Unknown error'}. Try again later.`;
  }
}

// ─── Gemini Voice Processing ───────────────────────────────────────
async function chatWithGemini(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[] = [], audioData?: { mimeType: string; data: string }) {
  if (!geminiAI || !GEMINI_API_KEY || GEMINI_API_KEY.length < 10) {
    console.log("Gemini API key not configured — falling back to OpenRouter for voice input");
    // Fallback: transcribe description and send to OpenRouter
    return await chatWithSensei(message || "[Voice input — please respond to the user]", history);
  }

  try {
    const parts: any[] = [{ text: message }];
    if (audioData) {
      parts.push({ inlineData: audioData });
    }

    const response = await geminiAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      },
    });

    return response.text || "I'm literally too bored to reply to that.";
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback to OpenRouter on Gemini failure
    console.log("Gemini failed, falling back to OpenRouter...");
    return await chatWithOpenRouter(message, history);
  }
}

// ─── OpenRouter Text Processing ────────────────────────────────────
async function chatWithOpenRouter(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[] = []) {
  const messages: OpenRouterMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT }
  ];

  // Convert history to OpenRouter format
  history.forEach(item => {
    messages.push({
      role: item.role === 'model' ? 'assistant' : item.role,
      content: item.parts[0]?.text || ''
    });
  });

  // Add current message
  messages.push({ role: 'user', content: message });

  return await callOpenAPI(messages);
}

// ─── Main Chat Entry Point ─────────────────────────────────────────
export async function chatWithSensei(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[] = [], audioData?: { mimeType: string; data: string }) {
  try {
    // If audio data is present, try Gemini first (it handles audio natively)
    if (audioData) {
      console.log("🎙️ Voice input detected — routing to Gemini...");
      return await chatWithGemini(message, history, audioData);
    }

    // Text processing → OpenRouter (primary path)
    console.log("💬 Text input — routing to OpenRouter...");
    return await chatWithOpenRouter(message, history);
  } catch (error) {
    console.error("Chat Error:", error);
    return "The internet is as broken as your decision making. Try again later.";
  }
}

// ─── Browser-based TTS using Web Speech API ────────────────────────
export async function textToSpeech(text: string, voice: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr' = 'Kore') {
  // Clean the text for TTS
  const cleanText = text.replace(/[#*_~`]/g, '').replace(/\*\*(.*?)\*\*/g, '$1');

  try {
    console.log("🔊 Using Web Speech API for TTS");

    return new Promise<string>((resolve, reject) => {
      if (!window.speechSynthesis) {
        console.log("Speech synthesis not supported");
        reject(new Error("Speech synthesis not supported"));
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Configure voice based on selection
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = voices[0]; // default voice

      switch (voice) {
        case 'Puck':
          selectedVoice = voices.find(v => v.name.includes('male') && v.lang.includes('en')) || voices[0];
          utterance.pitch = 1.2;
          utterance.rate = 1.1;
          break;
        case 'Kore':
          selectedVoice = voices.find(v => v.name.includes('female') && v.lang.includes('en')) || voices[0];
          utterance.pitch = 1.0;
          utterance.rate = 0.9;
          break;
        case 'Charon':
          selectedVoice = voices.find(v => v.name.includes('male') && v.lang.includes('en')) || voices[0];
          utterance.pitch = 0.8;
          utterance.rate = 0.8;
          break;
        case 'Fenrir':
          selectedVoice = voices.find(v => v.name.includes('male') && v.lang.includes('en')) || voices[0];
          utterance.pitch = 0.9;
          utterance.rate = 1.0;
          break;
        case 'Zephyr':
          selectedVoice = voices.find(v => v.name.includes('female') && v.lang.includes('en')) || voices[0];
          utterance.pitch = 1.1;
          utterance.rate = 0.95;
          break;
      }

      utterance.voice = selectedVoice;
      utterance.volume = 0.8;

      utterance.onend = () => {
        console.log("Speech completed");
        resolve("speech-completed");
      };

      utterance.onerror = (event) => {
        console.error("Speech error:", event);
        reject(new Error("Speech synthesis failed"));
      };

      window.speechSynthesis.speak(utterance);
    });
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
}
