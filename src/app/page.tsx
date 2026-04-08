"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  RotateCcw,
  TerminalSquare,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { experience } from "../data/experience";
import { featuredProject, projects } from "../data/projects";
import { skillGroups } from "../data/skills";

const LINKS = {
  github: "https://github.com/Ahmadsmnaser",
  linkedin: "https://www.linkedin.com/in/ahmadsmnaser",
  email: "Ahmadsmnaser@gmail.com",
  resumePdf: "/Ahmad_Resume_LowLevel.pdf",
};

type TerminalEntry = {
  kind: "note" | "cmd" | "out" | "success" | "metric" | "status";
  text: string;
};

type TerminalScriptStep =
  | {
      type: "pause";
      duration: number;
    }
  | {
      type: "line";
      kind: Exclude<TerminalEntry["kind"], "cmd">;
      text: string;
      delayAfter?: number;
    }
  | {
      type: "command";
      text: string;
      delayAfter?: number;
    };

const NAV_LINKS = [
  { href: "#featured",    label: "SchedScope" },
  { href: "#projects",    label: "Projects"   },
  { href: "#experience",  label: "Experience" },
  { href: "#skills",      label: "Skills"     },
  { href: "#contact",     label: "Contact"    },
] as const;

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, [ids]);

  return active;
}

