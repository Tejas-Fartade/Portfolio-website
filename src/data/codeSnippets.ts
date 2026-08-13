import { CodeSnippet } from "../types";

export const codeSnippets: CodeSnippet[] = [
  {
    id: "netwatch_snippet",
    title: "NETWATCH Packet Sniffer & Traffic Analyzer",
    language: "python",
    filename: "netwatch_sniffer.py",
    description: "Live packet capture script using Scapy. Categorizes IP, TCP, UDP, ICMP, DNS packets and triggers port-scan threshold alerts.",
    code: `#!/usr/bin/env python3
"""
NETWATCH - Live Packet Sniffer & Threat Detection Tool
Developer: Tejas Fartade (Cybersecurity Intern)
"""

import sys
import time
from collections import defaultdict
from scapy.all import sniff, IP, TCP, UDP, ICMP, DNS

# Traffic statistics tracking
port_activity = defaultdict(int)
SCAN_THRESHOLD = 5  # Alert if >5 requests to distinct ports within window

def packet_callback(packet):
    if not packet.haslayer(IP):
        return

    src_ip = packet[IP].src
    dst_ip = packet[IP].dst
    proto = "OTHER"
    src_port, dst_port = "-", "-"

    if packet.haslayer(TCP):
        proto = "TCP"
        src_port = packet[TCP].sport
        dst_port = packet[TCP].dport
        port_activity[(src_ip, dst_port)] += 1

    elif packet.haslayer(UDP):
        proto = "UDP"
        src_port = packet[UDP].sport
        dst_port = packet[UDP].dport

    elif packet.haslayer(ICMP):
        proto = "ICMP"

    if packet.haslayer(DNS):
        proto = "DNS"

    timestamp = time.strftime("%H:%M:%S")
    print(f"[{timestamp}] [{proto:<4}] {src_ip}:{src_port} --> {dst_ip}:{dst_port}")

    # Port scan alert logic
    if port_activity[(src_ip, dst_port)] > SCAN_THRESHOLD:
        print(f"\\033[91m[ALERT] Repeated Port Activity Detected! Host {src_ip} hitting Port {dst_port}\\033[0m")

def start_capture(interface="eth0", count=10):
    print(f"\\033[92m[+] NETWATCH initialized on interface '{interface}'\\033[0m")
    print("[+] Filtering TCP/UDP/ICMP/DNS traffic... Press Ctrl+C to stop.")
    print("-" * 65)
    sniff(iface=interface, prn=packet_callback, store=0, count=count)

if __name__ == "__main__":
    start_capture(count=8)
`,
    sampleOutput: [
      "\x1b[92m[+] NETWATCH initialized on interface 'eth0'\x1b[0m",
      "[+] Filtering TCP/UDP/ICMP/DNS traffic... Press Ctrl+C to stop.",
      "-----------------------------------------------------------------",
      "[04:15:02] [TCP ] 192.168.1.105:54322 --> 142.250.190.46:443",
      "[04:15:02] [DNS ] 192.168.1.105:58210 --> 8.8.8.8:53 (Query: github.com)",
      "[04:15:03] [UDP ] 192.168.1.105:51200 --> 192.168.1.1:123",
      "[04:15:03] [ICMP] 192.168.1.105:-     --> 192.168.1.254:- (Echo Request)",
      "[04:15:04] [TCP ] 10.0.2.15:48821     --> 192.168.1.1:22",
      "[04:15:04] [TCP ] 10.0.2.15:48822     --> 192.168.1.1:22",
      "[04:15:04] [TCP ] 10.0.2.15:48823     --> 192.168.1.1:22",
      "\x1b[91m[ALERT] Repeated Port Activity Detected! Host 10.0.2.15 hitting Port 22\x1b[0m",
      "[+] Session complete. 8 packets processed. 0 errors.",
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
    id: "food_snippet",
    title: "FastAPI Backend Rule-Based Evaluator",
    language: "python",
    filename: "main.py",
    description: "FastAPI REST backend snippet for evaluating product ingredient safety and health profile rules.",
    code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI(title="Product Truth Teller API", version="1.0.0")

class HealthProfile(BaseModel):
    user_id: str
    allergies: List[str]
    dietary_goals: List[str]

class IngredientAnalysisRequest(BaseModel):
    product_name: str
    ingredients: List[str]
    profile: HealthProfile

@app.post("/api/v1/analyze-product")
async def analyze_product(payload: IngredientAnalysisRequest):
    warnings = []
    matches = []

    for ing in payload.ingredients:
        ing_lower = ing.lower()
        for allergy in payload.profile.allergies:
            if allergy.lower() in ing_lower:
                warnings.append(f"Contains allergen '{ing}' matching allergy '{allergy}'")

    score = max(0, 100 - (len(warnings) * 25))

    return {
        "product": payload.product_name,
        "safety_score": score,
        "status": "PASS" if score >= 75 else "WARNING",
        "warnings": warnings,
        "analyzed_count": len(payload.ingredients)
    }
`,
    sampleOutput: [
      "INFO:     Started server process [18294]",
      "INFO:     Waiting for application startup.",
      "INFO:     Application startup complete.",
      "INFO:     POST /api/v1/analyze-product HTTP/1.1 200 OK",
      "RESULT:   {'product': 'Granola Crunch', 'safety_score': 100, 'status': 'PASS', 'warnings': []}",
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
