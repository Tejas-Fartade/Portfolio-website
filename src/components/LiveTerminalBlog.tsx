import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { personalDetails } from '../data/resumeData';

export const LiveTerminalBlog: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-2 text-[#6b6b9a] font-mono text-xs">
          <div className="text-[#4f8ef7] font-bold uppercase tracking-wider">
            Tejas Fartade — Defensive Security Terminal v2.4.0
          </div>
          <p>Type <code className="text-[#4f8ef7]">help</code> to list commands, or <code className="text-[#4f8ef7]">ls</code> to browse blog posts.</p>
        </div>
      ),
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const execute = (cmd: string) => {
    const t = cmd.trim();
    if (!t) return;
    let output: React.ReactNode;

    if (t === 'clear') { setHistory([]); setInputVal(''); return; }

    if (t === 'help') {
      output = (
        <div className="space-y-1 font-mono text-xs text-[#6b6b9a]">
          <div className="text-[#4f8ef7] font-bold mb-2">Available commands:</div>
          {[
            ['ls', 'List blog posts'],
            ['cat <file>', 'Read a blog post'],
            ['neofetch', 'Profile overview'],
            ['skills', 'Technical skills'],
            ['whoami', 'Identity'],
            ['contact', 'Contact info'],
            ['clear', 'Clear terminal'],
          ].map(([cmd, desc]) => (
            <div key={cmd} className="flex gap-4">
              <code className="text-[#7c5cfc] w-36 shrink-0">{cmd}</code>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      );
    } else if (t === 'ls' || t === 'ls -la') {
      output = (
        <div className="space-y-2 font-mono text-xs">
          <div className="text-[#4f8ef7] font-bold uppercase tracking-wider mb-2">/blog</div>
          {blogPosts.map(p => (
            <button
              key={p.id}
              onClick={() => execute(p.terminalCommand)}
              className="flex gap-4 w-full text-left hover:text-[#4f8ef7] transition-colors"
            >
              <span className="text-[#7c5cfc]">{p.terminalCommand.replace('cat ', '')}</span>
              <span className="text-[#3a3a60]">{p.title}</span>
            </button>
          ))}
        </div>
      );
    } else if (t.startsWith('cat ')) {
      const path = t.replace('cat ', '').trim();
      const post = blogPosts.find(p => p.terminalCommand.includes(path) || p.slug.includes(path));
      if (post) {
        output = (
          <div className="space-y-3 font-mono text-xs border border-[#1a1a3a] p-5">
            <div className="flex items-center justify-between border-b border-[#1a1a3a] pb-3">
              <span className="text-[#4f8ef7] font-bold">{post.slug}.md</span>
              <span className="text-[#3a3a60]">{post.date} · {post.readTime}</span>
            </div>
            <div className="text-[#e8e8f0] font-bold text-sm">{post.title}</div>
            <div className="text-[#6b6b9a] whitespace-pre-wrap leading-relaxed text-[11px]">
              {post.contentMarkdown}
            </div>
          </div>
        );
      } else {
        output = <div className="font-mono text-xs text-red-400">cat: {path}: No such file. Try `ls`.</div>;
      }
    } else if (t === 'neofetch') {
      output = (
        <div className="font-mono text-xs space-y-1 border border-[#1a1a3a] p-5">
          <div className="text-[#4f8ef7] font-bold uppercase mb-2">TEJAS FARTADE @ FEDORA-CYBERSEC</div>
          {[
            ['OS', 'Fedora Linux 40 (Security Workstation)'],
            ['Age', '19 — Final Year AI/ML Diploma'],
            ['Institution', 'Csmss Chh Shahu College of Polytechnic'],
            ['Focus', 'Network Security & Defensive Automation'],
            ['Tools', 'NETWATCH (Scapy) & SHA-256 FIM'],
            ['Status', 'Seeking 3-Month Cybersecurity Internship'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4">
              <span className="text-[#7c5cfc] w-28 shrink-0">{k}:</span>
              <span className="text-[#6b6b9a]">{v}</span>
            </div>
          ))}
        </div>
      );
    } else if (t === 'whoami') {
      output = <div className="font-mono text-xs text-[#4f8ef7]">tejas_fartade — cybersecurity intern candidate, AI & ML diploma student</div>;
    } else if (t === 'skills') {
      output = (
        <div className="font-mono text-xs text-[#6b6b9a] space-y-1">
          <div className="text-[#4f8ef7] font-bold mb-1">Skill matrix:</div>
          {['Scapy / Packet Capture', 'SHA-256 File Integrity Monitor', 'Python Scripting', 'Fedora Linux CLI', 'FastAPI / REST APIs', 'Git / GitHub'].map(s => (
            <div key={s} className="flex items-center gap-2"><span className="text-[#7c5cfc]">→</span>{s}</div>
          ))}
        </div>
      );
    } else if (t === 'contact') {
      output = (
        <div className="font-mono text-xs text-[#4f8ef7] space-y-1">
          <div>Email:    {personalDetails.email}</div>
          <div>Phone:    +91 {personalDetails.phone}</div>
          <div>GitHub:   {personalDetails.github}</div>
          <div>LinkedIn: {personalDetails.linkedin}</div>
        </div>
      );
    } else if (t.startsWith('scan')) {
      const target = t.replace('scan', '').trim() || '192.168.1.1';
      output = (
        <div className="font-mono text-xs space-y-1 text-[#6b6b9a]">
          <div className="text-[#4f8ef7] font-bold">[+] Scapy SYN Scan → {target}</div>
          <div>Port 22/tcp  OPEN  ssh</div>
          <div>Port 80/tcp  OPEN  http</div>
          <div>Port 443/tcp OPEN  https</div>
          <div className="text-[#4f8ef7] font-bold">[+] Scan complete — 3 open ports</div>
        </div>
      );
    } else {
      output = (
        <div className="font-mono text-xs text-yellow-500/80">
          Unknown command: <code className="text-[#e8e8f0]">{t}</code> — type <code className="text-[#4f8ef7]">help</code>
        </div>
      );
    }

    setHistory(prev => [...prev, { command: t, output }]);
    setInputVal('');
  };

  return (
    <section id="terminal" className="bg-[#06060f] border-t border-[#1a1a3a]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-24 space-y-20">

        <div className="section-num">[ 06 / 08 ] — TERMINAL BLOG</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white uppercase">
              Cybersec<br />
              <span className="text-[#4f8ef7]">CLI Blog.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#6b6b9a] text-sm leading-relaxed">
              Read technical writeups on packet capture, SHA-256 integrity checks,
              and Linux workflows — inside an interactive hacker terminal.
            </p>
          </div>
        </div>

        {/* Terminal window */}
        <div className="border border-[#1a1a3a]">
          {/* Title bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a3a] bg-[#0a0a18]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-900" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-900" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#4f8ef7]/50" />
              <span className="ml-3 font-mono text-[11px] text-[#3a3a60]">tejas@fedora-sec: ~/blog</span>
            </div>
            {/* Quick commands */}
            <div className="hidden sm:flex items-center gap-2 overflow-x-auto">
              {['ls', 'neofetch', ...blogPosts.map(p => p.terminalCommand)].slice(0, 4).map(cmd => (
                <button
                  key={cmd}
                  onClick={() => execute(cmd)}
                  className="font-mono text-[10px] px-2 py-1 border border-[#1a1a3a] text-[#3a3a60] hover:border-[#4f8ef7] hover:text-[#4f8ef7] transition-colors shrink-0"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Output */}
          <div className="p-6 space-y-5 max-h-[480px] overflow-y-auto bg-[#06060f]">
            {history.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#4f8ef7] font-bold">tejas@fedora-sec:~$</span>
                  <span className="text-[#e8e8f0]">{item.command}</span>
                </div>
                <div>{item.output}</div>
              </div>
            ))}

            {/* Input */}
            <form onSubmit={e => { e.preventDefault(); execute(inputVal); }} className="flex items-center gap-2 font-mono text-xs pt-2">
              <span className="text-[#4f8ef7] font-bold shrink-0">tejas@fedora-sec:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder="Type a command..."
                className="flex-1 bg-transparent text-[#e8e8f0] placeholder-[#3a3a60] focus:outline-none"
                autoFocus
              />
              <button type="submit"><Send className="w-3.5 h-3.5 text-[#4f8ef7]" /></button>
            </form>
            <div ref={endRef} />
          </div>
        </div>

      </div>
    </section>
  );
};