export default function Home() {
  const [toast, setToast] = useState<string | null>(null);
  const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
  const activeSection = useActiveSection(sectionIds);

  return (
    <main className="min-h-screen bg-transparent text-zinc-100">
      <ScrollProgressBar />
      <BackgroundFX />

      <header className="sticky top-0 z-30 border-b border-white/8 bg-zinc-950/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-sm">
              ⚙️
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight">Ahmad Naser</p>
              <p className="text-xs text-zinc-400">Systems & Low-Level Software Engineer</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  className={`relative transition ${isActive ? "text-white" : "hover:text-white"}`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-[18px] left-1/2 h-[2px] w-full -translate-x-1/2 rounded-full bg-emerald-400" />
                  )}
                </a>
              );
            })}
          </nav>

          <a
            href="#projects"
            className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-400/15"
          >
            View Projects
          </a>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-6xl px-5 pb-14 pt-14 md:pt-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-emerald-200">
              ⚡ Kernel • Memory • Scheduling • Syscalls
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              <span className="bg-gradient-to-br from-white via-zinc-100 to-emerald-200 bg-clip-text text-transparent">
                Systems & Low-Level
              </span>
              <br />
              <span className="bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Software Engineer
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
              I modify kernel schedulers, build memory allocators from scratch, and trace system calls to understand what the OS is actually doing.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <AButton href="#projects" solid icon={<ArrowRight size={18} />}>
                View Projects 🚀
              </AButton>
              <AButton href={LINKS.github} newTab icon={<Github size={18} />}>
                GitHub 🛠️
              </AButton>
              <AButton href={LINKS.linkedin} newTab icon={<Linkedin size={18} />}>
                LinkedIn 🔗
              </AButton>
              <AButton href={LINKS.resumePdf} newTab icon={<FileText size={18} />}>
                Resume 📄
              </AButton>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <SignalCard
                title="Kernel-Facing Work ⚙️"
                desc="Linux scheduling, xv6 internals, and task-level reasoning."
              />
              <SignalCard
                title="Memory Mindset 🧠"
                desc="Allocator behavior, fragmentation, free lists, and ownership invariants."
              />
              <SignalCard
                title="Debugging Style 🔍"
                desc="Reproduce first, inspect real execution paths, then simplify the fix."
              />
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            className="rounded-[28px] border border-white/10 bg-white/6 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Why this site exists</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50">
              The goal is simple: make the systems work visible.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              The strongest signal I want to send is not that I can build software in general. It is that I enjoy understanding how software behaves under the hood and changing that behavior carefully.
            </p>

            <div className="mt-6 space-y-3">
              <InfoRow
                label="Current focus ⚡"
                value="Schedulers, allocators, tracing, debugging"
              />
              <InfoRow
                label="Best fit roles 🎯"
                value="Systems, infrastructure, kernel-adjacent, performance"
              />
              <InfoRow
                label="What I optimize for ✅"
                value="Clear invariants, measurable behavior, reliable fixes"
              />
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-6xl px-5 py-14">
        <SectionTitle
          eyebrow="Featured Project ⚙️"
          title="SchedScope gets the first look for a reason."
          subtitle="This is the clearest proof of the systems direction: modifying Linux scheduling behavior, rebuilding the kernel, and validating the change in a controlled environment."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mt-8 grid gap-6 rounded-[32px] border border-emerald-400/18 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(255,255,255,0.03))] p-7 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-200">
                ⚙️ {featuredProject.subtitle}
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-50">
              {featuredProject.title}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-200">
              {featuredProject.summary}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {featuredProject.points.map((point) => (
                <div
                  key={point.label}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
                    {point.label}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-200">{point.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {featuredProject.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/25 p-5">
            {/* File header bar */}
            <div className="flex items-center gap-2 rounded-t-xl border-b border-white/8 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 font-mono text-xs text-zinc-500">kernel/sched/fair.c</span>
            </div>

            {/* Diff stat */}
            <p className="mt-3 font-mono text-[11px] text-zinc-500">
              @@ -847,7 +847,9 @@ static void update_curr(struct cfs_rq *cfs_rq)
            </p>

            {/* Syntax-highlighted diff */}
            <div className="mt-2 space-y-[2px] overflow-x-auto font-mono text-[12.5px] leading-6">
              <DiffLine kind="ctx"  text="  struct sched_entity *curr = cfs_rq->curr;" />
              <DiffLine kind="ctx"  text="  u64 now = rq_clock_task(rq_of(cfs_rq));" />
              <DiffLine kind="ctx"  text="  u64 delta_exec;" />
              <DiffLine kind="blank" text="" />
              <DiffLine kind="rem"  text="- delta_exec = now - curr->exec_start;" />
              <DiffLine kind="add"  text="+ if (unlikely(!curr->on_rq)) return;" />
              <DiffLine kind="add"  text="+ delta_exec = (now - curr->exec_start)" />
              <DiffLine kind="add"  text="+             >> SCHED_WEIGHT_SHIFT;" />
              <DiffLine kind="blank" text="" />
              <DiffLine kind="ctx"  text="  curr->exec_start = now;" />
              <DiffLine kind="ctx"  text="  schedstat_set(curr->statistics.exec_max," />
              <DiffLine kind="ctx"  text="    max(delta_exec, curr->statistics.exec_max));" />
            </div>

            {/* Diff summary */}
            <p className="mt-4 font-mono text-[11px] text-zinc-500">
              <span className="text-emerald-400">+3</span>
              <span className="mx-1 text-zinc-600">—</span>
              <span className="text-rose-400">-1</span>
              <span className="ml-2 text-zinc-600">kernel/sched/fair.c</span>
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <InlineLink href={featuredProject.links.github}>GitHub Repo</InlineLink>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-14">
        <SectionTitle
          eyebrow="Projects 🧪"
          title="The rest of the work stays technical and compact."
          subtitle="Each project is here to prove a specific kind of systems reasoning, not to pad the portfolio."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.18) }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-5 py-14">
        <SectionTitle
          eyebrow="Experience 🛰️"
          title="Siraj Technologies added the cross-system perspective."
          subtitle="The internship matters because it shows how I think when failures move across frontend, backend, infrastructure, and device-facing logic."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-7"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {experience.company}
              </p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50">
                {experience.role}
              </h3>
            </div>
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-zinc-300">
              {experience.duration}
            </span>
          </div>

          <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-300">
            {experience.context}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {experience.bullets.map((bullet) => (
              <div key={bullet} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm leading-7 text-zinc-200">{bullet}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-400/15 bg-emerald-400/8 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Impact</p>
            <p className="mt-2 text-sm leading-7 text-zinc-200">{experience.impact}</p>
          </div>
        </motion.div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-14">
        <SectionTitle
          eyebrow="Skills 🧠"
          title="Grouped for fast scanning, with systems first."
          subtitle="No percentages, no filler categories, just the technical areas that support the work above."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 font-mono text-sm"
            >
              {/* comment header */}
              <p className="text-zinc-500">{"// " + group.title}</p>

              {/* declaration line */}
              <p className="mt-2">
                <span className="text-sky-300">const</span>
                <span className="text-zinc-100"> skills </span>
                <span className="text-zinc-500">= [</span>
              </p>

              {/* items */}
              <div className="ml-4 mt-1 flex flex-wrap gap-x-0 gap-y-[2px]">
                {group.items.map((item, i) => (
                  <span key={item} className="text-emerald-300">
                    &quot;{item}&quot;
                    <span className="text-zinc-500">
                      {i < group.items.length - 1 ? ",\u00a0" : ""}
                    </span>
                  </span>
                ))}
              </div>

              {/* closing bracket */}
              <p className="mt-1 text-zinc-500">{"];"}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <SectionTitle
          eyebrow="Terminal 💻"
          title="A lightweight terminal stays in the site, but now it supports the story."
          subtitle="Try a few commands and get a quick read on projects, experience, skills, and contact details."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 overflow-hidden rounded-[30px] border border-white/10 bg-zinc-950/85 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <TerminalSquare size={18} />
              <span className="font-mono">ahmad@systems</span>
            </div>
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
          </div>
          <AnimatedTerminal />
        </motion.div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-14">
        <SectionTitle
          eyebrow="Contact 🤝"
          title="Minimal and easy to reach."
          subtitle="If the work above matches what your team needs, the next step should be one click away."
        />

        <div className="mt-8 rounded-[30px] border border-white/10 bg-white/5 p-7">
          <p className="text-base leading-7 text-zinc-300">
            Email works best for direct contact. GitHub has the code. LinkedIn has the professional profile.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AButton href={`mailto:${LINKS.email}`} solid icon={<Mail size={18} />}>
              Email Ahmad
            </AButton>
            <AButton href={LINKS.github} newTab icon={<Github size={18} />}>
              GitHub
            </AButton>
            <AButton href={LINKS.linkedin} newTab icon={<Linkedin size={18} />}>
              LinkedIn
            </AButton>
            <AButton href={LINKS.resumePdf} newTab icon={<FileText size={18} />}>
              Low-Level Resume
            </AButton>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <span className="text-sm text-zinc-400">Email</span>
            <span className="text-sm font-medium text-zinc-100">{LINKS.email}</span>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(LINKS.email);
                  setToast("Email copied ✅");
                  setTimeout(() => setToast(null), 1400);
                } catch {
                  setToast("Copy failed");
                  setTimeout(() => setToast(null), 1600);
                }
              }}
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Copy email"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Ahmad Naser</span>
          <span>Built to foreground kernel, memory, and tracing work.</span>
        </div>
      </footer>

      <Toast message={toast} />
    </main>
  );
}

