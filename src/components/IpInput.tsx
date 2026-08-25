"use client";

import { motion } from "framer-motion";

const PRESETS = [8, 16, 24, 27, 28, 30];

export default function IpInput({
  ipText,
  prefix,
  error,
  onIpChange,
  onPrefixChange,
}: {
  ipText: string;
  prefix: number;
  error: string | null;
  onIpChange: (value: string) => void;
  onPrefixChange: (value: number) => void;
}) {
  return (
    <div className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-7">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="ip-input"
          className="text-xs font-medium uppercase tracking-wider text-ink/45"
        >
          IP address <span className="text-ink/25">(or paste as 192.168.1.0/24)</span>
        </label>
        <motion.div
          animate={error ? { x: [0, -8, 8, -6, 6, -2, 2, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          className={`flex items-center gap-3 rounded-2xl border bg-(--well) px-4 py-3.5 transition-colors ${
            error
              ? "border-rose-500/60 shadow-[0_0_0_3px_rgba(244,63,94,0.15)]"
              : "border-ink/10 focus-within:border-sky-400/60 focus-within:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]"
          }`}
        >
          <input
            id="ip-input"
            type="text"
            inputMode="decimal"
            spellCheck={false}
            autoComplete="off"
            value={ipText}
            onChange={(e) => onIpChange(e.target.value)}
            placeholder="192.168.1.10"
            className="mono w-full flex-1 bg-transparent text-lg font-semibold text-ink outline-none placeholder:text-ink/20 sm:text-2xl"
          />
          <span className="mono text-lg font-semibold text-ink/30 sm:text-2xl">
            /{prefix}
          </span>
        </motion.div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-medium text-rose-600 dark:text-rose-400"
          >
            {error}
          </motion.p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="prefix-slider"
            className="text-xs font-medium uppercase tracking-wider text-ink/45"
          >
            Prefix length
          </label>
          <motion.span
            key={prefix}
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flash-ink mono text-2xl font-bold text-ink"
          >
            /{prefix}
          </motion.span>
        </div>
        <input
          id="prefix-slider"
          type="range"
          min={0}
          max={32}
          value={prefix}
          onChange={(e) => onPrefixChange(Number(e.target.value))}
          className="slider h-2 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-sky-400"
        />
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPrefixChange(p)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                prefix === p
                  ? "border-sky-400/60 bg-sky-400/15 text-sky-700 dark:text-sky-200"
                  : "border-ink/10 bg-ink/[0.02] text-ink/50 hover:border-ink/25 hover:text-ink/80"
              }`}
            >
              /{p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
