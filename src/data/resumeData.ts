import { Project, SkillCategory } from '../types';
import aegisLogo from '../assets/aegis-logo.png';
import aegisDashboard from '../assets/aegis-dashboard.png';

export const personalDetails = {
  name: "Tejas Fartade",
  age: 19,
  title: "CYBERSECURITY INTERN | AI & ML DIPLOMA STUDENT",
  headline: "Defensive Cybersecurity Specialist & Network Security Enthusiast",
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  phone: "9834389541",
  email: "tejasx7788@gmail.com",
  linkedin: "https://linkedin.com/in/tejas-fartade-483708394",
  github: "https://github.com/Tejas-Fartade",
  availability: "Available for a 3-Month Cybersecurity Internship",
  profileSummary: `19-year-old final-year Diploma student in Artificial Intelligence & Machine Learning with a strong interest in cybersecurity, network security, Linux, and defensive security. Hands-on experience building cybersecurity tools in Python, including a real-time packet monitoring tool (NETWATCH) and a file integrity monitor. Comfortable with Linux/Fedora, CLI workflows, Git/GitHub, and fundamental networking concepts.`,
  careerObjective: `To begin my cybersecurity career through an internship focused on network monitoring, vulnerability identification, security operations, and incident response. I am particularly interested in defensive security and want to strengthen my practical skills by working with real-world security tools and professional teams.`,
  education: {
    degree: "Diploma in Artificial Intelligence & Machine Learning — Final Year (3rd Year)",
    institution: "Csmss Chh Shahu College of Polytechnic, Maharashtra",
    expectedYear: "2026",
    status: "Final Year Student (Currently Pursuing)",
  },
  additionalLearning: [
    "Cybersecurity fundamentals & defensive security architectures",
    "Networking and CCNA-oriented core concepts",
    "Linux & Fedora command-line security workflows",
    "Python scripting for cybersecurity automation & packet manipulation",
    "Hands-on packet capture analysis & filesystem integrity monitoring",
  ],
};

