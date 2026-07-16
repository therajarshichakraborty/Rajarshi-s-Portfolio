"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Server,
  Database,
  Globe,
  Cpu,
  Terminal,
  Zap,
  Users,
  Code,
  GitPullRequest,
  Lock,
  Bot,
  Layers,
  RefreshCw,
  FolderSync
} from "lucide-react";

interface TimelineStep {
  title: string;
  annotation: string;
  details: string;
  icon: React.ReactNode;
  colorClass: string;
}

const PROJECT_TIMELINES: Record<string, TimelineStep[]> = {
  reviewray: [
    {
      title: "GitHub Webhooks Trigger",
      annotation: "Real-Time PR Actions",
      details:
        "Receives pull request payloads (open, synchronize, reopen) from GitHub repositories in real-time. Signatures are validated using HMAC SHA-256 headers.",
      icon: <GitPullRequest className="size-5" />,
      colorClass:
        "from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/20"
    },
    {
      title: "Next.js Route Handlers",
      annotation: "API Gateway & Better Auth Middleware",
      details:
        "Validates active subscription statuses using Razorpay metadata and processes session authorization keys with Better Auth cookie verification.",
      icon: <Server className="size-5" />,
      colorClass:
        "from-slate-500/10 to-zinc-500/10 text-foreground border-border"
    },
    {
      title: "Inngest Queue Worker",
      annotation: "Asynchronous Background Processing",
      details:
        "Orchestrates background step functions asynchronously. Manages high-throughput PR webhooks with automated retries, failure handling, and concurrency limits.",
      icon: <Zap className="size-5" />,
      colorClass:
        "from-amber-500/10 to-orange-500/10 text-amber-500 border-amber-500/20"
    },
    {
      title: "Pinecone RAG Vector Search",
      annotation: "Semantic Code Context Extraction",
      details:
        "Performs semantic queries against codebase chunks stored as embeddings in Pinecone, retrieving code snippets and repository structures relevant to the PR diff.",
      icon: <Database className="size-5" />,
      colorClass:
        "from-blue-500/10 to-indigo-500/10 text-blue-500 border-blue-500/20"
    },
    {
      title: "OpenRouter LLM Inference",
      annotation: "Line-by-Line Context Reviews",
      details:
        "Sends code context to OpenRouter APIs (Claude 3.5 Sonnet / Gemini 1.5 Pro) to analyze diff code logic, then submits precise line comments to the GitHub API via Octokit.",
      icon: <Cpu className="size-5" />,
      colorClass:
        "from-rose-500/10 to-pink-500/10 text-rose-500 border-rose-500/20"
    }
  ],
  "exeos-ai": [
    {
      title: "Clerk Authentication Gate",
      annotation: "Workspace & Role Scopes",
      details:
        "Shields server resources by validating Clerk session cookies, ensuring users only access their authorized workspace and tenant organization scopes.",
      icon: <Lock className="size-5" />,
      colorClass:
        "from-indigo-500/10 to-purple-500/10 text-indigo-500 border-indigo-500/20"
    },
    {
      title: "Next.js Server Actions",
      annotation: "Vercel AI SDK Router",
      details:
        "Routes client actions, manages react state, and streams model completions to the dashboard interface using Vercel's standard AI stream helpers.",
      icon: <Globe className="size-5" />,
      colorClass:
        "from-cyan-500/10 to-teal-500/10 text-cyan-500 border-cyan-500/20"
    },
    {
      title: "Inngest Task Queue",
      annotation: "Background Synchronization Crons",
      details:
        "Fires scheduled crons to sync email and calendar events, processes asynchronous database updates, and triggers real-time workspace alerts.",
      icon: <Zap className="size-5" />,
      colorClass:
        "from-orange-500/10 to-yellow-500/10 text-orange-500 border-orange-500/20"
    },
    {
      title: "OpenRouter Multi-LLM Orchestrator",
      annotation: "Inference Model Routing",
      details:
        "Selects and calls the best frontier models (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro) based on workspace prompts, request latency, and budget requirements.",
      icon: <Cpu className="size-5" />,
      colorClass:
        "from-rose-500/10 to-purple-500/10 text-rose-500 border-rose-500/20"
    },
    {
      title: "Drizzle ORM / PostgreSQL DB",
      annotation: "Relational Persistence Layer",
      details:
        "Performs low-latency transactional updates and relational queries on PostgreSQL schemas using Drizzle, fetching inbox messages, event schedules, and system logs.",
      icon: <Database className="size-5" />,
      colorClass:
        "from-blue-500/10 to-cyan-500/10 text-blue-500 border-blue-500/20"
    }
  ],
  "zenith-cli": [
    {
      title: "Bun CLI / Commander.js Core",
      annotation: "Terminal-First Developer Utility",
      details:
        "Accepts developer commands and arguments inside terminal shells. Bundles module trees using tsup/esbuild for minimal execution latency.",
      icon: <Terminal className="size-5" />,
      colorClass:
        "from-amber-500/10 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
    },
    {
      title: "OAuth Device Auth Portal",
      annotation: "Browser Authentication Validation",
      details:
        "Coordinates login states between the terminal and browser using the OAuth 2.0 Device Flow (RFC 8628) and Better Auth dashboard controls.",
      icon: <Lock className="size-5" />,
      colorClass:
        "from-blue-500/10 to-indigo-500/10 text-blue-500 border-blue-500/20"
    },
    {
      title: "Express.js API Gateway",
      annotation: "Central Command Server",
      details:
        "Processes REST queries, validates user authentication payloads, and fetches details from a PostgreSQL instance using type-safe Prisma schemas.",
      icon: <Server className="size-5" />,
      colorClass:
        "from-slate-500/10 to-zinc-500/10 text-foreground border-border"
    },
    {
      title: "Google Gemini API Integration",
      annotation: "Generative AI Automation Worker",
      details:
        "Leverages Gemini API models via the Vercel AI SDK to build folder structures, write template configurations, and stream generated code solutions to the terminal.",
      icon: <Bot className="size-5" />,
      colorClass:
        "from-purple-500/10 to-indigo-500/10 text-purple-500 border-purple-500/20"
    }
  ],
  "synapse-ui": [
    {
      title: "FumaDocs Portal",
      annotation: "Interactive Developer Documentation",
      details:
        "Hosts interactive MDX documentation pages, rendering live playground components where designers can manipulate props and see layouts in real-time.",
      icon: <Globe className="size-5" />,
      colorClass:
        "from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/20"
    },
    {
      title: "Component Registry JSON API",
      annotation: "Modular Code Content Distributor",
      details:
        "Compiles source code paths, Tailwind design tokens, and components catalog layouts into static JSON metadata hosted on Vercel CDN nodes.",
      icon: <Server className="size-5" />,
      colorClass:
        "from-slate-500/10 to-zinc-500/10 text-foreground border-border"
    },
    {
      title: "npx CLI Installer",
      annotation: "Automatic Code Dependency Inversion",
      details:
        "Resolves shadcn-compatible CLI requests to fetch component details from the JSON registry and injects them directly into developer file workspaces.",
      icon: <Terminal className="size-5" />,
      colorClass:
        "from-blue-500/10 to-indigo-500/10 text-blue-500 border-blue-500/20"
    }
  ],
  "socket-poll": [
    {
      title: "Presenter & Audience Clients",
      annotation: "Interactive Frontend Applications",
      details:
        "React + Vite user applications that render active vote sliders, poll charts, and session control panels using responsive Tailwind elements.",
      icon: <Users className="size-5" />,
      colorClass:
        "from-blue-500/10 to-indigo-500/10 text-blue-500 border-blue-500/20"
    },
    {
      title: "ws WebSocket Connection Core",
      annotation: "Bi-Directional Messaging Pipeline",
      details:
        "Creates persistent, bi-directional sockets between user views and the backend to broadcast and update live poll stats in milliseconds.",
      icon: <RefreshCw className="size-5" />,
      colorClass:
        "from-rose-500/10 to-orange-500/10 text-rose-500 border-rose-500/20"
    },
    {
      title: "Express HTTP Router",
      annotation: "Authentication & Administration Gate",
      details:
        "Validates host dashboard credentials, initializes active poll sessions, and exposes REST endpoints for dashboard controls.",
      icon: <Server className="size-5" />,
      colorClass:
        "from-slate-500/10 to-zinc-500/10 text-foreground border-border"
    },
    {
      title: "Drizzle ORM & PostgreSQL Store",
      annotation: "Transactional Persistence Layout",
      details:
        "Validates user ip hashes, registers vote transactions, and saves aggregate tallies onto Postgres schemas utilizing Drizzle.",
      icon: <Database className="size-5" />,
      colorClass:
        "from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/20"
    }
  ],
  "linked-up": [
    {
      title: "Streamlit Dashboard",
      annotation: "User Parameters Controller",
      details:
        "Renders parameter settings (tone, industry, keywords, topic, length) for generating LinkedIn posts using Streamlit elements.",
      icon: <Globe className="size-5" />,
      colorClass:
        "from-blue-500/10 to-indigo-500/10 text-blue-500 border-blue-500/20"
    },
    {
      title: "LangChain Pipeline Orchestration",
      annotation: "Prompt Template & Context Manager",
      details:
        "Loads preconfigured prompt files, compiles user context inputs, and handles call chains to orchestrate instructions to LLMs.",
      icon: <Layers className="size-5" />,
      colorClass:
        "from-purple-500/10 to-pink-500/10 text-purple-500 border-purple-500/20"
    },
    {
      title: "Groq LLM API",
      annotation: "High-Speed Inference Engine",
      details:
        "Queries Groq's high-speed API endpoints to get structured text responses in milliseconds.",
      icon: <Cpu className="size-5" />,
      colorClass:
        "from-amber-500/10 to-orange-500/10 text-amber-500 border-amber-500/20"
    },
    {
      title: "Pydantic Schema Parser",
      annotation: "Structured JSON Output Parser",
      details:
        "Enforces type structures on generated text output (e.g. hashtags, key hooks, content blocks) before rendering details to users.",
      icon: <Code className="size-5" />,
      colorClass:
        "from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/20"
    }
  ],
  "mini-tailwindcss": [
    {
      title: "HTML / DOM Nodes Scan",
      annotation: "Client-Side Token Extraction",
      details:
        "Parses DOM layouts at runtime, scanning class lists for active Tailwind CSS style configurations.",
      icon: <Code className="size-5" />,
      colorClass:
        "from-blue-500/10 to-indigo-500/10 text-blue-500 border-blue-500/20"
    },
    {
      title: "JS RegEx Parser Engine",
      annotation: "Token Component Extractor",
      details:
        "Tokenizes string classes into parts, identifying responsive tags, utility modifiers, values, and selector parameters at runtime.",
      icon: <Cpu className="size-5" />,
      colorClass:
        "from-purple-500/10 to-pink-500/10 text-purple-500 border-purple-500/20"
    },
    {
      title: "Class Map Registry",
      annotation: "Standardized Property Compiler",
      details:
        "Compares style tokens against lookup configurations to compile standard CSS style sheets dynamically.",
      icon: <Layers className="size-5" />,
      colorClass:
        "from-amber-500/10 to-orange-500/10 text-amber-500 border-amber-500/20"
    },
    {
      title: "Style Tag Injector",
      annotation: "Dynamic Browser CSSOM Injection",
      details:
        "Appends generated styling rules into a dedicated runtime stylesheet in the browser document head, painting components instantly.",
      icon: <FolderSync className="size-5" />,
      colorClass:
        "from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/20"
    }
  ]
};

