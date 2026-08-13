import React, { useState } from 'react';
import { skillCategories } from '../data/resumeData';

export const SkillsSection: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="skills" className="bg-[#0a0a18] border-t border-[#1a1a3a]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-24 space-y-20">

        <div className="section-num">[ 03 / 08 ] — CAPABILITIES</div>

        {/* Editorial headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white uppercase">
              Technical<br />
              <span className="text-[#7c5cfc]">Arsenal.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#6b6b9a] text-sm leading-relaxed">
              Handcrafted cybersecurity capabilities — Python network tools,
              cryptographic baseline auditing, and Linux-first workflows.
            </p>
          </div>
        </div>

        {/* Skills table */}
        <div className="space-y-0 border border-[#1a1a3a]">
          {skillCategories.map((cat, ci) => (
            <div key={cat.category}>
              {/* Category header row */}
              <button
                onClick={() => setActive(active === cat.category ? null : cat.category)}
                className="w-full grid grid-cols-12 gap-4 px-8 py-6 border-b border-[#1a1a3a] hover:bg-[#0e0e22] transition-colors group text-left"
              >
                <div className="col-span-1">
                  <span className="font-mono text-[11px] text-[#3a3a60]">0{ci + 1}</span>
                </div>
                <div className="col-span-7 lg:col-span-8">
                  <div className="font-display text-2xl lg:text-3xl text-white uppercase group-hover:text-[#4f8ef7] transition-colors">
                    {cat.category}
                  </div>
                  <div className="mt-1 font-mono text-xs text-[#6b6b9a]">{cat.description}</div>
                </div>
                <div className="col-span-4 lg:col-span-3 flex items-center justify-end gap-3">
                  <span className="font-mono text-[10px] text-[#3a3a60] uppercase">{cat.skills.length} skills</span>
                  <span className={`font-mono text-sm text-[#4f8ef7] transition-transform ${active === cat.category ? 'rotate-45' : ''}`}>+</span>
                </div>
              </button>

              {/* Expanded skills */}
              {active === cat.category && (
                <div className="border-b border-[#1a1a3a] bg-[#06060f]">
                  {cat.skills.map((skill, si) => (
                    <div
                      key={skill.name}
                      className="grid grid-cols-12 gap-4 px-8 py-5 border-b border-[#0e0e22] last:border-b-0 hover:bg-[#0a0a18] transition-colors"
                    >
                      <div className="col-span-1 pt-1">
                        <span className="font-mono text-[10px] text-[#3a3a60]">{String(si + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="col-span-7 lg:col-span-8 space-y-1">
                        <div className="font-sans text-sm font-semibold text-[#e8e8f0]">{skill.name}</div>
                        <div className="font-mono text-xs text-[#6b6b9a] leading-relaxed">{skill.description}</div>
                      </div>
                      <div className="col-span-4 lg:col-span-3 flex items-center justify-end">
                        <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 border ${
                          skill.level === 'Advanced'
                            ? 'border-[#4f8ef7]/40 text-[#4f8ef7]'
                            : skill.level === 'Proficient'
                            ? 'border-[#7c5cfc]/40 text-[#7c5cfc]'
                            : 'border-[#1a1a3a] text-[#6b6b9a]'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
