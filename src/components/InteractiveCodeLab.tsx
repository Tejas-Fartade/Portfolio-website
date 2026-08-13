import React, { useState } from 'react';
import { Play, Copy, Check, RefreshCw, FileCode } from 'lucide-react';
import { codeSnippets } from '../data/codeSnippets';

export const InteractiveCodeLab: React.FC = () => {
  const [selectedId, setSelectedId] = useState(codeSnippets[0].id);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const snippet = codeSnippets.find(s => s.id === selectedId) || codeSnippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setRunning(true);
    setOutput(['[+] Initializing...', `[+] Executing ${snippet.filename}...`]);
    let idx = 0;
    const t = setInterval(() => {
      if (idx < snippet.sampleOutput.length) {
        setOutput(p => [...p, snippet.sampleOutput[idx]]);
        idx++;
      } else {
        setRunning(false);
        clearInterval(t);
      }
    }, 280);
  };

  return (
    <section id="codelab" className="bg-[#0a0a18] border-t border-[#1a1a3a]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-24 space-y-20">

        <div className="section-num">[ 05 / 08 ] — CODE LAB</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white uppercase">
              Live Code<br />
              <span className="text-[#7c5cfc]">Simulator.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#6b6b9a] text-sm leading-relaxed">
              Inspect real Python security scripts and run interactive
              execution simulations directly in your browser.
            </p>
          </div>
        </div>

        {/* Workbench */}
        <div className="border border-[#1a1a3a]">
          {/* File tabs */}
          <div className="flex items-center gap-0 border-b border-[#1a1a3a] overflow-x-auto bg-[#06060f]">
            {codeSnippets.map(s => (
              <button
                key={s.id}
                onClick={() => { setSelectedId(s.id); setOutput([]); }}
                className={`flex items-center gap-2 px-6 py-4 font-mono text-[11px] uppercase tracking-widest border-r border-[#1a1a3a] transition-colors shrink-0 ${
                  selectedId === s.id
                    ? 'bg-[#0a0a18] text-[#4f8ef7] border-b-2 border-b-[#4f8ef7]'
                    : 'text-[#3a3a60] hover:text-[#6b6b9a]'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                {s.filename}
              </button>
            ))}
          </div>

          {/* Snippet meta + actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 py-5 border-b border-[#1a1a3a] bg-[#0e0e22]">
            <div>
              <span className="font-mono text-xs text-[#4f8ef7] uppercase tracking-wider">{snippet.title}</span>
              <p className="font-mono text-[11px] text-[#6b6b9a] mt-0.5">{snippet.description}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-4 py-2 border border-[#1a1a3a] text-[#6b6b9a] hover:border-[#4f8ef7] hover:text-[#4f8ef7] transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                onClick={handleRun}
                disabled={running}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-5 py-2 bg-[#4f8ef7] text-[#06060f] font-bold hover:bg-white transition-colors disabled:opacity-50"
              >
                {running ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                {running ? 'Running...' : 'Run'}
              </button>
            </div>
          </div>

          {/* Code + Output split */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Source */}
            <div className="border-b lg:border-b-0 lg:border-r border-[#1a1a3a] bg-[#06060f] p-6 overflow-x-auto max-h-[400px] overflow-y-auto">
              <pre className="font-mono text-xs text-[#6b6b9a] leading-relaxed">
                {snippet.code.split('\n').map((line, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="select-none text-[#1a1a3a] w-6 text-right shrink-0">{i + 1}</span>
                    <span className="text-[#e8e8f0] whitespace-pre">{line}</span>
                  </div>
                ))}
              </pre>
            </div>

            {/* Output */}
            <div className="bg-[#06060f] p-6 flex flex-col justify-between min-h-[200px] max-h-[400px] overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1a1a3a]">
                  <span className="w-2 h-2 rounded-full bg-[#4f8ef7] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#3a3a60]">stdout — Fedora CLI</span>
                </div>
                {output.length === 0 ? (
                  <div className="text-center py-10 font-mono text-xs text-[#3a3a60]">
                    Press Run to execute simulation
                  </div>
                ) : (
                  <div className="space-y-1">
                    {output.map((line, i) => (
                      <div key={i} className="font-mono text-[11px] text-[#4f8ef7] leading-relaxed">{line}</div>
                    ))}
                  </div>
                )}
              </div>
              {output.length > 0 && (
                <div className="pt-4 border-t border-[#1a1a3a] flex justify-between font-mono text-[10px] text-[#3a3a60] uppercase mt-4">
                  <span>Exit: 0</span>
                  <button onClick={() => setOutput([])} className="text-[#4f8ef7] hover:underline">Clear</button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
