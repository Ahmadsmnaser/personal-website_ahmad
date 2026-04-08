export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Systems & Low-Level",
    items: [
      "C",
      "C++",
      "Linux",
      "Linux Kernel Internals",
      "Memory Management",
      "Scheduling",
      "System Calls",
      "Concurrency",
    ],
  },
  {
    title: "Debugging & Tracing",
    items: [
      "GDB",
      "Valgrind",
      "ptrace",
      "ftrace",
      "trace_printk",
      "QEMU",
      "Reproducible Debugging",
    ],
  },
  {
    title: "Infrastructure & Testing",
    items: [
      "Docker",
      "Azure DevOps",
      "BDD / Cucumber",
      "TCP/IP",
      "Sockets",
      "Integration Testing",
    ],
  },
  {
    title: "Languages & Tools",
    items: [
      "Python",
      "Java",
      "TypeScript",
      "Git",
      "Make",
      "AI-Assisted Development",
    ],
  },
];
