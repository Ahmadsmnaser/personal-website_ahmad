import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmad Naser — Systems & Low-Level Software Engineer",
  description:
    "Portfolio of Ahmad Naser, focused on Linux scheduling, memory allocators, syscall tracing, and systems-oriented engineering.",
  keywords: [
    "Ahmad Naser",
    "systems engineer",
    "low-level software engineer",
    "Linux kernel",
    "scheduler",
    "memory allocator",
    "syscall tracing",
  ],
  themeColor: "#080b10",
  openGraph: {
    title: "Ahmad Naser — Systems & Low-Level Software Engineer",
    description:
      "Linux scheduling, memory allocators, syscall tracing, and systems-oriented engineering work.",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
