# Website Improvement Plan — Ahmad Naser
## Systems / Low-Level Engineer Portfolio

---

## Phase 0: Audit & Teardown (Before Writing Any Code)

### 0.1 — Content Audit
- [ ] Review every piece of text on the current site and classify it: **keep / rewrite / delete**
- [ ] Remove any generic description that could apply to any developer (e.g., "passionate developer", "problem solver")
- [ ] Every sentence must answer: **"Why is this person exceptional at systems engineering?"**

### 0.2 — Positioning Decision
- [ ] Lock the identity to: **Systems / Low-Level Engineer**
- [ ] Remove any signal that makes the visitor think you're a generalist or frontend developer
- [ ] Within 5 seconds, the site must communicate: "This person works on kernels, memory, and scheduling"

### 0.3 — Reference Collection
- [ ] Prepare GitHub links for all projects (SchedScope, Allocator, Tracing Tool)
- [ ] Prepare measurable results (benchmark numbers, latency figures, memory savings)
- [ ] Prepare a single CV link (Low-Level version only — do not link multiple CVs)

---

## Phase 1: Structure & Information Architecture

### 1.1 — Final Section Order
```
1. Hero Section (Identity + one powerful sentence)
2. Featured Project (SchedScope — standalone spotlight)
3. Projects Grid (remaining projects)
4. Experience (Siraj Technologies Internship)
5. Skills (clean groups)
6. Terminal Section (interactive touch — optional)
7. Contact (minimal)
```

### 1.2 — Why This Order?
- Hero locks the positioning immediately
- Featured Project proves the claim with technical evidence
- Experience shows you've worked in a real team on a real system
- Skills serve as quick confirmation — not the main content

---

## Phase 2: Hero Section

### 2.1 — Components
- [ ] **Name**: Ahmad Naser
- [ ] **Title**: `Systems & Low-Level Software Engineer`
- [ ] **One-liner** (one powerful sentence — example):
  > "I modify kernel schedulers, build memory allocators from scratch, and trace system calls to understand what the OS is actually doing."
- [ ] **CTA Buttons**: `View Projects` | `GitHub` | `Resume (PDF)`

