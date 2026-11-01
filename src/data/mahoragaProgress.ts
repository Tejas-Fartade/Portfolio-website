// Owner-selected roadmap estimate, not test coverage or measured readiness.
// Keep the percentage and public status here so future updates are straightforward.
export const mahoragaProgress = {
  percent: 20,
  updated: '2026-10-30',
  repositoryUrl: 'https://github.com/Tejas-Fartade/NETWATCH-----packet-sniffer--',
  current: 'Base engine implemented',
  next: 'Controlled live demonstration',
  validation: 'Live demonstration pending. Local AI verification is currently blocked.',
};

export const mahoragaStages = [
  {
    label: 'Observe',
    title: 'See the signal.',
    description: 'Network packets become readable events. Deterministic rules watch for distinct-port scans.',
    trace: 'TRAFFIC → EVENTS → DETECTION',
    detail: 'TCP · UDP · ICMP · DNS metadata',
  },
  {
    label: 'Remember',
    title: 'Keep the context.',
    description: 'A bounded, short-term memory keeps recent activity close. Old observations expire automatically.',
    trace: 'EVENTS → RECENT ACTIVITY',
    detail: 'In memory · Time limited · Capacity bounded',
  },
  {
    label: 'Correlate',
    title: 'Connect the dots.',
    description: 'Related events form host profiles and behavioral baselines. Changes become traceable evidence.',
    trace: 'ACTIVITY → PROFILES → EVIDENCE',
    detail: 'Directional host pairs · Descriptive baselines',
  },
  {
    label: 'Investigate',
    title: 'Follow the evidence.',
    description: 'Read-only investigations preserve sources and missing context. Policy stays advisory; no automatic response.',
    trace: 'EVIDENCE → INVESTIGATION → REVIEW',
    detail: 'Bounded lookups · Supporting event links',
  },
];
