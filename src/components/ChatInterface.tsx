import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Volume2, VolumeX, Mic, MicOff, Square } from 'lucide-react';
import { chatWithSensei, textToSpeech } from '../lib/openrouter';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Oh look, a meat-bag with bad habits. I'm **The Narc**. I'm currently in **Sarcastic Mode**. Toggle me if you want actual facts without the judgment." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'sarcastic' | 'normal'>('sarcastic');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
  };

  const playPCM = async (base64Data: string) => {
    initAudio();
    const ctx = audioCtxRef.current!;
    if (ctx.state === 'suspended') await ctx.resume();

    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Int16Array(len / 2);
    for (let i = 0; i < len; i += 2) {
      const low = binaryString.charCodeAt(i);
      const high = binaryString.charCodeAt(i + 1);
      let val = (high << 8) | low;
      if (val > 32767) val -= 65536;
      bytes[i / 2] = val;
    }

    const float32Data = new Float32Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      float32Data[i] = bytes[i] / 32768.0;
    }

    const buffer = ctx.createBuffer(1, float32Data.length, 24000);
    buffer.getChannelData(0).set(float32Data);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (audioPayload?: { mimeType: string; data: string }) => {
    if ((!input.trim() && !audioPayload) || loading) return;

    const userMsg = input || (audioPayload ? "[Voice Transmission]" : "");
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const contextualMessage = `[USER IS IN ${mode.toUpperCase()} MODE. FOLLOW THIS MODE STRICTLY.] ${userMsg}`;

    const response = await chatWithSensei(contextualMessage, history, audioPayload);

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);

    if (voiceEnabled) {
      const cleanText = response.replace(/[#*_~`]/g, '');
      try {
        await textToSpeech(cleanText, mode === 'sarcastic' ? 'Puck' : 'Kore');
        console.log("Voice synthesis completed");
      } catch (error) {
        console.error("Voice synthesis failed:", error);
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Data = (reader.result as string).split(',')[1];
          handleSend({ mimeType: 'audio/webm', data: base64Data });
        };
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Recording failed:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/20 relative overflow-hidden backdrop-blur-sm">
      {/* Action Bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-black/40 relative z-20">
        <div className="flex items-center gap-6">
          <div className="space-y-1">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500">Identity Matrix</span>
            <div className="flex p-1 bg-black border border-white/10 rounded-xl">
              <button
                onClick={() => setMode('sarcastic')}
                className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${mode === 'sarcastic' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]' : 'text-zinc-600 hover:text-zinc-300'}`}
              >
                The Narc
              </button>
              <button
                onClick={() => setMode('normal')}
                className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${mode === 'normal' ? 'bg-zinc-100 text-black' : 'text-zinc-600 hover:text-zinc-300'}`}
              >
                Consultant
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500">Audio Response</span>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`flex items-center gap-2 h-9 px-4 rounded-xl border transition-all ${voiceEnabled ? 'bg-white/5 border-white/10 text-zinc-300' : 'bg-red-900/20 border-red-900/40 text-red-500'}`}
            >
              {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span className="text-[9px] font-black uppercase tracking-widest">{voiceEnabled ? 'Enabled' : 'Muted'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Message Feed */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide mask-fade-bottom"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-6 rounded-[2rem] border shadow-2xl transition-all ${m.role === 'user'
                ? 'bg-zinc-900 border-white/5 text-zinc-300 rounded-tr-none'
                : 'bg-white/[0.02] border-white/5 text-zinc-100 rounded-tl-none ring-1 ring-white/5'
                }`}>
                <div className="markdown-content">
                  <Markdown>{m.text}</Markdown>
                </div>
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/[0.02] border border-white/5 px-6 py-4 rounded-[1.5rem] rounded-tl-none flex items-center gap-4">
                <div className="flex gap-1.5">
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Syncing with Narc Matrix...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Terminal */}
      <div className="p-10 border-t border-white/5 bg-black/40">
        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onMouseLeave={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              className={`transition-all ${isRecording ? 'text-red-500 scale-125' : 'text-zinc-600 hover:text-red-500'}`}
            >
              {isRecording ? <div className="relative"><MicOff size={18} className="animate-pulse" /> <div className="absolute -inset-2 bg-red-500/20 rounded-full animate-ping"></div></div> : <Mic size={18} />}
            </button>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={mode === 'sarcastic' ? "Submit a bad decision for review..." : "Request pharmacology briefing..."}
            className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] py-5 pl-14 pr-32 text-sm focus:outline-none focus:border-red-500/30 transition-all group-hover:border-white/10"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="bg-red-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-red-900/20 active:scale-95"
            >
              TRANSMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
