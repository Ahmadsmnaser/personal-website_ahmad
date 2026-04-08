export type FeaturedProject = {
  title: string;
  subtitle: string;
  summary: string;
  points: Array<{
    label: string;
    text: string;
  }>;
  stack: string[];
  links: {
    github: string;
  };
};

export type ProjectCardData = {
  title: string;
  oneLiner: string;
  stack: string[];
  impact: string;
  links: {
    github: string;
  };
  highlight?: "Allocator" | "Kernel" | "Tracing" | "Networking";
};

export const featuredProject: FeaturedProject = {
  title: "SchedScope",
  subtitle: "Linux Kernel Scheduler Modification • Linux 6.6 • QEMU",
  summary:
    "Modified the Linux CFS scheduler in kernel/sched/fair.c, booted the patched kernel in QEMU, and traced scheduling behavior to study how vruntime changes affect task fairness and responsiveness.",
  points: [
    {
      label: "What",
      text: "Adjusted the scheduling logic around CFS vruntime behavior instead of treating the scheduler as a black box.",
    },
    {
      label: "How",
      text: "Worked directly in kernel/sched/fair.c and related scheduler paths, rebuilt the kernel, and validated changes in a controlled QEMU setup.",
    },
    {
      label: "Tracing",
      text: "Used ftrace, trace_printk, and low-level debugging to inspect task execution paths and verify that scheduler behavior matched the intended change.",
    },
    {
      label: "Result",
      text: "Produced a benchmarkable kernel variant and documented the comparison workflow against vanilla CFS in the repository.",
    },
  ],
  stack: ["C", "Linux Kernel", "CFS", "vruntime", "QEMU", "ftrace", "trace_printk"],
  links: {
    github: "https://github.com/Ahmadsmnaser/SchedScope-Linux-Kernel-Scheduler",
  },
};

export const projects: ProjectCardData[] = [
  {
    title: "HawkAlloc",
    oneLiner:
      "A user-space allocator implementing malloc/free/calloc/realloc with mmap-backed growth, free-list reuse, and block coalescing.",
    stack: ["C", "Linux", "mmap", "Free Lists", "Coalescing", "Memory Layout"],
    impact:
      "Proved I can reason about fragmentation, allocator invariants, and allocation-path trade-offs instead of only using libc as a black box.",
    links: {
      github: "https://github.com/Ahmadsmnaser/hawkalloc",
    },
    highlight: "Allocator",
  },
  {
    title: "Syspeek",
    oneLiner:
      "A ptrace-based syscall tracer that intercepts process execution, captures syscall entry/exit, and exposes low-level kernel-userspace behavior.",
    stack: ["C", "Linux", "ptrace", "Signals", "Syscalls", "Process Control"],
    impact:
      "Turned syscall flow into something observable and debuggable, which is exactly the kind of tooling mindset I want to bring to systems work.",
    links: {
      github: "https://github.com/Ahmadsmnaser/Syspeek-Syscall-Tracing-Tool",
    },
    highlight: "Tracing",
  },
  {
    title: "xv6 Kernel Work",
    oneLiner:
      "Extended xv6 with system calls, synchronization mechanisms, and shared-memory behavior at the page-table level.",
    stack: ["C", "xv6", "RISC-V", "Page Tables", "QEMU", "GDB"],
    impact:
      "Built confidence working inside a teaching kernel where process state, synchronization, and memory ownership all have to be reasoned about explicitly.",
    links: {
      github: "https://github.com/Ahmadsmnaser/Operating-Systems",
    },
    highlight: "Kernel",
  },
  {
    title: "Client-Server System",
    oneLiner:
      "A TCP client-server system with custom message framing, robust error handling, and multi-client coordination under partial I/O conditions.",
    stack: ["C++", "TCP/IP", "Sockets", "Protocol Design", "Concurrency"],
    impact:
      "Showed I can design protocol behavior carefully and debug failure modes that only appear once multiple clients and real network edge cases are involved.",
    links: {
      github: "https://github.com/Ahmadsmnaser/SPL-System-Programming-Laboratory",
    },
    highlight: "Networking",
  },
];
