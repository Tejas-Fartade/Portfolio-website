import { BlogPost } from "../types";

export const blogPosts: BlogPost[] = [
  {
    id: "netwatch-deepdive",
    slug: "netwatch-packet-analysis",
    title: "Building NETWATCH: Packet Capture & Port Scan Detection with Python & Scapy",
    date: "August 2026",
    readTime: "5 min read",
    category: "Network Security",
    summary: "An in-depth look at implementing live packet capture, IP/protocol decoding, and threshold-based port scan alerting in Python using Scapy.",
    terminalCommand: "cat blog/netwatch-packet-analysis.md",
    tags: ["Python", "Scapy", "Packet Capture", "Defensive Cyber", "Port Scanning"],
    contentMarkdown: `
# Building NETWATCH: Real-time Packet Capture & Port Scan Detection

Network visibility is the cornerstone of defensive cybersecurity. As a 19-year-old AI & ML diploma student passionate about network security, I built **NETWATCH** using Python and the **Scapy** packet manipulation framework.

## Why Scapy?
While sockets allow raw data reading, Scapy provides built-in protocol stack dissectors for Ethernet, IP, TCP, UDP, ICMP, and DNS out of the box.

### Key Architectural Pillars:
1. **Promiscuous Sniffing**: Attaching to network interfaces (\`eth0\`, \`wlan0\`) using \`sniff(prn=callback, store=0)\`.
2. **Protocol Dissection**: Extracting source/destination IP addresses, port tuples, TCP flags, and DNS queries.
3. **Anomaly & Port Scan Detection**: Maintaining a rolling frequency map of distinct destination ports requested by a single IP address. If a threshold (e.g., >5 ports in 2 seconds) is exceeded, NETWATCH fires an immediate threat alert.
4. **PCAP & CSV Export**: Writing raw packets to standard PCAP format for post-incident analysis in Wireshark.

### Real-World Defensive Applications
- Detecting stealth SYN scans (Nmap \`-sS\`).
- Identifying rogue DNS queries pointing to known C2 domains.
- Auditing unauthorized cleartext traffic on local subnets.
`,
  },
  {
    id: "fim-hashing-strategy",
    slug: "file-integrity-monitoring",
    title: "Cryptographic File Integrity Monitoring: SHA-256 Baselines in Practice",
    date: "July 2026",
    readTime: "4 min read",
    category: "Defensive Security",
    summary: "How to design a tamper-proof file integrity monitor using Python CLI workflows, JSON baseline stores, and SHA-256 hashing.",
    terminalCommand: "cat blog/file-integrity-monitoring.md",
    tags: ["Defensive Security", "SHA-256", "Cryptography", "Python CLI", "Linux"],
    contentMarkdown: `
# Cryptographic File Integrity Monitoring: SHA-256 Baselines

When an attacker gains unauthorized access to a server, one of their first steps is modifying system binaries, webshell injection, or cronjob persistence. A **File Integrity Monitor (FIM)** provides immediate tamper detection.

## The Mathematical Foundation: SHA-256
SHA-256 (Secure Hash Algorithm 256-bit) produces a deterministic 64-character hexadecimal digest. Even a single bit change in a multi-gigabyte file dramatically alters the hash output.

### Algorithm Workflow:
1. **Baseline Generation Phase**:
   - Recursively traverse the target filesystem directory tree.
   - Read files in 64KB chunks to prevent memory exhaust on large binaries.
   - Hash each file's raw byte stream and store \`{ "filepath": "hash_value" }\` inside an encrypted/immutable JSON baseline.

2. **Verification & Audit Phase**:
   - Perform a fresh scan of the current directory.
   - Categorize discrepancies into **MODIFIED**, **CREATED**, or **DELETED**.
   - Output structured CLI audit reports and trigger alerts if critical system paths (\`/etc/\`, \`/usr/bin/\`) are tampered with.
`,
  },
  {
    id: "fedora-cli-workflows",
    slug: "fedora-incident-response",
    title: "Linux Command-Line Security Workflows: Fedora CLI for Incident Response",
    date: "June 2026",
    readTime: "6 min read",
    category: "Linux & CLI",
    summary: "Essential Linux terminal commands and shell pipelines for analyzing active sockets, process trees, and filesystem logs.",
    terminalCommand: "cat blog/fedora-incident-response.md",
    tags: ["Linux", "Fedora", "CLI", "Incident Response", "Networking"],
    contentMarkdown: `
# Linux Command-Line Security Workflows for Incident Response

Command-line fluency is non-negotiable for cybersecurity practitioners. Operating primarily on **Fedora Linux**, I rely on lightweight native utilities for rapid system triage.

## Core IR Commands Cheat Sheet:

### 1. Active Socket Audit
\`\`\`bash
ss -tulpn | grep LISTEN
\`\`\`
Quickly identifies every process bound to a listening TCP or UDP port along with its Process ID (PID).

### 2. File Descriptor & Open Sockets
\`\`\`bash
lsof -i :443
\`\`\`
Lists process names and file descriptors tied to HTTPS connections.

### 3. Suspicious Process Tree Inspection
\`\`\`bash
ps aux --sort=-%cpu | head -n 10
\`\`\`
Finds CPU-hogging background scripts or unauthorized miners.

### 4. Filesystem Timestamp Auditing
\`\`\`bash
find /var/www -mtime -1 -type f
\`\`\`
Locates any file modified within the last 24 hours inside web root directories.
`,
  },
  {
    id: "ai-ml-cybersecurity",
    slug: "ai-ml-cybersecurity",
    title: "Bridging AI/ML & Defensive Cyber: Rule-Based Systems to Predictive Anomaly Detection",
    date: "May 2026",
    readTime: "5 min read",
    category: "AI & Cyber",
    summary: "Connecting my Diploma in Artificial Intelligence & Machine Learning with defensive cybersecurity tool design.",
    terminalCommand: "cat blog/ai-ml-cybersecurity.md",
    tags: ["AI/ML", "Cybersecurity", "FastAPI", "Python", "Predictive Analytics"],
    contentMarkdown: `
# Bridging AI/ML and Defensive Cybersecurity

As a 3rd-year AI & ML diploma student at Csmss Chh Shahu College of Polytechnic, my mission is applying artificial intelligence models to enhance traditional cybersecurity monitoring.

## Rule-Based Systems vs. ML Anomaly Detection
Traditional security tooling relies heavily on static signature rules (e.g. YARA rules, fixed port scan counts). While reliable, signatures fail against zero-day exploits and polymorphic traffic patterns.

### Future Horizons for Cyber AI:
1. **Log Anomaly Clustering**: Grouping web server syslog records using Unsupervised ML (K-Means / Isolation Forests) to surface abnormal payload structures.
2. **Predictive Packet Classification**: Training lightweight Random Forest / Neural Nets to classify malicious vs benign flow features (packet size, inter-arrival time, window size).
3. **Automated Incident Triage**: Combining FastAPI microservices with local LLMs to generate human-readable security alert summaries for SOC analysts.
`,
  },
];