export const projectsData: Project[] = [
  {
    id: "aegis",
    title: "AEGIS — Secure Storage",
    tagline: "Local encrypted file and folder storage. Built for Windows, designed around explicit control.",
    category: "Defensive Security",
    githubUrl: "https://github.com/Tejas-Fartade/AEGIS",
    downloadUrl: "https://github.com/Tejas-Fartade/AEGIS/releases/download/v1.2.0/AEGIS-Setup-1.2.0.exe",
    releaseUrl: "https://github.com/Tejas-Fartade/AEGIS/releases/tag/v1.2.0",
    version: "1.2.0",
    logo: aegisLogo,
    screenshot: aegisDashboard,
    downloadNotice: "Windows x64 · Unsigned installer · Not independently security-audited. Keep backups; passwords cannot be recovered.",
    tags: ["Electron", "TypeScript", "React", "AES-256-GCM", "Argon2id"],
    featured: true,
    description: "A Windows desktop application for protecting files and folders in versioned, password-encrypted .aegis containers. Combines authenticated encryption with a local Vault library, batch workflows, integrity checks and safe password changes, wrapped in a cyan-and-gunmetal interface.",
    bullets: [
      "Protect and unlock files or folders using Argon2id and AES-256-GCM; full authentication precedes restoration.",
      "Drag-and-drop and sequential batch workflows, with collision rejection and original removal off by default.",
      "Vault references, password-authenticated integrity checks and streamed password changes without plaintext disk staging.",
      "Separately confirmed best-effort Shredder; physical erasure is not guaranteed.",
      "1.2.0 verification: 912 tests passed, including 38 packaged Windows tests. Testing is not an independent security audit.",
    ],
    architecture: [
      "React interface → narrow Electron IPC → validated, identity-bound filesystem selections",
      "Argon2id key derivation → AES-256-GCM authenticated records → versioned .aegis container",
      "Full container authentication → restoration-plan validation → collision-safe output",
    ],
  },
  {
    id: "netwatch",
    title: "NETWATCH — Network Packet Monitoring & Threat Detection Tool",
    tagline: "Python & Scapy based authorized network traffic analysis tool with port scan alerting.",
    category: "Network Security",
    githubUrl: "https://github.com/Tejas-Fartade/NETWATCH-----packet-sniffer--",
    tags: ["Python", "Scapy", "Network Security", "TCP/UDP/ICMP", "DNS", "PCAP/CSV Export", "Port Scan Alerting"],
    featured: true,
    codeSnippetId: "netwatch_snippet",
    description: "Built a Python/Scapy packet-monitoring tool for authorized network traffic analysis, live packet inspection, protocol classification, and anomaly detection.",
    bullets: [
      "Built a Python/Scapy packet-monitoring tool for authorized network traffic analysis.",
      "Implemented live capture, source/destination IPs, TCP/UDP/ICMP identification, ports, and DNS visibility.",
      "Added traffic filters, live statistical rollups, PCAP/CSV export, and distinct-port scan alerts per source/target within a configurable time window.",
      "Supports command-line parameters for interface binding and real-time console logging.",
    ],
    architecture: [
      "Network Interface -> Scapy Sniffer Engine -> Packet Parser & IP/Protocol Decoder",
      "Traffic Filter Matrix -> Anomaly & Port-Scan Detector -> Alert Dispatcher",
      "Real-time CLI Console Dashboard + Automated PCAP / CSV Audit Logger",
    ],
  },
  {
    id: "file-integrity-monitor",
    title: "File Integrity Monitor — SHA-256 File Change Detection",
    tagline: "CLI tool for recursive filesystem verification against trusted cryptographic baselines.",
    category: "Defensive Security",
    githubUrl: "https://github.com/Tejas-Fartade/file-integrity-monitor",
    tags: ["Python", "CLI", "SHA-256 Hashing", "Defensive Security", "JSON Baseline", "Recursive Scanning"],
    featured: true,
    codeSnippetId: "fim_snippet",
    description: "Developed a Python CLI tool to monitor directories for unexpected file changes, unauthorized file creation, modifications, or deletions using SHA-256 hashing.",
    bullets: [
      "Developed a Python CLI tool to monitor specified directories for unexpected file changes.",
      "Creates a trusted SHA-256 baseline database and compares subsequent scans to detect tampering.",
      "Detects new, modified, and deleted files and generates a formatted integrity audit report.",
      "Stores baseline data in JSON format and supports recursive directory scanning with timestamping.",
    ],
    architecture: [
      "Target Directory -> Recursive Walker -> SHA-256 Hash Generator Engine",
      "JSON Baseline Store <-> Differential Analyzer Engine",
      "Tamper Alert Generator -> Terminal Integrity Audit Summary",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Network Security",
    iconName: "Network",
    description: "Packet capture, protocol dissection, traffic filtering, and basic recon detection.",
    skills: [
      { name: "Packet Capture & Analysis", level: "Advanced", description: "Capturing and dissecting raw ethernet packets using Python Scapy and Wireshark." },
      { name: "IP & Port Monitoring", level: "Advanced", description: "Tracking active sockets, source/destination IPs, and anomalous port connection rates." },
      { name: "TCP / UDP / ICMP / DNS Traffic", level: "Proficient", description: "Deep inspection of protocol headers, DNS query logs, and ICMP ping sweeps." },
      { name: "Basic Reconnaissance Detection", level: "Intermediate", description: "Detecting repeated port scans, SYN floods, and unauthorized subnet mapping." },
    ],
  },
  {
    category: "Defensive Security",
    iconName: "ShieldCheck",
    description: "Cryptographic baseline auditing, file change detection, and threat monitoring.",
    skills: [
      { name: "File Integrity Monitoring", level: "Advanced", description: "Building SHA-256 baseline auditors for detecting file tampering, insertion, and deletion." },
      { name: "SHA-256 Hashing & Cryptography", level: "Advanced", description: "Utilizing cryptographic hash functions for integrity validation and checksum verification." },
      { name: "Baseline Comparison & Auditing", level: "Proficient", description: "Comparing real-time directory structures against immutable baseline JSON snapshots." },
      { name: "Basic Suspicious Traffic Detection", level: "Intermediate", description: "Flagging unusual traffic spikes, non-standard port communications, and telemetry anomalies." },
      { name: "Incident Response Fundamentals", level: "Intermediate", description: "Gathering system logs, isolating compromised paths, and generating integrity post-mortems." },
    ],
  },
  {
    category: "Programming & Scripting",
    iconName: "Code2",
    description: "Python automation, security scripting, REST APIs, and structured data.",
    skills: [
      { name: "Python Scripting", level: "Advanced", description: "Creating custom CLI tools, socket listeners, and data processing pipelines." },
      { name: "FastAPI & REST APIs", level: "Proficient", description: "Designing structured RESTful endpoints and handling JSON payloads." },
      { name: "JSON & Filesystem I/O", level: "Advanced", description: "Managing baseline databases, configuration schemas, and structured security logs." },
      { name: "Git & GitHub Version Control", level: "Proficient", description: "Collaborative Git workflows, repository management, and automated release tracking." },
    ],
  },
  {
    category: "Linux & Systems",
    iconName: "Terminal",
    description: "Fedora Linux command-line tools, process monitoring, and package administration.",
    skills: [
      { name: "Fedora / Linux CLI", level: "Advanced", description: "Fluent with terminal navigation, shell pipes, permissions, and process management." },
      { name: "Filesystem Operations & Permissions", level: "Advanced", description: "Inspecting directory hierarchies, POSIX permissions, and file descriptors." },
      { name: "Package Management (dnf/apt)", level: "Proficient", description: "Managing dependencies, system services, and security tooling updates." },
      { name: "VS Code & CLI Tools", level: "Advanced", description: "Configuring development environments for rapid Python debugging and shell scripting." },
    ],
  },
  {
    category: "Tools & Technologies",
    iconName: "Wrench",
    description: "Security utilities, network analyzers, and IDEs.",
    skills: [
      { name: "Scapy", level: "Advanced", description: "Python packet manipulation library for forging, sniffing, and dissecting network packets." },
      { name: "Wireshark", level: "Learning", description: "Deep packet inspection, pcap filtering, and TCP stream analysis (currently deepening)." },
      { name: "Git & GitHub", level: "Proficient", description: "Maintaining open-source cybersecurity project repositories." },
      { name: "VS Code", level: "Advanced", description: "Primary development workspace for Python, Linux shell scripts, and web development." },
    ],
  },
];
