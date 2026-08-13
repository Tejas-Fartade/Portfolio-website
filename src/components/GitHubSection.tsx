import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, RefreshCw, BookOpen } from 'lucide-react';
import { GitHubRepo, GitHubUserStats } from '../types';

export const GitHubSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{ user: GitHubUserStats; repos: GitHubRepo[] } | null>(null);

  useEffect(() => {
    fetch('/api/github/stats')
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="github" className="bg-[#0a0a18] border-t border-[#1a1a3a]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-24 space-y-20">

        <div className="section-num">[ 07 / 08 ] — OPEN SOURCE</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white uppercase">
              GitHub<br />
              <span className="text-[#7c5cfc]">Repos.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-4">
            <p className="text-[#6b6b9a] text-sm leading-relaxed">
              Live GitHub activity — repositories built for defensive security, network monitoring, and Python automation.
            </p>
            <a
              href="https://github.com/Tejas-Fartade"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-5 py-3 bg-[#4f8ef7] text-[#06060f] font-bold hover:bg-white transition-colors"
            >
              <Github className="w-4 h-4" />
              github.com/Tejas-Fartade
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 font-mono text-xs text-[#3a3a60] py-12">
            <RefreshCw className="w-4 h-4 animate-spin text-[#4f8ef7]" />
            Syncing with GitHub API...
          </div>
        ) : stats ? (
          <div className="space-y-0 border border-[#1a1a3a]">
            {/* Profile row */}
            <div className="grid grid-cols-12 gap-6 px-8 py-8 border-b border-[#1a1a3a] bg-[#06060f]">
              <div className="col-span-12 lg:col-span-8 flex items-center gap-5">
                <img
                  src={stats.user.avatar_url}
                  alt={stats.user.name}
                  className="w-14 h-14 border border-[#1a1a3a] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-display text-2xl text-white uppercase">{stats.user.name}</div>
                  <div className="font-mono text-xs text-[#4f8ef7]">@{stats.user.login}</div>
                  {stats.user.bio && (
                    <div className="font-mono text-xs text-[#6b6b9a] mt-1">{stats.user.bio}</div>
                  )}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 flex items-center justify-start lg:justify-end gap-8 font-mono text-center">
                {[
                  { val: stats.user.public_repos, label: 'Repos' },
                  { val: '100%', label: 'Python' },
                  { val: '3rd Yr', label: 'AI & ML' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="text-xl font-bold text-white">{item.val}</div>
                    <div className="text-[10px] text-[#3a3a60] uppercase tracking-wider">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Repo rows */}
            {stats.repos.map((repo, i) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-12 gap-6 px-8 py-7 border-b border-[#1a1a3a] last:border-b-0 hover:bg-[#0e0e22] transition-colors group"
              >
                <div className="col-span-1 pt-1">
                  <span className="font-mono text-[11px] text-[#3a3a60]">0{i + 1}</span>
                </div>
                <div className="col-span-11 lg:col-span-8 space-y-1">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#4f8ef7]" />
                    <span className="font-mono text-xs text-[#4f8ef7] uppercase tracking-wider group-hover:underline">
                      {repo.name}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#6b6b9a] leading-relaxed">
                    {repo.description || 'Cybersecurity tools repository.'}
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-3 flex items-center justify-start lg:justify-end gap-4 font-mono text-xs text-[#3a3a60]">
                  <span className="flex items-center gap-1 text-amber-500/70">
                    <Star className="w-3.5 h-3.5" />{repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />{repo.forks_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#4f8ef7]" />
                    {repo.language || 'Python'}
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="font-mono text-xs text-[#3a3a60] py-12">
            Could not load GitHub data. Visit{' '}
            <a href="https://github.com/Tejas-Fartade" target="_blank" rel="noopener noreferrer" className="text-[#4f8ef7] hover:underline">
              github.com/Tejas-Fartade
            </a>{' '}
            directly.
          </div>
        )}

      </div>
    </section>
  );
};
