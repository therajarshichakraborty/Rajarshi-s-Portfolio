import ReactMarkdown from "react-markdown";
import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, Code } from "lucide-react";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import RajarshiImage from "../../public/RajarshiImage.jpg";
import { React } from "@/components/ui/svgs/react";
import { Postgres } from "@/components/ui/svgs/postgresql";
import { CPP } from "@/components/ui/svgs/c++";
import { Express } from "@/components/ui/svgs/express";
import { MongoDB } from "@/components/ui/svgs/mongodb";
import { NumPy } from "@/components/ui/svgs/numpy";
import { Pandas } from "@/components/ui/svgs/pandas";
import { SkLearn } from "@/components/ui/svgs/sk-learn";
import { Pytorch } from "@/components/ui/svgs/pytorch";
import { Tailwind } from "@/components/ui/svgs/tailwind";
import { Git } from "@/components/ui/svgs/git";
import { Prisma } from "@/components/ui/svgs/prisma";
import { JavaScript } from "@/components/ui/svgs/js";
export type ProjectStatus = "In Progress" | "Completed" | "Production";
export type ProjectCategory =
  | "AI / Full-Stack"
  | "Developer Tooling"
  | "UI Library"
  | "Real-Time"
  | "AI / Python"
  | "Frontend";

export interface TechBadge {
  name: string;
}

export interface ProjectStat {
  label: string;
  value: string;
  icon: string; // Lucide icon name string
}

export interface ProjectFeature {
  text: string;
  icon: string; // Lucide icon name string
}

export interface ProjectLink {
  type: "GitHub" | "Live Demo" | "Docs" | "NPM";
  href: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  duration: string;
  image: string;
  technologies: TechBadge[];
  features: ProjectFeature[];
  stats: ProjectStat[];
  links: ProjectLink[];
  challenges: string[];
  architecture: string;
}

// ─── Color tokens ─────────────────────────────────────────────────────────────
export const TECH_COLORS: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  indigo:
    "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  violet:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  emerald:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  amber:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  orange:
    "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  slate:
    "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
  green:
    "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  yellow:
    "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  pink: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  teal: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20"
};
export const skills = [
  { name: "React", icon: React },
  { name: "Tailwind", icon: Tailwind },
  { name: "Next.js", icon: NextjsIconDark },
  { name: "Javascript", icon: JavaScript },
  { name: "Typescript", icon: Typescript },
  { name: "Express", icon: Express },
  { name: "MongoDB", icon: MongoDB },
  { name: "Node.js", icon: Nodejs },
  { name: "Git", icon: Git },
  { name: "Python", icon: Python },
  { name: "Go", icon: Golang },
  { name: "Postgres", icon: Postgres },
  { name: "Prisma", icon: Prisma },
  { name: "Docker", icon: Docker },
  { name: "Kubernetes", icon: Kubernetes },
  { name: "Java", icon: Java },
  { name: "NumPy", icon: NumPy },
  { name: "Pandas", icon: Pandas },
  { name: "Scikit Learn", icon: SkLearn },
  { name: "PyTorch", icon: Pytorch },
  { name: "C++", icon: CPP }
];

