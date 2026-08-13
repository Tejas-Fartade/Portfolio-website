import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About',    href: '#about' },
    { label: 'Skills',   href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Terminal', href: '#terminal' },
    { label: 'GitHub',   href: '#github' },
    { label: 'Contact',  href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06060f]/95 backdrop-blur-md border-b border-[#1a1a3a]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <span className="w-2 h-2 rounded-full bg-[#4f8ef7] animate-pulse shadow-[0_0_10px_rgba(79,142,247,0.7)]" />
          <span className="font-display text-xl text-white tracking-wider uppercase">
            Tejas Fartade
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-widest text-[#6b6b9a] hover:text-[#4f8ef7] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contact"
            className="font-mono text-[11px] uppercase tracking-widest px-5 py-2 border border-[#4f8ef7] text-[#4f8ef7] hover:bg-[#4f8ef7] hover:text-[#06060f] transition-all"
          >
            Hire Tejas
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-[#6b6b9a] hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#06060f] border-t border-[#1a1a3a] px-6 py-6 space-y-4">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block font-mono text-xs uppercase tracking-widest text-[#6b6b9a] hover:text-[#4f8ef7] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block font-mono text-xs uppercase tracking-widest px-4 py-2 border border-[#4f8ef7] text-[#4f8ef7] text-center"
          >
            Hire Tejas
          </a>
        </div>
      )}
    </header>
  );
};
