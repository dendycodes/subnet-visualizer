"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";

export default function ResultCard({
  label,
  value,
  display,
  hint,
  accent = "net",
  delay = 0,
}: {
  label: string;
  value: string;
  display?: ReactNode;
  hint?: string;
  accent?: "net" | "host" | "accent" | "neutral";
  delay?: number;
}) {
  const [copied, setCopied] = useState(false);

  const barColor =
    accent === "net"
      ? "bg-sky-400"
      : accent === "host"
        ? "bg-fuchsia-400"
        : accent === "accent"
          ? "bg-emerald-400"
          : "bg-white/25";

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <motion.button
      type="button"
      onClick={copy}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="glass group relative flex flex-col gap-1.5 overflow-hidden rounded-2xl p-4 text-left transition-colors hover:bg-white/[0.07]"
    >
      <span className={`absolute inset-y-0 left-0 w-[3px] ${barColor}`} />
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-white/45">
          {label}
        </span>
        <span
          className={`text-[10px] font-medium text-white/30 transition-opacity ${
            copied ? "opacity-100 text-emerald-400" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {copied ? "copied" : "copy"}
        </span>
      </div>
      <span className="mono text-lg font-semibold text-white sm:text-xl">
        {display ?? value}
      </span>
      {hint && <span className="text-xs text-white/40">{hint}</span>}
    </motion.button>
  );
}