function AnimatedTerminal() {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const hasStartedRef = useRef(false);
  const runIdRef = useRef(0);

  const [isVisible, setIsVisible] = useState(false);
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [activeLine, setActiveLine] = useState<TerminalEntry | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [command, setCommand] = useState("");

  const script = useMemo<TerminalScriptStep[]>(
    () => [
      {
        type: "line",
        kind: "note",
        text: "okay scheduler, don’t embarrass me now ☕",
        delayAfter: 480,
      },
      { type: "command", text: "cd ~/lab/SchedScope-Linux-Kernel-Scheduler" },
      {
        type: "line",
        kind: "out",
        text: "ahmad@systems ~/lab/SchedScope-Linux-Kernel-Scheduler",
        delayAfter: 260,
      },
      { type: "command", text: "make kernel-schedlab" },
      { type: "line", kind: "out", text: "CC kernel/sched/fair.o && core.c" },
      { type: "line", kind: "success", text: "[ok] build complete ✅" },
      { type: "pause", duration: 380 },
      {
        type: "command",
        text: "./scripts/run_sched_bench.sh --kernel patched --workload fairness_mix",
      },
      {
        type: "line",
        kind: "metric",
        text: "[bench] 32 tasks, stable wakeups, and no scheduler drama today",
      },
      {
        type: "line",
        kind: "success",
        text: "[ok] patched run stayed inside expected fairness bounds",
      },
      { type: "pause", duration: 420 },
      { type: "command", text: "python3 tools/trace_summary.py traces/fairness_mix.trace" },
      {
        type: "line",
        kind: "success",
        text: "[ok] trace markers line up with the intended fair.c change",
      },
      { type: "pause", duration: 380 },
      { type: "command", text: "git diff --stat kernel/sched/fair.c kernel/sched/core.c" },
      { type: "line", kind: "out", text: " kernel/sched/core.c |  6 ++--" },
      { type: "line", kind: "out", text: " kernel/sched/fair.c | 34 ++++++++++++++++++------" },
      { type: "line", kind: "out", text: " 2 files changed, 28 insertions(+), 12 deletions(-)" },
      { type: "pause", duration: 320 },
      {
        type: "line",
        kind: "status",
        text: "all checks passed. system stable. coffee earned. ✅",
      },
    ],
    []
  );

  const commandMap = useMemo<Record<string, TerminalEntry[]>>(
    () => ({
      help: [
        { kind: "out", text: "available commands:" },
        { kind: "out", text: "whoami" },
        { kind: "out", text: "cat projects" },
        { kind: "out", text: "cat experience" },
        { kind: "out", text: "skills --category systems" },
        { kind: "out", text: "cat contact" },
        { kind: "out", text: "clear" },
      ],
      whoami: [
        { kind: "status", text: "Ahmad Naser — Systems & Low-Level Software Engineer" },
      ],
      "cat projects": [
        { kind: "out", text: "SchedScope — Linux scheduler modification in CFS." },
        { kind: "out", text: "HawkAlloc — allocator with mmap growth and coalescing." },
        { kind: "out", text: "Syspeek — ptrace-based syscall tracing." },
        { kind: "out", text: "xv6 Kernel Work — syscalls, shared memory, synchronization." },
      ],
      "cat experience": [
        {
          kind: "out",
          text: "Siraj Technologies — cross-system validation across frontend, backend, Docker, CI, and IoT behavior.",
        },
      ],
      "skills --category systems": [
        {
          kind: "metric",
          text: "C, C++, Linux, Kernel Internals, Memory Management, Scheduling, System Calls, Concurrency",
        },
      ],
      "cat contact": [
        { kind: "out", text: `GitHub: ${LINKS.github}` },
        { kind: "out", text: `Email: ${LINKS.email}` },
        { kind: "out", text: `LinkedIn: ${LINKS.linkedin}` },
      ],
    }),
    []
  );

  useEffect(() => {
    const node = terminalRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entriesList) => {
        if (entriesList.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = terminalRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [entries, activeLine]);

  useEffect(() => {
    if (!isVisible || hasStartedRef.current) return;
    hasStartedRef.current = true;
    void playScript();
  }, [isVisible]);

  const wait = (duration: number) =>
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, duration);
    });

  const commitLine = (line: TerminalEntry) => {
    setEntries((current) => [...current, line]);
    setActiveLine(null);
  };

  const typeLine = async (runId: number, line: TerminalEntry) => {
    for (let index = 1; index <= line.text.length; index += 1) {
      if (runIdRef.current !== runId) return;

      setActiveLine({ ...line, text: line.text.slice(0, index) });

      const nextChar = line.text[index] ?? "";
      const currentChar = line.text[index - 1] ?? "";
      const isWhitespace = currentChar === " ";
      const punctuationPause = /[./_=:-]/.test(currentChar) ? 55 : 0;
      const commandBurst = line.kind === "cmd" ? 18 : 26;
      const jitter = index % 7 === 0 ? 16 : 0;

      await wait(commandBurst + (isWhitespace ? 20 : 0) + punctuationPause + jitter);

      if (runIdRef.current !== runId) return;
      if (nextChar === " ") {
        await wait(18);
      }
    }

    commitLine(line);
  };

  const runCommand = async (rawCommand: string) => {
    const normalized = rawCommand.trim();
    if (!normalized) return;

    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    setActiveLine(null);

    if (normalized === "clear") {
      setEntries([]);
      setCommand("");
      setIsFinished(true);
      return;
    }

    await typeLine(runId, { kind: "cmd", text: normalized });
    if (runIdRef.current !== runId) return;
    await wait(220);

    const output =
      commandMap[normalized] ?? [
        { kind: "out" as const, text: 'unknown command. try "help" for the supported commands.' },
      ];

    for (const line of output) {
      if (runIdRef.current !== runId) return;
      await typeLine(runId, line);
      await wait(150);
    }

    setIsFinished(true);
    setCommand("");
  };

  const playScript = async () => {
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    setEntries([]);
    setActiveLine(null);
    setIsFinished(false);

    for (const step of script) {
      if (runIdRef.current !== runId) return;

      if (step.type === "pause") {
        await wait(step.duration);
        continue;
      }

      if (step.type === "command") {
        await typeLine(runId, { kind: "cmd", text: step.text });
        if (runIdRef.current !== runId) return;
        await wait(step.delayAfter ?? 260);
        continue;
      }

      await typeLine(runId, { kind: step.kind, text: step.text });

      if (runIdRef.current !== runId) return;
      await wait(step.delayAfter ?? 180);
    }

    if (runIdRef.current === runId) {
      setIsFinished(true);
      setActiveLine(null);
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(180deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_4px)]" />

      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 uppercase tracking-[0.18em] text-emerald-200">
            Auto Run
          </span>
          <span className="font-mono">schedscope_live_check.sh</span>
        </div>
        <button
          onClick={() => {
            hasStartedRef.current = true;
            void playScript();
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300 transition hover:bg-white/10 hover:text-white"
        >
          <RotateCcw size={14} />
          Replay ↺
        </button>
      </div>

      <div
        ref={terminalRef}
        className="max-h-[420px] overflow-y-auto px-5 py-5 font-mono text-[13px] leading-7 text-zinc-300 sm:text-sm"
      >
        <div className="space-y-1.5">
          {entries.map((entry, index) => (
            <TerminalLine key={`${entry.kind}-${index}-${entry.text}`} entry={entry} />
          ))}

          {activeLine ? <TerminalLine entry={activeLine} cursor /> : null}
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-3">
        <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
            project: SchedScope
          </span>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
            focus: CFS + tracing + validation
          </span>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
            status: {isFinished ? "complete" : "running"}
          </span>
        </div>

        {isFinished ? (
          <>
            <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3">
              <span className="font-mono text-emerald-300">$</span>
              <input
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    void runCommand(command);
                  }
                }}
                className="w-full bg-transparent font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                placeholder='Try "help"'
                aria-label="Terminal command input"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {["help", "whoami", "cat projects", "cat experience", "cat contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCommand(item);
                    void runCommand(item);
                  }}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 transition hover:bg-white/10 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function TerminalLine({
  entry,
  cursor,
}: {
  entry: TerminalEntry;
  cursor?: boolean;
}) {
  const text = (
    <>
      {entry.text}
      {cursor ? <BlinkCursor /> : null}
    </>
  );

  if (entry.kind === "cmd") {
    return (
      <div className="flex gap-3">
        <span className="text-emerald-300">$</span>
        <span className="min-w-0 break-words text-zinc-100">{text}</span>
      </div>
    );
  }

  if (entry.kind === "note") {
    return <div className="text-zinc-500">{text}</div>;
  }

  if (entry.kind === "success") {
    return <div className="text-emerald-200">{text}</div>;
  }

  if (entry.kind === "metric") {
    return <div className="text-sky-200">{text}</div>;
  }

  if (entry.kind === "status") {
    return <div className="text-zinc-100">{text}</div>;
  }

  return <div className="text-zinc-400">{text}</div>;
}

function BlinkCursor() {
  return <span className="ml-1 inline-block h-[1.05em] w-2 animate-pulse bg-zinc-200/80 align-[-0.2em]" />;
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gradient-to-r from-emerald-400 via-emerald-300 to-sky-400"
    />
  );
}

function Toast({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="rounded-2xl border border-white/10 bg-zinc-950/90 px-4 py-2 text-sm text-zinc-200 shadow-xl backdrop-blur">
        {message}
      </div>
    </div>
  );
}

function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-150px] h-[420px] w-[960px] -translate-x-1/2 rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-140px] h-[420px] w-[560px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute left-[-100px] top-[40%] h-[320px] w-[320px] rounded-full bg-rose-500/8 blur-3xl" />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.16]">
        <div className="absolute inset-0 grid-pattern" />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,transparent_20%,rgba(3,6,10,0.82)_85%)]" />

      {/* SVG grain texture */}
      <svg className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.035]" aria-hidden="true">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-4xl">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-zinc-400 md:text-base">{subtitle}</p>
    </div>
  );
}

function SignalCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-semibold text-zinc-100">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{desc}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <p className="mt-2 text-sm leading-7 text-zinc-200">{value}</p>
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}

function AButton({
  href,
  children,
  solid,
  newTab,
  icon,
}: {
  href: string;
  children: ReactNode;
  solid?: boolean;
  newTab?: boolean;
  icon?: ReactNode;
}) {
  const className = solid
    ? "inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
    : "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-white/10";

  return (
    <a
      className={className}
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
    >
      {children}
      <ArrowRight size={16} />
    </a>
  );
}

function DiffLine({ kind, text }: { kind: "add" | "rem" | "ctx" | "blank"; text: string }) {
  if (kind === "blank") return <div className="h-2" />;

  const bg =
    kind === "add" ? "bg-emerald-400/8" : kind === "rem" ? "bg-rose-400/8" : "transparent";
  const textColor =
    kind === "add"
      ? "text-emerald-300"
      : kind === "rem"
        ? "text-rose-300"
        : "text-zinc-400";

  return (
    <div className={`flex gap-3 rounded px-2 py-[1px] ${bg}`}>
      <span className={`w-3 shrink-0 select-none ${textColor} opacity-70`}>
        {kind === "add" ? "+" : kind === "rem" ? "-" : " "}
      </span>
      <span className={`${textColor} whitespace-pre`}>{text.slice(2)}</span>
    </div>
  );
}

