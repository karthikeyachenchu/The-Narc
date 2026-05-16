import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ChatInterface from './components/ChatInterface';
import DrugEncyclopedia from './components/DrugEncyclopedia';
import InteractionLab from './components/InteractionLab';
import { AlertCircle, Shield, Ghost, Settings, FlaskConical } from 'lucide-react';

export default function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'metrics' | 'settings'>('metrics');
  const [infoWidth, setInfoWidth] = useState(400);
  const isResizing = useRef(false);

  const startResizing = () => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'col-resize';
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'default';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 320 && newWidth < 900) {
      setInfoWidth(newWidth);
    }
  };

  return (
    <div className="h-screen w-full bg-[#050505] flex flex-col font-sans overflow-hidden text-zinc-300">
      {/* System Alert Bar */}
      <div className="h-10 bg-red-600/10 border-b border-red-600/20 flex flex-shrink-0 items-center justify-center gap-6 px-4 overflow-hidden relative z-50">
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-red-500 animate-pulse">
          <AlertCircle className="w-3 h-3" /> System Status: Sobriety Monitoring Active
        </div>
        <div className="w-px h-3 bg-red-500/20"></div>
        <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest hidden sm:block">Brain_Recovery_Mode: [REDACTED]</p>
        <div className="w-px h-3 bg-red-500/20 hidden sm:block"></div>
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
           Uptime: 432:12:44
        </div>
      </div>

      <div className="flex-1 flex min-h-0 relative">
        {/* Left Nav: Application Control */}
        <aside className="w-20 border-r border-white/5 flex flex-col items-center py-8 gap-10 bg-black flex-shrink-0 z-40">
           <div className="flex flex-col items-center gap-6">
              <button 
                onClick={() => setActiveTab('metrics')}
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all group ${activeTab === 'metrics' ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'bg-white/[0.03] border-white/5 text-zinc-500 hover:border-white/20'}`}
              >
                 <FlaskConical className="w-5 h-5 transition-transform group-hover:scale-110" />
              </button>

              <button 
                onClick={() => setIsInfoOpen(!isInfoOpen)}
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all group ${isInfoOpen ? 'bg-zinc-800 border-red-600/50 text-red-500' : 'bg-white/[0.03] border-white/5 text-zinc-500 hover:border-white/20'}`}
              >
                 <Shield className="w-5 h-5 transition-transform group-hover:scale-110" />
              </button>

              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all group ${activeTab === 'settings' ? 'bg-white text-black border-white' : 'bg-white/[0.03] border-white/5 text-zinc-500 hover:border-white/20'}`}
              >
                 <Settings className="w-5 h-5 transition-transform group-hover:scale-110" />
              </button>
           </div>

           <div className="flex-1 flex flex-col justify-end pb-8 gap-8">
              <div className="w-12 h-12 flex items-center justify-center text-zinc-800">
                 <Ghost className="w-5 h-5 animate-bounce" />
              </div>
              <div className="rotate-180 [writing-mode:vertical-lr] flex items-center gap-4 whitespace-nowrap">
                 <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">The Narc Protocol v3.9</span>
              </div>
           </div>
        </aside>

        {/* Dynamic Sidebar Content */}
        <aside className="w-64 border-r border-white/5 bg-[#080808] flex flex-col hidden lg:flex">
           <AnimatePresence mode="wait">
              {activeTab === 'metrics' && (
                <motion.div 
                  key="metrics"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1"
                >
                   <InteractionLab />
                </motion.div>
              )}
              {activeTab === 'settings' && (
                <motion.div 
                  key="settings"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-4"
                >
                   <h3 className="text-xs font-black uppercase tracking-widest text-white">System Config</h3>
                   <div className="space-y-2">
                       <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-[10px] text-zinc-400">
                          Account Link: [DISABLED]
                       </div>
                       <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-[10px] text-zinc-400">
                          Data Persistence: [LOCAL_ONLY]
                       </div>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </aside>

        {/* Center: The Narc Chat Bot (Main Interaction) */}
        <main className="flex-1 flex flex-col pt-6 bg-black/10 min-w-0 transition-colors duration-500">
          <div className="px-10 mb-6 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-2 h-10 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)] rounded-full"></div>
                <div className="flex flex-col">
                   <h1 className="text-3xl font-black tracking-tighter uppercase text-white leading-none">
                     THE NARC
                   </h1>
                   <span className="text-[9px] font-mono text-zinc-600 tracking-widest mt-1">SENTIENCE_LEVEL: LOW_JUDGMENTAL</span>
                </div>
             </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </main>

        {/* Right: Data Hub / Encyclopedia */}
        <AnimatePresence initial={false}>
          {isInfoOpen && (
            <motion.section 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: infoWidth, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="flex flex-col bg-zinc-950 border-l border-white/5 overflow-hidden relative flex-shrink-0 z-30"
            >
              {/* Resizer Handle */}
              <div 
                onMouseDown={startResizing}
                className="absolute left-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-red-500/40 transition-colors z-50 group"
              >
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-px h-16 bg-white/10 group-hover:bg-red-500/50 transition-colors" />
              </div>

              <div style={{ width: infoWidth }} className="h-full overflow-hidden">
                <DrugEncyclopedia />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
