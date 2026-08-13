import React, { useState, useEffect } from 'react';

export const Hero: React.FC = () => {
  const [scramble, setScramble] = useState('CYBERSECURITY INTERN');
  const words = ['CYBERSECURITY INTERN', 'DEFENSIVE SECURITY', 'NETWORK MONITORING', 'AI & ML STUDENT'];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const target = words[wordIdx];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
    let step = 0;
    const t = setInterval(() => {
      if (step >= target.length) { setScramble(target); clearInterval(t); return; }
      setScramble(target.split('').map((c, i) => i < step ? c : chars[Math.floor(Math.random() * chars.length)]).join(''));
      step++;
    }, 38);
    return () => clearInterval(t);
  }, [wordIdx]);

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-20 px-6 lg:px-12 pt-28 overflow-hidden bg-[#06060f]">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e0e22_1px,transparent_1px),linear-gradient(to_bottom,#0e0e22_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none opacity-40" />

      {/* Ambient glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4f8ef7]/6 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#7c5cfc]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Section label */}
      <div className="section-num mb-6">[ 01 / 08 ] — IDENTITY</div>

      {/* Huge editorial headline */}
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="relative">
          <h1 className="font-display text-[clamp(4rem,14vw,13rem)] leading-[0.88] text-white uppercase">
            TEJAS<br />FARTADE
          </h1>

          {/* Scramble subtitle */}
          <div className="mt-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[#4f8ef7]" />
            <span className="font-mono text-sm text-[#4f8ef7] tracking-widest uppercase">
              {scramble}<span className="animate-pulse">_</span>
            </span>
          </div>

          {/* Bio row */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl">
            <p className="text-[#6b6b9a] text-sm leading-relaxed font-sans">
              19-year-old final-year Diploma student in{' '}
              <span className="text-white">Artificial Intelligence & Machine Learning</span> at Csmss Chh Shahu College
              of Polytechnic. Defensive security practitioner specialising in{' '}
              <span className="text-[#4f8ef7]">network packet analysis</span>,{' '}
              <span className="text-[#7c5cfc]">SHA-256 file integrity monitoring</span>, and Linux terminal automation.
            </p>

            <div className="flex flex-col justify-between gap-6">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 self-start">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4f8ef7] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4f8ef7]" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#4f8ef7]">
                  Seeking 3-Month Internship
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="font-mono text-xs uppercase tracking-widest px-6 py-3 bg-[#4f8ef7] text-[#06060f] font-bold hover:bg-white transition-colors"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="font-mono text-xs uppercase tracking-widest px-6 py-3 border border-[#1a1a3a] text-[#6b6b9a] hover:border-[#4f8ef7] hover:text-[#4f8ef7] transition-all"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          {/* Tag chips */}
          <div className="mt-10 flex flex-wrap gap-2">
            {['NETWATCH_SCAPY', 'SHA256_FIM', 'FEDORA_LINUX', 'PYTHON', 'DEFENSIVE_SEC'].map(tag => (
              <span key={tag} className="font-mono text-[10px] px-3 py-1 border border-[#1a1a3a] text-[#3a3a60] uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 right-12 font-mono text-[10px] text-[#3a3a60] uppercase tracking-widest flex items-center gap-2">
        <span>Scroll</span>
        <span className="w-6 h-px bg-[#3a3a60]" />
      </div>
    </section>
  );
};
