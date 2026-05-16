import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DRUG_DATA } from '../constants';
import { AlertCircle, Zap, ShieldAlert, FlaskConical, ChevronRight } from 'lucide-react';
import { chatWithSensei } from '../lib/openrouter';

export default function InteractionLab() {
  const [substanceA, setSubstanceA] = useState<string | null>(null);
  const [substanceB, setSubstanceB] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const drugs = Object.keys(DRUG_DATA);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [result]);

  const scanInteraction = async () => {
    if (!substanceA || !substanceB) return;
    setLoading(true);
    setResult(null);

    const prompt = `[CLINICAL RESEARCH MODE] Analyze the interaction between ${substanceA} and ${substanceB}. 
    1. Danger Level (Low/Moderate/High/Lethal).
    2. Primary Biological Conflict.
    3. Synergistic Risks.
    Maintain "The Narc" judgmental/deadpan tone but prioritze pharmacological accuracy. Use Markdown headers.`;

    const response = await chatWithSensei(prompt);
    setResult(response);
    setLoading(false);
  };

  const reset = () => {
    setSubstanceA(null);
    setSubstanceB(null);
    setResult(null);
  };

  return (
    <div className="h-full flex flex-col bg-[#080808]">
      {/* Fixed Header */}
      <div className="p-6 pb-4 space-y-1 border-b border-white/5 bg-[#080808] z-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Interaction Lab v1.1</h2>
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tight">Cross-chemical toxicity checking</p>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-red-600 animate-pulse"></div>
            <div className="w-1 h-1 rounded-full bg-white/10"></div>
          </div>
        </div>
      </div>

      {/* Primary Interaction Area - Smooth Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto custom-scrollbar-minimal px-6 pb-12"
      >
        {/* Input Controls */}
        <div className="py-6 space-y-4">
          <SubstanceSelector
            label="Substance Alpha"
            selected={substanceA}
            onSelect={setSubstanceA}
            options={drugs.filter(d => d !== substanceB)}
          />
          <SubstanceSelector
            label="Substance Omega"
            selected={substanceB}
            onSelect={setSubstanceB}
            options={drugs.filter(d => d !== substanceA)}
          />

          <button
            onClick={scanInteraction}
            disabled={!substanceA || !substanceB || loading}
            className="w-full py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[9px] shadow-xl shadow-red-900/20 hover:bg-red-500 transition-all disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed group active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <FlaskConical size={12} className={loading ? "animate-spin" : "group-hover:rotate-12 transition-transform"} />
              {loading ? "Calculating..." : "Analyze Interaction"}
            </span>
          </button>
        </div>

        {/* Results Area */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 gap-4 text-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                  <FlaskConical size={32} className="text-red-500 animate-bounce relative z-10" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">Synthesizing Report</p>
                  <p className="text-[9px] font-mono text-zinc-600">Accessing clinical databases...</p>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-4 bg-red-600/5 border border-red-600/20 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={14} className="text-red-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Synergy Report</span>
                  </div>
                  <button
                    onClick={reset}
                    className="px-2 py-1 bg-white/5 rounded-md text-[8px] font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <div className="markdown-content text-[11px] leading-relaxed text-zinc-300">
                  {result}
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-zinc-500">
                    <AlertCircle size={10} /> Forensic Note
                  </div>
                  <p className="text-[9px] text-zinc-600 leading-relaxed italic">
                    Simultaneous usage often results in exponential increases in toxicity.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center opacity-30 group"
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150 group-hover:scale-[2] transition-transform duration-1000"></div>
                  <FlaskConical size={32} className="text-zinc-500 relative z-10 transition-transform group-hover:rotate-12" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Awaiting Dual Input</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>


      {/* Fixed Footer Note */}
      <div className="p-6 pt-0 mt-auto border-t border-white/5 bg-[#080808]">
        <div className="mt-4 p-3 bg-red-600/5 rounded-xl border border-red-600/10 text-[8px] text-zinc-500 leading-tight">
          Disclaimer: Data provided by The Narc is for educational harm reduction. Seek clinical stabilization immediately if experiencing adverse symptoms.
        </div>
      </div>
    </div>
  );
}

function SubstanceSelector({ label, selected, onSelect, options }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2 relative">
      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">{label}</span>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full px-5 py-4 rounded-2xl border flex items-center justify-between transition-all ${selected ? 'bg-white/[0.03] border-white/20 text-white' : 'bg-white/[0.01] border-white/5 text-zinc-500'}`}
      >
        <span className="text-xs font-bold uppercase tracking-tight">{selected || 'Select Substance'}</span>
        <ChevronRight size={14} className={`transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 top-full mt-2 bg-[#0f0f0f] border border-white/10 rounded-2xl max-h-48 overflow-y-auto z-50 p-2 space-y-1 shadow-2xl"
            >
              {options.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => {
                    onSelect(opt);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:bg-white/5 hover:text-white transition-all"
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