### 2.2 — Rules
- No long bio — one sentence is enough
- No profile photo (unless it's highly professional)
- No emojis, no "Hi I'm Ahmad"
- The one-liner must contain **specific technical verbs**, not generic adjectives

---

## Phase 3: Featured Project — SchedScope

### 3.1 — Why a Separate Spotlight?
SchedScope is the strongest asset in your portfolio. It deserves more space than the rest.

### 3.2 — Structure
```
Title: SchedScope — Linux Kernel Scheduler Modification
Subtitle: Modified CFS in kernel/sched/fair.c on Linux 6.6, benchmarked in QEMU

Key Points (3-4 only):
├── What: Custom scheduling constant in CFS affecting vruntime calculation
├── How: Built & booted custom kernel in QEMU, traced with ftrace/trace_printk
├── Result: Benchmarked against vanilla CFS — [specific numbers]
└── Depth: Worked directly in kernel/sched/fair.c and core.c, task_struct level

Links: GitHub Repo | Technical Writeup (if available)
```

### 3.3 — Content Rules
- [ ] **Don't say "built a scheduler"** — state exactly what you modified and why
- [ ] **Numbers**: every claim must be backed by a benchmark or measurement
- [ ] **Trade-offs**: mention hard decisions (why CFS before Round Robin? what broke?)
- [ ] **Tools**: mention ftrace, QEMU, GDB naturally within context — not as buzzwords

---

## Phase 4: Projects Grid

### 4.1 — Remaining Projects
Each project gets a compact card with this format:

```
[Project Name]
One-line: what it does (technically specific)
Stack: C | Linux | ptrace | ...
Impact: what the project proved (not what it does)
[GitHub Link]
```

### 4.2 — Memory Allocator
- [ ] **Mention**: mmap, free-list management, coalescing, fragmentation handling
- [ ] **Impact**: "Implemented malloc/free replacement handling [X] allocation patterns"
- [ ] **Don't say**: "Built a memory allocator" — every CS student can say that

### 4.3 — System Call Tracer
- [ ] **Mention**: ptrace, syscall interception, trace filtering
- [ ] **Impact**: what did the tool reveal? how many syscalls could it trace? what insights came out?
- [ ] **Future**: eBPF expansion plan — one line only

### 4.4 — General Project Rules
- [ ] Every project must answer: **"What technical challenge did you solve?"**
- [ ] Do not include generic university assignments
- [ ] Do not include fullstack/web projects — they dilute the positioning

---

## Phase 5: Experience Section

### 5.1 — Siraj Technologies Internship
```
Role: Software Engineering Intern
Company: Siraj Technologies (joint IoT project with Netafim — ADS/Adaptive Drip System)
Duration: [dates]

Structure:
├── Context: One sentence — what the system is
├── Role: What you owned
├── Technical Depth: 3-4 bullets
└── Impact: What changed because of your work
```

### 5.2 — Technical Bullets (examples — adjust to reality)
- [ ] "Designed and maintained E2E test suites using Cucumber/BDD validating the full pipeline: Angular frontend → Java/Spring backend → IoT device layer"
- [ ] "Debugged cross-component failures spanning API responses, Docker container networking, and Azure DevOps pipeline configurations"
- [ ] "Validated API contracts and backend behavior ensuring data integrity between sensor input and irrigation scheduling output"
- [ ] "Identified and reported integration defects at the boundary between frontend state management and backend REST endpoints"

### 5.3 — Rules
- [ ] **Don't say "worked on testing"** — state exactly what you tested and at what level
- [ ] **Highlight systems thinking**: show you understand how frontend, backend, infrastructure, and IoT devices are connected
- [ ] **Mention tools naturally**: Docker, Azure DevOps, Maven — within context, not as a list
- [ ] **Impact**: "caught X integration bugs before production" or any real number

---

## Phase 6: Skills Section

### 6.1 — Grouping (3-4 groups only)

```
Systems & Low-Level
  C, C++, Linux Kernel Internals, Memory Management,
  Scheduling (CFS, vruntime), System Calls, Concurrency

Debugging & Tracing
  GDB, Valgrind, ASan/UBSan, ftrace, trace_printk, ptrace

Infrastructure & Testing
  Docker, Azure DevOps, BDD/Cucumber, TCP/IP, Sockets

Languages & Tools
  Python, Java, QEMU, Git, AI-Assisted Development (Claude, Copilot)
```

### 6.2 — Rules
- [ ] **No more than 4 groups** — the visitor must scan it in 3 seconds
- [ ] **Order matters**: Systems first — that's your identity
- [ ] **No progress bars or percentages** — nobody believes them
- [ ] **No "Soft Skills"** — this is a purely technical portfolio

---

## Phase 7: Terminal Section (Optional — High Impact)

### 7.1 — Concept
An interactive terminal emulator on the site — visitors type commands and get info about you.

### 7.2 — Suggested Commands
```bash
$ whoami
→ Ahmad Naser — Systems & Low-Level Software Engineer

$ cat projects
→ [list of projects with one-liners]

$ cat experience
→ Siraj Technologies — E2E System Validation (IoT/Irrigation)

$ skills --category systems
→ C, C++, Linux Kernel, Memory Allocators, Scheduling, Syscalls

$ cat contact
→ GitHub: ahmadsmnaser | Email: [email] | LinkedIn: [link]
```

### 7.3 — Rules
- [ ] Must be fast and lightweight — not a replacement for the main content
- [ ] Vanilla JS only — no heavy frameworks
- [ ] Monospace fonts only (JetBrains Mono or Fira Code)
- [ ] Must support a `help` command

---

## Phase 8: Visual Design & UI

### 8.1 — Design Direction
- **Theme**: Dark mode primary (matches the systems/terminal vibe)
- **Typography**:
  - Display: `JetBrains Mono` or `IBM Plex Mono`
  - Body: `IBM Plex Sans` or `Source Sans Pro`
- **Color Palette**:
  - Background: `#0a0a0a` or `#111111`
  - Text: `#e0e0e0`
  - Accent: `#00ff88` (terminal green) or `#4fc3f7` (cool blue)
  - Secondary accent: `#ff6b6b` (for highlights)
- **Layout**: Single column, generous whitespace, no clutter

### 8.2 — Micro-interactions
- [ ] Smooth scroll between sections
- [ ] Subtle fade-in on scroll (Intersection Observer)
- [ ] Terminal cursor blink animation
- [ ] Hover effects on project cards (border glow or subtle lift)

### 8.3 — Anti-patterns (Avoid)
- Do not use over-the-top parallax scrolling
- Do not use purple + white gradient color schemes (AI slop)
- Do not replace text with excessive icons
- Do not use slow animations that delay reading
- Do not use stock photos or generic illustrations

---

## Phase 9: Technical Implementation

### 9.1 — Tech Stack
- **Option A (Recommended)**: Single HTML file + CSS + vanilla JS
  - Fastest, simplest, easiest to deploy
  - Perfect for a portfolio site
- **Option B**: React (JSX) — only if the terminal section needs to be complex

### 9.2 — Performance
- [ ] Total page weight < 500KB
- [ ] No external CSS frameworks (no Bootstrap, no Tailwind CDN)
- [ ] Fonts: self-host or Google Fonts (max 2 fonts)
- [ ] No images unless necessary (project screenshots only)

### 9.3 — SEO & Meta
- [ ] `<title>`: "Ahmad Naser — Systems & Low-Level Software Engineer"
- [ ] `<meta description>`: one sentence about the specialization
- [ ] Open Graph tags for social sharing

---

## Phase 10: Pre-Launch Review Checklist

### The 5-Second Test
- [ ] Does the visitor know you're a systems engineer within 5 seconds?
- [ ] Is SchedScope the first project they see?
- [ ] Can they reach your GitHub in one click?

### Technical Credibility
- [ ] Does every project include numbers or results?
- [ ] Are tools mentioned in real context (not just listed)?
- [ ] Does the Experience section show systems thinking, not just "I tested things"?

### Red Flags Check
- [ ] No "passionate developer", "fast learner", or "team player" anywhere
- [ ] No web/frontend projects (except the site itself)
- [ ] No skills listed without context (e.g., "Docker" without explaining where you used it)
- [ ] Only one CV linked (Low-Level version)

---

### Projects links
- https://github.com/Ahmadsmnaser/SchedScope-Linux-Kernel-Scheduler
- https://github.com/Ahmadsmnaser/Mini-Scheduler
- https://github.com/Ahmadsmnaser/Syspeek-Syscall-Tracing-Tool
- https://github.com/Ahmadsmnaser/Principles-of-Compilation
- https://github.com/Ahmadsmnaser/Operating-Systems
- https://github.com/Ahmadsmnaser/SPL-System-Programming-Laboratory
- https://github.com/Ahmadsmnaser/ESPL-Extended-System-Programming-Laboratory
- https://github.com/Ahmadsmnaser/hawkalloc
