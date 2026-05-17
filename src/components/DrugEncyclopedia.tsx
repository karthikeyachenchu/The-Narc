import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DRUG_DATA } from '../constants';
import { ChevronRight, Brain, Heart, ArrowLeft, Search, Activity, Shield } from 'lucide-react';

export default function DrugEncyclopedia() {
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const drugs = Object.keys(DRUG_DATA).filter(d => 
    d.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] overflow-hidden">
      <AnimatePresence mode="wait">
        {!selectedDrug ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="flex flex-col h-full"
          >
            <div className="p-10 border-b border-white/5 space-y-8 bg-gradient-to-b from-white/[0.02] to-transparent">
              <div>
                <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-red-500 mb-2 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Substance Nexus
                </h2>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Encyclopedia</h1>
              </div>

              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="Filter by chemical name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-red-500/50 transition-all group-hover:border-white/20"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-2 scrollbar-hide">
              {drugs.map((drug) => (
                <button
                  key={drug}
                  onClick={() => setSelectedDrug(drug)}
                  className="w-full flex items-center justify-between px-6 py-5 rounded-2xl bg-white/[0.01] border border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.03] hover:border-white/10 hover:translate-x-1 transition-all group"
                >
                  <div className="flex flex-col items-start translate-x-0 group-hover:translate-x-1 transition-transform">
                     <span className="font-black text-xs uppercase tracking-widest">{drug}</span>
                     <span className="text-[10px] text-zinc-600">ID: {drug.slice(0, 3).toUpperCase()}-440</span>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:text-red-500 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="flex flex-col h-full bg-[#050505]"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-10">
              <button 
                onClick={() => setSelectedDrug(null)}
                className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
              >
                <ArrowLeft className="w-3 h-3" /> Return to Encyclopedia
              </button>
              <div className="flex gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
              <header className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/20 border border-red-900/40 rounded-full text-[9px] font-black uppercase tracking-widest text-red-500">
                  <Activity size={10} /> High Toxicology Risk
                </div>
                <div>
                   <h1 className="text-6xl font-black uppercase tracking-tighter text-white mb-2">{selectedDrug}</h1>
                </div>
                <p className="text-xl text-zinc-400 font-medium leading-relaxed tracking-tight border-l-2 border-red-600 pl-6 py-2 bg-white/[0.01]">
                  {DRUG_DATA[selectedDrug].details}
                </p>
              </header>

              <div className="grid grid-cols-1 gap-10">
                <DetailSection title="Neurological Profile" icon={<Brain className="w-5 h-5" />}>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem]">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Immediate Sensation</span>
                        <p className="text-zinc-300 leading-relaxed font-semibold text-sm">{DRUG_DATA[selectedDrug].feeling}</p>
                      </div>
                      <div className="space-y-3 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem]">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Cognitive Incentives</span>
                        <p className="text-zinc-300 leading-relaxed font-semibold text-sm">{DRUG_DATA[selectedDrug].drivers}</p>
                      </div>
                   </div>
                </DetailSection>

                <DetailSection title="Systemic Consequences" icon={<Heart className="w-5 h-5" />}>
                   <div className="space-y-4 bg-zinc-900/30 p-8 rounded-[2rem] border border-white/5">
                      <ImpactRow label="Cognitive" content={DRUG_DATA[selectedDrug].mentalEffects} />
                      <ImpactRow label="Physiological" content={DRUG_DATA[selectedDrug].physicalEffects} />
                      <ImpactRow label="Clinical Signs" content={DRUG_DATA[selectedDrug].symptoms.join(", ")} />
                   </div>
                </DetailSection>

                <div className="p-10 rounded-[3rem] bg-gradient-to-br from-red-600/10 to-transparent border border-red-600/20 space-y-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
                     <Shield size={120} />
                  </div>
                  <h3 className="text-xs uppercase font-black tracking-[0.3em] text-red-500">Extraction Protocol</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                    <SubSection title="Medication Assistance" content={DRUG_DATA[selectedDrug].medication} />
                    <SubSection title="Harm Reduction" content={DRUG_DATA[selectedDrug].reduction} />
                  </div>
                </div>
              </div>

              <footer className="pt-10 pb-20 border-t border-white/5">
                 <p className="text-[10px] text-zinc-700 italic font-medium max-w-sm mx-auto text-center">
                   This encyclopedia is for clinical information only. If experiencing immediate harm, contact regional toxicological emergency services.
                 </p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailSection({ title, icon, children }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="p-2 bg-white/5 rounded-lg text-red-500">{icon}</div>
        <h3 className="text-xs uppercase font-black tracking-widest text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ImpactRow({ label, content }: any) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 w-24 shrink-0">{label}</span>
      <p className="text-sm text-zinc-400 leading-relaxed font-medium">{content}</p>
    </div>
  );
}

function SubSection({ title, content }: any) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-black text-white uppercase tracking-tight">{title}</h4>
      <p className="text-sm text-zinc-400 leading-relaxed font-medium">{content}</p>
    </div>
  );
}
