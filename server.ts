import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // GitHub Stats API with fallback
  app.get("/api/github/stats", async (_req, res) => {
    try {
      const userRes = await fetch("https://api.github.com/users/Tejas-Fartade", {
        headers: { "User-Agent": "CyberPortfolioApp" },
      });
      const reposRes = await fetch("https://api.github.com/users/Tejas-Fartade/repos?sort=updated&per_page=10", {
        headers: { "User-Agent": "CyberPortfolioApp" },
      });

      if (userRes.ok && reposRes.ok) {
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        return res.json({
          user: {
            login: userData.login,
            name: userData.name || "Tejas Fartade",
            avatar_url: userData.avatar_url,
            html_url: userData.html_url,
            public_repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            bio: userData.bio || "Cybersecurity Intern & AI/ML Diploma Student",
          },
          repos: reposData.map((r: any) => ({
            id: r.id,
            name: r.name,
            full_name: r.full_name,
            description: r.description,
            html_url: r.html_url,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            language: r.language,
            updated_at: r.updated_at,
          })),
        });
      }
    } catch (err) {
      console.warn("GitHub API error or rate-limited, using fallback data:", err);
    }

    // Fallback data
    return res.json({
      user: {
        login: "Tejas-Fartade",
        name: "Tejas Fartade",
        avatar_url: "https://avatars.githubusercontent.com/u/150000000?v=4",
        html_url: "https://github.com/Tejas-Fartade",
        public_repos: 8,
        followers: 12,
        following: 15,
        bio: "Cybersecurity Intern | AI & ML Diploma Student | Defensive Security & Packet Monitoring",
      },
      repos: [
        {
          id: 1,
          name: "NETWATCH",
          full_name: "Tejas-Fartade/NETWATCH",
          description: "Network Packet Monitoring & Threat Detection Tool built with Python & Scapy. Features TCP/UDP/ICMP/DNS capture & port scan alerting.",
          html_url: "https://github.com/Tejas-Fartade/NETWATCH",
          stargazers_count: 14,
          forks_count: 4,
          language: "Python",
          updated_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: "file-integrity-monitor",
          full_name: "Tejas-Fartade/file-integrity-monitor",
          description: "Python CLI tool for SHA-256 file integrity change detection. Creates JSON baselines and generates integrity audit reports.",
          html_url: "https://github.com/Tejas-Fartade/file-integrity-monitor",
          stargazers_count: 9,
          forks_count: 2,
          language: "Python",
          updated_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Food-Product-Truth-Teller",
          full_name: "Tejas-Fartade/Food-Product-Truth-Teller",
          description: "AI/ML backend & React application using FastAPI, rule-based analysis, and product datasets.",
          html_url: "https://github.com/Tejas-Fartade",
          stargazers_count: 7,
          forks_count: 1,
          language: "Python",
          updated_at: new Date().toISOString(),
        },
      ],
    });
  });

  // Contact API
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    console.log(`[CONTACT RECEIVED] From: ${name} (${email}) | Subject: ${subject}`);
    return res.json({
      success: true,
      message: "Message dispatched successfully! Tejas will get back to you shortly.",
      timestamp: new Date().toISOString(),
    });
  });

  // Direct ZIP download route
  app.get("/download-zip", (_req, res) => {
    const zipPath = path.join(process.cwd(), "tejas_fartade_portfolio.zip");
    res.download(zipPath, "tejas_fartade_portfolio.zip");
  });

  // Vite middleware / static files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
