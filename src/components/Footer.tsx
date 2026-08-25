"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

const STACK = ["Next.js", "Framer Motion", "Tailwind CSS"];

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-4 pb-14 pt-4 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.a
          href="https://github.com/dendycodes"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
          }}
          className="glass group relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl p-7 text-center transition-colors hover:border-ink/32 dark:hover:border-ink/20 sm:flex-row sm:gap-7 sm:p-9 sm:text-left"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(56,189,248,0.08), transparent 40%)",
            }}
          />

          <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
            <div className="ring-spin absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#38bdf8,#e879f9,#34d399,#38bdf8)]" />
            <div className="absolute inset-[3px] rounded-full bg-(--background)" />
            <Image
              src="https://github.com/dendycodes.png"
              alt="dendycodes"
              fill
              sizes="112px"
              className="rounded-full object-cover"
              style={{ inset: "3px" }}
            />
          </div>

          <div className="relative flex flex-1 flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink/55 dark:text-ink/35">
              crafted by
            </span>
            <span className="text-gradient text-3xl font-extrabold tracking-tight sm:text-4xl">
              @dendycodes
            </span>
            <p className="max-w-md text-sm text-ink/65 dark:text-ink/45 sm:text-[15px]">
              Designed and built this animated subnet visualizer — bit grids, live
              topology, host maps, and all.
            </p>
            <div className="mt-1 flex flex-wrap justify-center gap-2 sm:justify-start">
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-ink/20 dark:border-ink/10 bg-ink/[0.055] dark:bg-ink/[0.03] px-2.5 py-1 text-[11px] text-ink/60 dark:text-ink/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <span className="relative flex shrink-0 items-center gap-2 rounded-full border border-ink/28 dark:border-ink/15 bg-ink/[0.075] dark:bg-ink/[0.04] px-5 py-3 text-sm font-semibold text-ink/88 dark:text-ink/75 transition-colors group-hover:border-sky-400/50 group-hover:bg-sky-400/10 group-hover:text-ink">
            <GitHubIcon />
            Follow on GitHub
            <ArrowIcon />
          </span>
        </motion.a>
      </motion.div>
    </footer>
  );
}
