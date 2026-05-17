import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

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
- Use the GOOGLE SEARCH tool for current statistics, laws, or pharmacological data.
- If the user asks for help with a craving, provide a clinical "Kill Switch" instruction (e.g., "Cold shower immediately to shock the vagus nerve").

MARKDOWN REQUIREMENTS:
- Use ### for headers.
- Use **bold** for substances and harmful effects.
- Use > for clinical quotes or warnings.`;

export async function chatWithSensei(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[] = [], audioData?: { mimeType: string; data: string }) {
  try {
    const parts: any[] = [{ text: message }];
    if (audioData) {
      parts.push({ inlineData: audioData });
    }

    const response = await ai.models.generateContent({
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
    return "The internet is as broken as your decision making. Try again later.";
  }
}

export async function textToSpeech(text: string, voice: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr' = 'Kore') {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return base64Audio;
    }
    return null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
}