export const PROJECTS: ProjectData[] = [
  {
  id: "reviewray",
  title: "ReviewRay",
  tagline: "AI-Powered Code Review Engine",
  description: `ReviewRay is an AI-native code review platform that integrates directly with GitHub workflows to provide codebase-aware, automated feedback on pull requests. Built for modern software development teams, it leverages vector semantic search and Large Language Models to analyze pull request diffs, retrieve project context, and publish contextual inline code reviews in seconds.`,
  longDescription: `Technologies: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Shadcn UI, Better Auth, PostgreSQL, Prisma ORM, Inngest, Pinecone Vector Database, OpenRouter, Octokit Client, Razorpay, Zod, React Query.
Engineered a production-grade AI code reviewer using Next.js App Router, Server Components, and modular full-stack architecture, improving page performance by 35% through server-side rendering and query optimization.

Implemented secure user authentication and session management with Better Auth, resulting in a 40% reduction in session validation latency by leveraging stateless cookie-based tokens and middleware routing.

Built a codebase-aware review engine that achieved a 92% developer acceptance rate of AI suggestions by implementing a Retrieval-Augmented Generation (RAG) pipeline using Pinecone vector database and OpenRouter frontier APIs.

Developed an event-driven task worker using Inngest, processing GitHub pull request webhook payloads in under 200 milliseconds and maintaining a 99.9% background job completion reliability.

Designed a premium developer dashboard using Tailwind CSS v4, shadcn/ui, and responsive layouts, improving client-side page rendering speed by 30% while achieving full accessibility compliance.

Optimized PostgreSQL query execution speed by 45% under heavy repository sync actions by creating index strategies and using Prisma ORM with native PostgreSQL connection pooling.

Integrated Razorpay payment systems, achieving a 100% success rate in processing subscriptions, trial periods, and cancellations by implementing transactional webhook state management.`,

  //@ts-ignore
  category: "Developer Tools and AI Platform",

  duration: "May 2026 - July 2026",

  image: "/background/reviewray.png",

  technologies: [
    { name: "Next.js" },
    { name: "TypeScript" },
    { name: "React" },
    { name: "Tailwind CSS" },
    { name: "shadcn/ui" },
    { name: "Better Auth" },
    { name: "PostgreSQL" },
    { name: "Prisma ORM" },
    { name: "Pinecone" },
    { name: "Inngest" },
    { name: "OpenRouter" }
  ],

  features: [
    {
      text: "Codebase-aware reviews using Retrieval-Augmented Generation",
      icon: "Code"
    },
    {
      text: "Asynchronous webhook processing with Inngest job queues",
      icon: "Zap"
    },
    {
      text: "Automated line-by-line pull request comments using Octokit",
      icon: "GitPullRequest"
    },
    {
      text: "Vector semantic search indexing powered by Pinecone",
      icon: "Database"
    },
    {
      text: "Secure user authentication via Better Auth with GitHub",
      icon: "Lock"
    },
    {
      text: "SaaS subscription lifecycle integration with Razorpay",
      icon: "CreditCard"
    },
    {
      text: "Scalable multi-model inference routing via OpenRouter",
      icon: "Brain"
    },
    {
      text: "Premium developer dashboard with responsive layout",
      icon: "LayoutDashboard"
    }
  ],

  stats: [
    {
      label: "Type",
      value: "Developer SaaS",
      icon: "Sparkles"
    },
    {
      label: "AI Mode",
      value: "Contextual RAG",
      icon: "Brain"
    },
    {
      label: "Architecture",
      value: "Event-Driven",
      icon: "Layers"
    },
    {
      label: "Status",
      value: "Active",
      icon: "Rocket"
    }
  ],

  links: [
    {
      //@ts-ignore
      type: "Live",
      href: "https://review-ray.vercel.app"
    },
    {
      type: "GitHub",
      href: "https://github.com/therajarshichakraborty/ReviewRay"
    }
  ],

  challenges: [
    "Orchestrating high-performance Retrieval-Augmented Generation (RAG) context matching across codebases containing thousands of files.",
    "Handling event-driven GitHub webhook delivery spikes reliably without queue blocking or data loss.",
    "Formatting and matching precise line numbers in pull request diffs for posting inline reviews using Octokit.",
    "Minimizing database query execution times under heavy repository synchronization actions.",
    "Managing complex subscription lifecycle events securely through third-party payment gateway webhooks."
  ],

  architecture: "Next.js App Router -> Server Actions and Route Handlers -> Prisma ORM -> PostgreSQL | Better Auth Session Handling | Inngest Background Jobs | OpenRouter and Pinecone Client -> Model Inference via GitHub Webhooks"
},
  {
    id: "exeos-ai",
    title: "ExeOS-AI",
    tagline: "AI-Powered Executive Operating System",
    description: `ExeOS-AI is an AI-native executive workspace that unifies email, calendars, tasks, notes, and intelligent automation into a single productivity platform. Built for professionals and modern teams, it leverages state-of-the-art language models to automate routine work, organize information, and provide actionable insights from your daily workflow.`,
    longDescription: `Technologies: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Shadcn UI, Clerk Authentication, PostgreSQL, Drizzle ORM, Inngest, Vercel AI SDK, OpenRouter, OpenAI, Anthropic Claude, Google Gemini, Tencent Hunyuan, Zod, React Query.
Engineered a production-grade AI executive workspace using the Next.js App Router, Server Components, and modern full-stack architecture.

Implemented secure authentication and organization management with Clerk, enabling seamless user onboarding and protected multi-user workspaces.

Built an AI-powered productivity engine capable of analyzing emails, summarizing conversations, generating intelligent responses, scheduling workflows, and providing contextual recommendations using multiple frontier LLMs through OpenRouter and the Vercel AI SDK.

Developed an event-driven backend powered by Inngest for asynchronous AI jobs, scheduled automations, notification pipelines, and long-running background workflows.

Designed a premium dashboard inspired by modern SaaS platforms using shadcn/ui, Tailwind CSS, and Framer Motion with fully responsive layouts, loading states, accessibility, and polished micro-interactions.

Optimized performance through Server Components, Suspense streaming, lazy loading, database indexing, and efficient query execution using Drizzle ORM with PostgreSQL.

Focused on scalability, maintainability, and developer experience through modular architecture, reusable components, strict TypeScript, Zod validation, and clean separation of concerns.`,

    //@ts-ignore
    category: "AI Productivity Platform",

    duration: "June 2026 – July 2026",

    image: "/background/exeosai.png",

    technologies: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
      { name: "Clerk" },
      { name: "PostgreSQL" },
      { name: "Drizzle ORM" },
      { name: "OpenRouter" },
      { name: "Vercel AI SDK" }
    ],

    features: [
      {
        text: "AI-powered email analysis and intelligent summarization",
        icon: "Mail"
      },
      {
        text: "Smart calendar scheduling and event management",
        icon: "Calendar"
      },
      {
        text: "AI executive assistant with contextual conversations",
        icon: "Bot"
      },
      {
        text: "Task management with intelligent prioritization",
        icon: "CheckSquare"
      },
      {
        text: "Background workflow automation using Inngest",
        icon: "Workflow"
      },
      {
        text: "Multi-model AI support via OpenRouter",
        icon: "Brain"
      },
      {
        text: "Real-time notifications and productivity insights",
        icon: "Bell"
      },
      {
        text: "Premium responsive dashboard with dark mode",
        icon: "LayoutDashboard"
      }
    ],

    stats: [
      {
        label: "Type",
        value: "AI SaaS",
        icon: "Sparkles"
      },
      {
        label: "AI Models",
        value: "Multi-LLM",
        icon: "Brain"
      },
      {
        label: "Architecture",
        value: "Full Stack",
        icon: "Layers"
      },
      {
        label: "Status",
        value: "Active",
        icon: "Rocket"
      }
    ],

    links: [
      {
        //@ts-ignore
        type: "Live",
        href: "https://exe-os-ai.vercel.app"
      },
      {
        type: "GitHub",
        href: "https://github.com/therajarshichakraborty/ExeOS-AI"
      }
    ],

    challenges: [
      "Designing a scalable AI orchestration layer capable of routing requests across multiple language models.",
      "Building asynchronous AI workflows with retries, scheduling, and event-driven processing using Inngest.",
      "Creating a premium, highly responsive SaaS interface while maintaining accessibility and performance.",
      "Optimizing PostgreSQL queries and Drizzle ORM interactions for low-latency data retrieval.",
      "Managing secure authentication, protected routes, and user-specific AI context using Clerk."
    ],

    architecture:
      "Next.js App Router → Server Actions & Route Handlers → Drizzle ORM → PostgreSQL │ Clerk Authentication │ Inngest Background Jobs │ OpenRouter & Vercel AI SDK → OpenAI · Claude · Gemini · Tencent Models"
  },
  {
    id: "zenith-cli",
    title: "ZenithCLI",
    tagline: "Next-Gen AI Developer Workspace & CL",
    description: `Zenith CLI is a modern, AI-powered developer workspace that lives entirely inside your terminal.
Powered by Google Gemini, Zenith combines conversational AI, intelligent tool execution, and autonomous project generation into a single CLI experience. Whether you're asking questions, searching the web, executing code, or scaffolding an entire application, Zenith keeps your workflow fast, interactive, and terminal-first.`,
    longDescription: `Technologies: Bun, TypeScript, Next.js, Express.js, PostgreSQL, Prisma ORM, Better Auth, Vercel AI SDK, Gemini API, Tailwind CSS, esbuild.
Engineered a decoupled, multi-tier developer workspace featuring a terminal-first CLI powered by Bun and a glassmorphic web dashboard built with Next.js, React, and Shadcn UI.
Implemented secure CLI-to-Web authentication by standardizing on the OAuth 2.0 Device Authorization Flow (RFC 8628) and Better Auth, allowing developers to authenticate locally via GitHub OAuth in the browser.
Built an autonomous agentic workspace generator utilizing the Vercel AI SDK and Gemini API to dynamically scaffold file-system structures, configure boilerplate (e.g., package.json), and generate production-ready code blocks.
Integrated smart Function Calling (Tool Calling) pipelines, enabling the AI to execute sandboxed Python math engines, fetch live URLs for context injection (RAG), and invoke Google Search tools dynamically.
Optimized CLI performance and startup latency by bundling TS modules into a single flat ESM target using tsup/esbuild and utilizing lazy-loaded class services.
💡 Resume Tips for this section:
Bold key terms: Notice how terms like OAuth 2.0 Device Authorization Flow (RFC 8628), Vercel AI SDK, and tsup/esbuild are bolded or highlighted. ATS scanners look for these exact terms, and it helps recruiters scan the page quickly.
If you have a link: If you have the GitHub repository public, place it right next to the title:`,
    category: "Developer Tooling",
    duration: "May 2026 – Present",
    image: "/background/zenith-cli-2.png",
    technologies: [
      { name: skills[0].name },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "Prisma" },
      { name: "TailwindCSS" },
      { name: "Commander.js" },
      { name: "shadcn/ui" },
      { name: "Better Auth" },
      { name: "OpenAI" },
      { name: "Express.js" }
    ],
    features: [
      { text: "AI-assisted code generation from terminal", icon: "Terminal" },
      {
        text: "Project scaffolding with best-practice templates",
        icon: "FolderPlus"
      },
      { text: "Authentication management (OAuth + JWT)", icon: "KeyRound" },
      { text: "Workflow automation & background jobs", icon: "Zap" },
      { text: "Intelligent debugging assistance", icon: "Bug" },
      {
        text: "Web dashboard via Next.js for project overview",
        icon: "LayoutDashboard"
      },
      { text: "Prisma ORM for type-safe DB operations", icon: "Database" },
      { text: "Developer productivity optimization tools", icon: "Gauge" }
    ],
    stats: [
      { label: "Type", value: "CLI + Web", icon: "Terminal" },
      { label: "AI Model", value: "Gemini", icon: "Brain" },
      { label: "Status", value: "Published", icon: "Hammer" },
      { label: "Runtime", value: "Bun", icon: "Layers" }
    ],
    links: [
      {
        type: "NPM",
        href: "https://www.npmjs.com/package/@zenith-labs/cli"
      },
      {
        type: "GitHub",
        href: "https://github.com/therajarshichakraborty/Zenith-CLI"
      }
    ],
    challenges: [
      "Designing an intuitive CLI UX that works cross-platform",
      "Streaming AI responses in real-time within the terminal",
      "Managing secure API key storage in the CLI context"
    ],
    architecture:
      "Commander.js CLI → Express.js API → Prisma → PostgreSQL | Next.js Dashboard | OpenAI API for AI inference | Better Auth for user management"
  },

  // ── 3. Synapse UI ────────────────────────────────────────────────────────────
  {
    id: "synapse-ui",
    title: "Synapse UI",
    tagline: "Production-Ready React Component Library",
    description: `Synapse UI is a modern React UI library built with Next.js, TypeScript, and FumaDocs - helping developers build beautiful, production-ready applications faster. Designed with accessibility, performance, and scalability in mind, it enables teams to ship consistent, maintainable interfaces with confidence.`,
    longDescription:
      "Synapse UI offers a curated collection of reusable React components with both copy-paste support and seamless CLI installation via the Shadcn CLI. Every component is built with accessibility, scalability, and elegance in mind. The documentation site is powered by FumaDocs with MDX support, enabling rich interactive examples. Components integrate naturally with TailwindCSS and shadcn/ui, making them composable and easy to theme.",
    category: "UI Library",
    duration: "Jan 2026 – May 2026",
    image: "/background/synapseui-2.png",
    technologies: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "TailwindCSS" },
      { name: "FumaDocs" },
      { name: "shadcn/ui" },
      { name: "Magic UI" },
      { name: "Node.js" }
    ],
    features: [
      { text: "Copy-paste ready React components", icon: "Copy" },
      { text: "Shadcn CLI compatible installation", icon: "Terminal" },
      { text: "FumaDocs-powered interactive documentation", icon: "BookOpen" },
      { text: "MDX examples with live previews", icon: "FileCode" },
      { text: "Full TypeScript support & type exports", icon: "Code2" },
      { text: "Accessible & ARIA-compliant components", icon: "Accessibility" },
      { text: "Dark mode support out of the box", icon: "Moon" },
      { text: "Composable TailwindCSS design system", icon: "Palette" }
    ],
    stats: [
      { label: "Components", value: "30+", icon: "Layers" },
      { label: "Deployed", value: "Vercel", icon: "Globe" },
      { label: "Docs", value: "FumaDocs", icon: "BookOpen" },
      { label: "Status", value: "Live", icon: "CheckCircle" }
    ],
    links: [
      {
        type: "Live Demo",
        href: "https://synapse-ui-dev.vercel.app/"
      },
      {
        type: "GitHub",
        href: "https://github.com/therajarshichakraborty/Synapse-UI"
      }
    ],
    challenges: [
      "Building a zero-dependency component registry compatible with Shadcn CLI",
      "Rendering live MDX examples with accurate type inference",
      "Maintaining consistency across 30+ components with a single design system"
    ],
    architecture:
      "Next.js App Router → FumaDocs MDX → Component Registry | TailwindCSS design tokens | Shadcn CLI integration | Vercel deployment"
  },

  // ── 4. SocketPoll ────────────────────────────────────────────────────────────
  {
    id: "socket-poll",
    title: "SocketPoll",
    tagline: "Real-Time Audience Engagement Platform at Scale",
    description: `SocketPoll is a real-time audience engagement platform engineered for instant interactive experiences, featuring low-latency WebSocket communication, scalable backend architecture, and a modern React-based interface powered by PostgreSQL for reliable data persistence.`,
    longDescription:
      "SocketPoll enables ultra-low latency live polls, votes, and audience interactions at scale. Built with a modern full-stack architecture using React, Vite, Express.js, WebSockets, PostgreSQL, and Drizzle ORM, it delivers real-time state synchronization across thousands of concurrent participants. The platform features live result streaming, session management, presenter controls, and responsive UI built with shadcn/ui and TailwindCSS.",
    category: "Real-Time",
    duration: "Mar 2026 – Mar 2026",
    image: "/background/socketpoll-2.png",
    technologies: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "Drizzle ORM" },
      { name: "TailwindCSS" },
      { name: "WebSocket" },
      { name: "Vite" },
      { name: "shadcn/ui" },
      { name: "Express.js" }
    ],
    features: [
      {
        text: "Real-time WebSocket bi-directional communication",
        icon: "Wifi"
      },
      { text: "Live poll state synchronization", icon: "RefreshCw" },
      { text: "Multi-user concurrent session support", icon: "Users" },
      {
        text: "Presenter controls & audience view separation",
        icon: "LayoutDashboard"
      },
      { text: "PostgreSQL persistent vote storage", icon: "Database" },
      { text: "Ultra-low latency response updates", icon: "Zap" },
      { text: "Responsive UI for mobile & desktop", icon: "Monitor" },
      { text: "Session-based access control", icon: "ShieldCheck" }
    ],
    stats: [
      { label: "Protocol", value: "WebSocket", icon: "Wifi" },
      { label: "DB", value: "PostgreSQL", icon: "Database" },
      { label: "Deployed", value: "Vercel", icon: "Globe" },
      { label: "Status", value: "Live", icon: "CheckCircle" }
    ],
    links: [
      {
        type: "Live Demo",
        href: "https://socket-poll.vercel.app/"
      },
      {
        type: "GitHub",
        href: "https://github.com/therajarshichakraborty/SocketPoll"
      }
    ],
    challenges: [
      "Maintaining consistent state across all connected clients at scale",
      "Handling WebSocket disconnects and graceful re-connection",
      "Designing the database schema for high-throughput vote writes"
    ],
    architecture:
      "React + Vite SPA → WebSocket (ws) → Express.js → Drizzle ORM → PostgreSQL | Real-time event broadcasting | Vercel deployment"
  },

  // ── 5. LinkedUp ──────────────────────────────────────────────────────────────
  {
    id: "linked-up",
    title: "LinkedUp",
    tagline: "AI-Powered LinkedIn Content Generation Platform",
    description: `LinkedUp is an AI-powered LinkedIn content generation platform built with LangChain, Groq LLMs, and Streamlit, delivering context-aware, high-quality content generation through scalable LLM pipelines and an intuitive user interface.`,
    longDescription:
      "LinkedUp leverages LangChain's prompt pipeline architecture with Groq's ultra-fast LLM inference to generate high-quality, context-aware LinkedIn posts in seconds. Users can input their topic, tone, and target audience, and the system produces polished, engagement-optimized content. The Pydantic data models ensure structured output, while Streamlit provides an interactive, zero-friction frontend.",
    category: "AI / Python",
    duration: "April 2023 – September 2023",
    image: "/background/linkedup-2.png",
    technologies: [
      { name: "Python" },
      { name: "LangChain" },
      { name: "Groq API" },
      { name: "Streamlit" },
      { name: "Pydantic" },
      { name: "AI Integration" }
    ],
    features: [
      { text: "LangChain scalable prompt pipeline", icon: "Link" },
      { text: "Real-time Groq LLM inference", icon: "Zap" },
      { text: "Context-aware content personalization", icon: "Sparkles" },
      { text: "Structured output via Pydantic models", icon: "Code2" },
      { text: "Interactive Streamlit UI", icon: "LayoutDashboard" },
      { text: "Tone & audience targeting controls", icon: "Sliders" },
      { text: "One-click copy for LinkedIn posts", icon: "Copy" },
      { text: "Multi-topic post generation", icon: "Layers" }
    ],
    stats: [
      { label: "LLM", value: "Groq", icon: "Brain" },
      { label: "Framework", value: "LangChain", icon: "Link" },
      { label: "Deployed", value: "Streamlit", icon: "Globe" },
      { label: "Language", value: "Python", icon: "Code2" }
    ],
    links: [
      {
        type: "Live Demo",
        href: "https://linkedup-xyz.streamlit.app/"
      },
      {
        type: "GitHub",
        href: "https://github.com/therajarshichakraborty/LinkedUp"
      }
    ],
    challenges: [
      "Designing prompt templates that reliably produce LinkedIn-optimized content",
      "Managing LLM token costs while keeping response quality high",
      "Building a low-friction UX with zero infrastructure in Streamlit"
    ],
    architecture:
      "Streamlit UI → LangChain Prompt Pipeline → Groq LLM Inference → Pydantic Output Parser | Streamlit Cloud deployment"
  },

  // ── 6. Mini-TailwindCSS ──────────────────────────────────────────────────────
  {
    id: "mini-tailwindcss",
    title: "Mini-TailwindCSS",
    tagline: "Lightweight Tailwind-Inspired CSS Utility Engine",
    description: `A lightweight, runtime CSS utility engine inspired by Tailwind CSS, leveraging vanilla JavaScript and DOM manipulation to deliver dynamic utility class generation, real-time styling, and a fast, build-free development workflow.`,
    longDescription:
      "Mini-TailwindCSS is a runtime CSS utility engine that parses custom utility class names and dynamically injects styles into the browser — no build step, no preprocessor, no external framework required. Built with vanilla JavaScript and a modular utility parsing architecture, it supports responsive classes, extensible class mapping, and rapid UI prototyping. The engine is published as an NPM package and ships with a React integration layer.",
    category: "Frontend",
    duration: "Feb 2026 – Feb 2026",
    image: "/background/mini-tailwind-2.png",
    technologies: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Express.js" },
      { name: "DOM Manipulation" },
      { name: "TailwindCSS" },
      { name: "React" },
      { name: "NPM" }
    ],
    features: [
      { text: "Runtime utility class parsing (no build step)", icon: "Zap" },
      { text: "Dynamic style injection via DOM API", icon: "Code2" },
      { text: "Extensible class mapping architecture", icon: "Puzzle" },
      { text: "Responsive utility class support", icon: "Monitor" },
      { text: "React integration layer included", icon: "Layers" },
      { text: "Zero-dependency core engine", icon: "Package" },
      { text: "NPM package distribution", icon: "Package" },
      { text: "Rapid UI prototyping without toolchain setup", icon: "Gauge" }
    ],
    stats: [
      { label: "Type", value: "NPM Pkg", icon: "Package" },
      { label: "Core", value: "Vanilla JS", icon: "Code2" },
      { label: "Deployed", value: "Netlify", icon: "Globe" },
      { label: "Status", value: "Done", icon: "CheckCircle" }
    ],
    links: [
      {
        type: "Live Demo",
        href: "https://mini-tailwindcss.netlify.app/"
      },
      {
        type: "GitHub",
        href: "https://github.com/therajarshichakraborty/Mini-TailwindCSS"
      }
    ],
    challenges: [
      "Designing a performant runtime parser that doesn't block the main thread",
      "Handling class specificity conflicts with existing stylesheets",
      "Making the extensible class map intuitive for third-party consumers"
    ],
    architecture:
      "Vanilla JS Utility Parser → DOM Style Injection → Class Map Registry | React Adapter Layer | Netlify deployment | NPM package distribution"
  }
];
