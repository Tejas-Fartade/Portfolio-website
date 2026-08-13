import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { personalDetails } from '../data/resumeData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06060f] border-t border-[#1a1a3a]">

      {/* Marquee ticker */}
      <div className="border-b border-[#1a1a3a] py-3 overflow-hidden whitespace-nowrap select-none">
        <div className="inline-block animate-marquee font-mono text-[11px] uppercase tracking-widest text-[#3a3a60]">
          {[
            'TEJAS FARTADE',
            'CYBERSECURITY INTERN',
            'AI & ML DIPLOMA — 3RD YEAR',
            'NETWATCH SCAPY',
            'SHA-256 FILE INTEGRITY MONITOR',
            'FEDORA LINUX',
            'PYTHON AUTOMATION',
            'SEEKING 3-MONTH INTERNSHIP',
            'DEFENSIVE SECURITY',
            'NETWORK MONITORING',
          ].flatMap(t => [
            <span key={t} className="mx-8">{t}</span>,
            <span key={`${t}•`} className="mx-4 text-[#1a1a3a]">•</span>,
          ])}
          {/* Duplicate for seamless loop */}
          {[
            'TEJAS FARTADE',
            'CYBERSECURITY INTERN',
            'AI & ML DIPLOMA — 3RD YEAR',
            'NETWATCH SCAPY',
            'SHA-256 FILE INTEGRITY MONITOR',
            'FEDORA LINUX',
            'PYTHON AUTOMATION',
            'SEEKING 3-MONTH INTERNSHIP',
            'DEFENSIVE SECURITY',
            'NETWORK MONITORING',
          ].flatMap(t => [
            <span key={`2-${t}`} className="mx-8">{t}</span>,
            <span key={`2-${t}•`} className="mx-4 text-[#1a1a3a]">•</span>,
          ])}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Brand block */}
          <div className="lg:col-span-6 space-y-4">
            <div className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-white uppercase">
              Tejas<br />Fartade.
            </div>
            <p className="font-mono text-xs text-[#3a3a60] max-w-sm leading-relaxed">
              Defensive cybersecurity practitioner & AI/ML diploma student.
              Seeking a 3-month internship focused on network security and threat monitoring.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#3a3a60] mb-4">Navigate</div>
            {['#about', '#skills', '#projects', '#terminal', '#github', '#contact'].map(href => (
              <a
                key={href}
                href={href}
                className="block font-mono text-xs text-[#6b6b9a] hover:text-[#4f8ef7] transition-colors uppercase tracking-wider"
              >
                {href.replace('#', '')}
              </a>
            ))}
          </div>

          {/* Social + scroll to top */}
          <div className="lg:col-span-3 space-y-6">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#3a3a60] mb-4">Connect</div>
            <div className="space-y-3">
              <a
                href={`mailto:${personalDetails.email}`}
                className="flex items-center gap-3 font-mono text-xs text-[#6b6b9a] hover:text-[#4f8ef7] transition-colors"
              >
                <Mail className="w-4 h-4" />
                {personalDetails.email}
              </a>
              <a
                href={personalDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-xs text-[#6b6b9a] hover:text-[#4f8ef7] transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={personalDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-xs text-[#6b6b9a] hover:text-[#7c5cfc] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#3a3a60] hover:text-[#4f8ef7] transition-colors mt-6"
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[#1a1a3a] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#3a3a60] uppercase tracking-wider">
          <span>© {new Date().getFullYear()} Tejas Fartade</span>
          <span>Csmss Chh Shahu College of Polytechnic · Expected 2026</span>
        </div>
      </div>
    </footer>
  );
};
