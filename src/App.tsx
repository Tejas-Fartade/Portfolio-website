import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CyberCursor } from './components/CyberCursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProfileAbout } from './components/ProfileAbout';
import { SkillsSection } from './components/SkillsSection';
import { ProjectShowcase } from './components/ProjectShowcase';
import { InteractiveCodeLab } from './components/InteractiveCodeLab';
import { LiveTerminalBlog } from './components/LiveTerminalBlog';
import { GitHubSection } from './components/GitHubSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// ─── Boot screen ──────────────────────────────────────────────────────────────
const BootScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const lines = [
    '> INITIALIZING SYSTEM...',
    '> LOADING SECURITY MODULES...',
    '> MOUNTING PORTFOLIO v1.0...',
    '> ACCESS GRANTED. WELCOME.',
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (lineIndex < lines.length) {
      const t = setTimeout(() => setLineIndex(i => i + 1), 420);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onDone, 500);
    return () => clearTimeout(t);
  }, [lineIndex]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#06060f] select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Subtle scanlines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(79,142,247,0.012)_3px)] pointer-events-none" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4f8ef7]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm px-6">
        {/* Name */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-mono text-[10px] text-[#3a3a60] uppercase tracking-widest block mb-2">
            SYSTEM_NODE
          </span>
          <span className="font-display text-5xl text-white uppercase tracking-wide block">
            Tejas Fartade
          </span>
          <span className="font-mono text-[10px] text-[#4f8ef7] tracking-widest mt-2 uppercase block">
            Cybersecurity // AI & ML
          </span>
        </motion.div>

        {/* Terminal lines */}
        <div className="border border-[#1a1a3a] p-5 space-y-2 min-h-[110px]">
          {lines.slice(0, lineIndex).map((line, i) => (
            <motion.div
              key={i}
              className={`font-mono text-xs ${i === lines.length - 1 ? 'text-[#4f8ef7] font-bold' : 'text-[#3a3a60]'}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {line}
            </motion.div>
          ))}
          {lineIndex < lines.length && (
            <span className="inline-block w-2 h-3 bg-[#4f8ef7] animate-pulse" />
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-px bg-[#1a1a3a] overflow-hidden">
          <motion.div
            className="h-full bg-[#4f8ef7]"
            style={{ boxShadow: '0 0 8px rgba(79,142,247,0.6)' }}
            initial={{ width: '0%' }}
            animate={{ width: `${(lineIndex / lines.length) * 100}%` }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <>
      <CyberCursor />
      <AnimatePresence>
        {booting && <BootScreen key="boot" onDone={() => setBooting(false)} />}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-[#06060f] text-[#e8e8f0]"
        initial={{ opacity: 0, y: 16 }}
        animate={booting ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Header />
        <main>
          <Hero />
          <ProfileAbout />
          <SkillsSection />
          <ProjectShowcase />
          <InteractiveCodeLab />
          <LiveTerminalBlog />
          <GitHubSection />
          <ContactSection />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