const HIGHLIGHT_STYLES: Record<
  NonNullable<(typeof projects)[number]["highlight"]>,
  { border: string; accent: string; label: string }
> = {
  Kernel:     { border: "border-l-amber-400/70",   accent: "text-amber-300",   label: "bg-amber-400/10 border-amber-400/20 text-amber-200"   },
  Allocator:  { border: "border-l-emerald-400/70", accent: "text-emerald-300", label: "bg-emerald-400/10 border-emerald-400/20 text-emerald-200" },
  Tracing:    { border: "border-l-sky-400/70",     accent: "text-sky-300",     label: "bg-sky-400/10 border-sky-400/20 text-sky-200"         },
  Networking: { border: "border-l-violet-400/70",  accent: "text-violet-300",  label: "bg-violet-400/10 border-violet-400/20 text-violet-200" },
};

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const hl = project.highlight ? HIGHLIGHT_STYLES[project.highlight] : null;

  return (
    <div
      className={`group h-full rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/7 border-l-4 ${hl?.border ?? "border-l-white/10"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-50">
            {project.title}
          </h3>
          {project.highlight ? (
            <span className={`mt-2 inline-block rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] ${hl?.label}`}>
              {project.highlight}
            </span>
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-zinc-200">{project.oneLiner}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className={`text-xs uppercase tracking-[0.2em] ${hl?.accent ?? "text-emerald-200"}`}>Impact</p>
        <p className="mt-2 text-sm leading-7 text-zinc-300">{project.impact}</p>
      </div>

      <div className="mt-5">
        <InlineLink href={project.links.github}>GitHub Repo</InlineLink>
      </div>
    </div>
  );
}
