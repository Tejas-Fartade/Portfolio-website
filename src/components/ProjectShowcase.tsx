import React, { useEffect, useRef, useState } from 'react';
import { Github, ArrowUpRight, CheckCircle, Download } from 'lucide-react';
import { projectsData } from '../data/resumeData';
import { Project } from '../types';

export const ProjectShowcase: React.FC = () => {
  const [active, setActive] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!active) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [active]);

  return (
    <section id="projects" className="bg-[#06060f] border-t border-[#1a1a3a]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-24 space-y-20">

        <div className="section-num">[ 04 / 08 ] — WORK</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white uppercase">
              Cyber<br />
              <span className="text-[#4f8ef7]">Tools</span><br />
              Built.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#6b6b9a] text-sm leading-relaxed">
              Practical security software, from encrypted Windows storage to
              packet monitoring, file integrity auditing and threat detection.
            </p>
            <a
              href="https://github.com/Tejas-Fartade"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 font-mono text-xs uppercase tracking-widest text-[#4f8ef7] hover:underline"
            >
              <span>github.com/Tejas-Fartade</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Projects list — Honey-style numbered rows */}
        <div className="space-y-0 border border-[#1a1a3a]">
          {projectsData.map((project, i) => (
            <div
              key={project.id}
              className="grid grid-cols-12 gap-6 px-5 sm:px-8 py-10 border-b border-[#1a1a3a] last:border-b-0 hover:bg-[#0a0a18] transition-colors group"
            >
              {/* Number */}
              <div className="col-span-1 pt-1">
                <span className="font-mono text-[11px] text-[#3a3a60]">0{i + 1}</span>
              </div>

              {/* Main content */}
              <div className="col-span-11 lg:col-span-8 space-y-3">
                <div className="flex items-start gap-4">
                  {project.logo && <img src={project.logo} alt="" width={64} height={64} className="w-12 sm:w-16 h-auto shrink-0" />}
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#7c5cfc]">
                      {project.category}
                      {project.version && <span className="block mt-1 text-cyan-300">Featured release / v{project.version}</span>}
                    </span>
                    <h3 className="font-display text-2xl lg:text-3xl text-white uppercase mt-1 group-hover:text-[#4f8ef7] transition-colors leading-tight">
                      {project.title.split('—')[0].trim()}
                    </h3>
                    <p className="mt-2 font-mono text-xs text-[#6b6b9a] leading-relaxed">{project.tagline}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.slice(0, 4).map(t => (
                    <span key={t} className="font-mono text-[10px] px-2 py-0.5 border border-[#1a1a3a] text-[#3a3a60] uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-12 lg:col-span-3 flex flex-wrap lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4">
                {project.downloadUrl && (
                  <a href={project.downloadUrl} className="inline-flex items-center gap-2 px-4 py-3 bg-cyan-300 text-[#06060f] font-mono text-[11px] font-bold uppercase hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
                    <Download className="w-4 h-4" /> Download for Windows
                  </a>
                )}
                <button onClick={() => setActive(project)} aria-label={`Inspect ${project.title}`} className="font-mono text-[11px] uppercase tracking-widest text-[#4f8ef7] hover:underline">
                  Inspect →
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[#6b6b9a] hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </div>
              {project.screenshot && (
                <div className="col-span-12 lg:col-start-2 lg:col-span-11 space-y-4">
                  <button onClick={() => setActive(project)} aria-label="View AEGIS project details" className="block w-full overflow-hidden border border-cyan-300/20 bg-black focus-visible:outline-2 focus-visible:outline-cyan-300">
                    <img src={project.screenshot} alt="AEGIS desktop dashboard with protect, unlock, Vault and integrity-check workflows" loading="lazy" width={1581} height={1911} className="w-full h-auto max-h-[440px] object-cover object-top" />
                  </button>
                  <p className="text-xs leading-relaxed text-[#a0a0be]">
                    {project.downloadNotice}{' '}
                    <a href={project.releaseUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline underline-offset-4">Release notes & SHA-256 checksum</a>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <dialog ref={dialogRef} onCancel={() => setActive(null)} aria-labelledby="project-dialog-title" className="m-auto p-0 w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a18] border border-[#1a1a3a] backdrop:bg-[#06060f]/95 backdrop:backdrop-blur-md">
            {/* Modal header */}
            <div className="flex items-start justify-between p-8 border-b border-[#1a1a3a]">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#7c5cfc]">{active.category}</span>
                <h3 id="project-dialog-title" className="font-display text-3xl text-white uppercase mt-1 leading-tight">{active.title.split('—')[0].trim()}</h3>
              </div>
              <button
                onClick={() => setActive(null)}
                className="font-mono text-[11px] text-[#6b6b9a] hover:text-white uppercase tracking-wider ml-4 shrink-0"
              >
                [Close]
              </button>
            </div>

            <div className="p-8 space-y-8">
              <p className="text-[#6b6b9a] text-sm leading-relaxed">{active.description}</p>
              {active.downloadUrl && (
                <div className="space-y-3">
                  <a href={active.downloadUrl} className="flex items-center justify-center gap-2 px-4 py-3 bg-cyan-300 text-[#06060f] font-mono text-xs font-bold uppercase hover:bg-white">
                    <Download className="w-4 h-4" /> Download v{active.version} · Windows x64
                  </a>
                  <p className="text-xs leading-relaxed text-[#a0a0be]">{active.downloadNotice}</p>
                  <a href={active.releaseUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-300 underline">Release notes & SHA-256 checksum</a>
                </div>
              )}

              {/* Architecture */}
              <div className="space-y-3">
                <span className="section-num">Architecture Pipeline</span>
                <div className="mt-4 space-y-2">
                  {active.architecture.map((step, i) => (
                    <div key={i} className="flex items-start gap-4 font-mono text-xs text-[#6b6b9a] py-2 border-b border-[#0e0e22]">
                      <span className="text-[#4f8ef7] shrink-0">Step {i + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bullets */}
              <div className="space-y-3">
                <span className="section-num">Key Deliverables</span>
                <ul className="mt-4 space-y-2">
                  {active.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 font-mono text-xs text-[#6b6b9a]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#4f8ef7] shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={active.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#4f8ef7] text-[#06060f] font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                <Github className="w-4 h-4" />
                Open GitHub Repository
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
        </dialog>
      )}
    </section>
  );
};