export function ProjectArchitectureDiagram({
  projectId
}: {
  projectId: string;
}) {
  const steps = PROJECT_TIMELINES[projectId];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!steps) return null;

  return (
    <div className="w-full flex flex-col gap-y-4 rounded-2xl border border-border/40 bg-card/20 p-5 sm:p-6 backdrop-blur-xs relative overflow-hidden">
      {/* Background visual indicators */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 rounded-full bg-primary/2 opacity-[0.03] blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col gap-y-1">
        <h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          System Pipeline Flow
        </h5>
        <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4">
          Visualizing the step-by-step lifecycle of request payloads and data
          pathways.
        </p>
      </div>

      {/* Vertical Timeline container */}
      <div className="relative pl-3 sm:pl-4">
        {/* Continuous dashed line background */}
        <div className="absolute left-[31px] sm:left-[35px] top-6 bottom-6 w-[2px] border-l border-dashed border-border/60 dark:border-border/40 pointer-events-none" />

        <div className="flex flex-col gap-y-6">
          {steps.map((step, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex items-start gap-4 sm:gap-6 relative transition-all duration-300"
              >
                {/* Number bullet and vertical line indicator */}
                <div
                  className={`flex size-10 items-center justify-center rounded-full border bg-card relative z-10 shrink-0 shadow-xs transition-all duration-300 ${
                    isHovered
                      ? "border-primary scale-110 shadow-md shadow-primary/10"
                      : "border-border/60 group-hover:border-border"
                  }`}
                >
                  <span className="text-[10px] font-bold font-mono text-muted-foreground/80">
                    {idx + 1}
                  </span>
                </div>

                {/* Node details card */}
                <div
                  className={`flex-1 flex flex-col gap-y-1.5 rounded-xl border p-4 transition-all duration-300 ${
                    isHovered
                      ? "border-primary/50 bg-primary/2 dark:bg-primary/5 shadow-xs"
                      : "border-border/40 bg-muted/5 hover:border-border/80"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`p-1.5 rounded-md border bg-gradient-to-br ${step.colorClass}`}
                      >
                        {step.icon}
                      </span>
                      <h6 className="text-sm font-bold text-foreground leading-tight">
                        {step.title}
                      </h6>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-primary/80 bg-primary/5 dark:bg-primary/10 px-2 py-0.5 rounded-sm w-fit">
                      {step.annotation}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {step.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
