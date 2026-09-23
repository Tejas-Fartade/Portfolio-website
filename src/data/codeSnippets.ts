import { CodeSnippet } from "../types";

export const codeSnippets: CodeSnippet[] = [
  {
    id: "netwatch_snippet",
    title: "NETWATCH Packet Sniffer & Traffic Analyzer",
    language: "python",
    filename: "netwatch_sniffer.py",
    description: "NETWATCH entry-point example using the repository modules. Parses structured events and alerts on distinct ports per source/target within a rolling window. Browser output is simulated.",
    code: "#!/usr/bin/env python3\n\"\"\"Save beside the modules in NETWATCH's netwatch/ folder.\"\"\"\nfrom scapy.all import sniff\nfrom detection import PortScanDetector\nfrom parsing import parse_packet\nfrom output import format_event, format_alert\n\nSCAN_THRESHOLD = 6\nSCAN_WINDOW = 10.0\nINTERFACE = None  # Scapy default; set to your capture interface.\ndetector = PortScanDetector(SCAN_THRESHOLD, SCAN_WINDOW)\n\ndef packet_callback(packet):\n    detector.expire()\n    event = parse_packet(packet)\n    if event is None:\n        return\n    print(format_event(event))\n    alert = detector.observe(event)\n    if alert is not None:\n        print(format_alert(alert))\n\nif __name__ == \"__main__\":\n    sniff(iface=INTERFACE, prn=packet_callback, store=False)\n",
    sampleOutput: [
      "[+] Example traffic: scan threshold 6 distinct ports in 10 seconds.",
      "[2026-09-24T00:00:01+00:00] 192.168.1.10:50000 -> 192.168.1.20:21 [TCP]",
      "[2026-09-24T00:00:01+00:00] 192.168.1.10:50000 -> 192.168.1.20:22 [TCP]",
      "[2026-09-24T00:00:01+00:00] 192.168.1.10:50000 -> 192.168.1.20:23 [TCP]",
      "[2026-09-24T00:00:01+00:00] 192.168.1.10:50000 -> 192.168.1.20:80 [TCP]",
      "[2026-09-24T00:00:01+00:00] 192.168.1.10:50000 -> 192.168.1.20:443 [TCP]",
      "[2026-09-24T00:00:01+00:00] 192.168.1.10:50000 -> 192.168.1.20:8080 [TCP]",
      "ALERT: possible port scan from 192.168.1.10 to 192.168.1.20 (6 destination ports / 10s)"
],
  },
  {
    id: "fim_snippet",
    title: "SHA-256 File Integrity Change Detector",
    language: "python",
    filename: "file_integrity_monitor.py",
    description: "Computes recursive SHA-256 baseline hashes for specified directories and detects created, modified, or deleted files.",
    code: `#!/usr/bin/env python3
"""
File Integrity Monitor (FIM) - SHA-256 Tamper Detector
Developer: Tejas Fartade (Defensive Security Project)
"""

import os
import hashlib
import json
import sys
from datetime import datetime

def calculate_sha256(filepath):
    hasher = hashlib.sha256()
    try:
        with open(filepath, 'rb') as f:
            while chunk := f.read(65536):
                hasher.update(chunk)
        return hasher.hexdigest()
    except Exception as e:
        return None

def scan_directory(directory_path):
    hashes = {}
    for root, _, files in os.walk(directory_path):
        for file in files:
            full_path = os.path.join(root, file)
            file_hash = calculate_sha256(full_path)
            if file_hash:
                hashes[full_path] = file_hash
    return hashes

def create_baseline(target_dir, baseline_file="baseline.json"):
    print(f"[+] Creating SHA-256 baseline for directory: {target_dir}")
    data = {
        "timestamp": datetime.now().isoformat(),
        "target_directory": target_dir,
        "files": scan_directory(target_dir)
    }
    with open(baseline_file, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"\\033[92m[SUCCESS] Baseline saved to {baseline_file} ({len(data['files'])} files hashed)\\033[0m")

def verify_integrity(target_dir, baseline_file="baseline.json"):
    if not os.path.exists(baseline_file):
        print("\\033[91m[ERROR] Baseline file missing. Run --create-baseline first.\\033[0m")
        return

    with open(baseline_file, 'r') as f:
        baseline = json.load(f)['files']

    current = scan_directory(target_dir)
    
    modified, created, deleted = [], [], []

    for path, curr_hash in current.items():
        if path not in baseline:
            created.append(path)
        elif curr_hash != baseline[path]:
            modified.append(path)

    for path in baseline:
        if path not in current:
            deleted.append(path)

    print("\\n" + "="*50)
    print("      FILE INTEGRITY AUDIT REPORT")
    print("="*50)
    print(f"Modifications detected : {len(modified)}")
    print(f"New files created      : {len(created)}")
    print(f"Files deleted          : {len(deleted)}")

    for m in modified:
        print(f"\\033[91m [MODIFIED] {m}\\033[0m")
    for c in created:
        print(f"\\033[93m [CREATED]  {c}\\033[0m")
    for d in deleted:
        print(f"\\033[91m [DELETED]  {d}\\033[0m")

    if not (modified or created or deleted):
        print("\\033[92m[+] Integrity Verified: All files match baseline.\\033[0m")

if __name__ == "__main__":
    verify_integrity("./sample_directory")
`,
    sampleOutput: [
      "[+] Loading SHA-256 baseline reference from baseline.json...",
      "[+] Scanning target filesystem recursively: /etc/network_configs",
      "==================================================",
      "      FILE INTEGRITY AUDIT REPORT",
      "==================================================",
      "Modifications detected : 1",
      "New files created      : 1",
      "Files deleted          : 0",
      "\x1b[91m [MODIFIED] /etc/network_configs/rules.conf (SHA256 Mismatch)\x1b[0m",
      "\x1b[93m [CREATED]  /etc/network_configs/temp_payload.sh\x1b[0m",
      "--------------------------------------------------",
      "\x1b[91m[WARNING] Filesystem changes detected! Integrity breach logged.\x1b[0m",
    ],
  },
  {
    id: "linux_script",
    title: "Fedora Incident Response Shell Pipeline",
    language: "bash",
    filename: "incident_triage.sh",
    description: "Shell pipeline for automated network socket investigation, process tree inspection, and log monitoring.",
    code: `#!/usr/bin/env bash
# Fedora Linux Defensive Incident Response Triage
# Developer: Tejas Fartade

echo -e "\\e[32m[+] Initiating System Incident Response Triage...\\e[0m"

echo "[1] Checking Active Network Connections & Listening Ports:"
ss -tulpn | grep -E "LISTEN|ESTAB"

echo -e "\\n[2] Auditing Top Memory & CPU Consuming Processes:"
ps aux --sort=-%mem | head -n 6

echo -e "\\n[3] Searching for Modified Files in /etc within last 24h:"
find /etc -mtime -1 -ls 2>/dev/null | head -n 10

echo -e "\\n\\e[32m[+] Triage Complete. Generating Incident Summary...\\e[0m"
`,
    sampleOutput: [
      "\x1b[32m[+] Initiating System Incident Response Triage...\x1b[0m",
      "[1] Checking Active Network Connections & Listening Ports:",
      "tcp  LISTEN  0  128  0.0.0.0:22      0.0.0.0:*  users:((\"sshd\",pid=1024,fd=3))",
      "tcp  LISTEN  0  511  127.0.0.1:3000  0.0.0.0:*  users:((\"node\",pid=2048,fd=18))",
      "[2] Auditing Top Memory & CPU Consuming Processes:",
      "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND",
      "root      1024  0.1  0.8 112040  8920 ?        Ss   02:10   0:01 /usr/sbin/sshd",
      "[3] Searching for Modified Files in /etc within last 24h:",
      "-rw-r--r--. 1 root root 1420 Aug 12 04:10 /etc/resolv.conf",
      "\x1b[32m[+] Triage Complete. System Operating Normally.\x1b[0m",
    ],
  },
];
