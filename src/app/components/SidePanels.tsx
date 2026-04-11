"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

type PanelId = "about" | "jobs" | null;

const ABOUT_CONTENT = {
  emoji: "🧠",
  title: "Who I Am",
  body: [
    {
      heading: "Systems thinker",
      text: "I'm Ahmad — a software engineer who works closest to the metal. My default context is the kernel: schedulers, allocators, and the syscall boundary where user programs meet the OS.",
    },
    {
      heading: "How I got here",
      text: "I started by asking why programs were slow, traced the answer down through libc, into the scheduler, and never really came back up. That curiosity is still the engine.",
    },
    {
      heading: "Outside the terminal",
      text: "I read OS papers for fun, contribute experiments to open-source kernel forks, and occasionally explain preemption to people who didn't ask. I'm based in the US and happy to work globally.",
    },
  ],
};

const JOBS_CONTENT = {
  emoji: "📋",
  title: "What I'm Looking For",
  items: [
    { label: "Role", value: "Systems / Low-Level Software Engineer" },
    { label: "Focus", value: "Kernel internals, runtime performance, memory systems, OS tooling" },
    { label: "Stack", value: "C, C++, Rust, Linux, eBPF, x86 assembly" },
    { label: "Environment", value: "Remote-friendly or on-site, open to relocation" },
    { label: "Stage", value: "Early-career IC focused on low-level systems; love high-ownership eng teams" },
    {
      label: "Not a fit",
      value: "Environments that lack technical depth, don’t prioritize performance, or aren’t supportive of engineering growth",
    },
  ],
  note: "If you're working on something where the CPU cache line layout actually matters — let's talk.",
};

export default function SidePanels() {
  const [open, setOpen] = useState<PanelId>(null);

  const toggle = (id: PanelId) => setOpen((prev) => (prev === id ? null : id));

  return (
    <>
      {/* Fixed icon strip */}
      <div className="fixed right-0 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2 pr-0">
        <IconButton
          emoji={ABOUT_CONTENT.emoji}
          label="Who I Am"
          active={open === "about"}
          onClick={() => toggle("about")}
        />
        <IconButton
          emoji={JOBS_CONTENT.emoji}
          label="Open to Work"
          active={open === "jobs"}
          onClick={() => toggle("jobs")}
        />
      </div>

      {/* Slide-out panels */}
      <AnimatePresence>
        {open === "about" && (
          <SlidePanel key="about" onClose={() => setOpen(null)}>
            <PanelHeader emoji={ABOUT_CONTENT.emoji} title={ABOUT_CONTENT.title} onClose={() => setOpen(null)} />
            <div className="mt-5 space-y-5">
              {ABOUT_CONTENT.body.map(({ heading, text }) => (
                <div key={heading}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">{heading}</p>
                  <p className="mt-1.5 text-sm leading-7 text-zinc-300">{text}</p>
                </div>
              ))}
            </div>
          </SlidePanel>
        )}

        {open === "jobs" && (
          <SlidePanel key="jobs" onClose={() => setOpen(null)}>
            <PanelHeader emoji={JOBS_CONTENT.emoji} title={JOBS_CONTENT.title} onClose={() => setOpen(null)} />
            <div className="mt-5 space-y-3">
              {JOBS_CONTENT.items.map(({ label, value }) => (
                <div key={label} className="rounded-xl border border-white/8 bg-white/4 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400">{label}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-200">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/8 px-4 py-3 text-xs leading-6 text-emerald-200 italic">
              {JOBS_CONTENT.note}
            </p>
          </SlidePanel>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── sub-components ── */

function IconButton({
  emoji,
  label,
  active,
  onClick,
}: {
  emoji: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`group relative flex h-12 w-12 items-center justify-center rounded-l-xl border-y border-l transition-all duration-200 ${
        active
          ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
          : "border-white/10 bg-zinc-900/80 text-zinc-300 hover:border-emerald-400/30 hover:bg-zinc-800/80 hover:text-emerald-200"
      } backdrop-blur`}
    >
      <span className="text-lg leading-none">{active ? <X size={18} /> : emoji}</span>

      {/* Tooltip */}
      <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-lg border border-white/10 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
}

function SlidePanel({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop (click-outside to close) */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="fixed right-0 top-0 z-50 flex h-full w-[min(360px,90vw)] flex-col overflow-y-auto border-l border-white/10 bg-zinc-950/95 px-6 py-8 shadow-2xl backdrop-blur-xl"
      >
        {children}
      </motion.aside>
    </>
  );
}

function PanelHeader({
  emoji,
  title,
  onClose,
}: {
  emoji: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-lg">
          {emoji}
        </span>
        <h2 className="text-base font-semibold tracking-tight text-zinc-50">{title}</h2>
      </div>
      <button
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-zinc-200"
        aria-label="Close panel"
      >
        <X size={15} />
      </button>
    </div>
  );
}
