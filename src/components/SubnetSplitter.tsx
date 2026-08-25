"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatNumber, intToIp, splitSubnet, type SubnetInfo } from "@/lib/subnet";

const MAX_EXTRA_BITS = 8;

function RouterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="10" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7.5" cy="14" r="1.1" fill="currentColor" />
      <circle cx="11.5" cy="14" r="1.1" fill="currentColor" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function SubnetSplitter({
  info,
  onSelect,
}: {
  info: SubnetInfo;
  onSelect: (ip: string, prefix: number) => void;
}) {
  const maxPrefix = Math.min(info.prefix + MAX_EXTRA_BITS, 32);
  const [newPrefix, setNewPrefix] = useState(Math.min(info.prefix + 2, maxPrefix));
  const effectivePrefix = Math.max(info.prefix, Math.min(newPrefix, maxPrefix));

  const splits = useMemo(() => {
    if (effectivePrefix <= info.prefix) return [];
    try {
      return splitSubnet(info, effectivePrefix);
    } catch {
      return [];
    }
  }, [info, effectivePrefix]);

  const disabled = info.prefix >= 32;

  return (
    <div className="glass flex flex-col gap-5 rounded-3xl p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-ink">Break this network into subnets</h3>
          <p className="text-xs text-ink/60 dark:text-ink/40">
            Drag to see how {intToIp(info.networkInt)}/{info.prefix} divides into equal,
            routable subnets — click one to open it in the calculator above.
          </p>
        </div>
        {!disabled && (
          <div className="flex items-center gap-3">
            <span className="mono text-xs text-ink/60 dark:text-ink/40">
              {formatNumber(splits.length)} &times; /{effectivePrefix}
            </span>
            <input
              type="range"
              min={info.prefix}
              max={maxPrefix}
              value={effectivePrefix}
              onChange={(e) => setNewPrefix(Number(e.target.value))}
              className="h-2 w-40 cursor-pointer appearance-none rounded-full bg-ink/10 accent-fuchsia-400"
            />
          </div>
        )}
      </div>

      {disabled ? (
        <p className="rounded-xl bg-ink/[0.055] dark:bg-ink/[0.03] px-4 py-3 text-sm text-ink/60 dark:text-ink/40">
          A /32 already identifies a single address &mdash; nothing smaller to split.
        </p>
      ) : (
        <div className="flex flex-col items-center gap-0">
          <div className="flex flex-col items-center gap-1 text-ink/75 dark:text-ink/60">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/28 dark:border-ink/15 bg-ink/[0.075] dark:bg-ink/[0.04] text-sky-600 dark:text-sky-300">
              <RouterIcon />
            </span>
            <span className="mono text-[11px] text-ink/60 dark:text-ink/40">
              {intToIp(info.networkInt)}/{info.prefix}
            </span>
          </div>
          <div className="h-4 w-px bg-ink/20" />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-ink/20 to-transparent" />

          <motion.div layout className="flex w-full gap-3 overflow-x-auto pt-4 pb-1">
            <AnimatePresence mode="popLayout">
              {splits.map((s) => (
                <motion.button
                  key={`${effectivePrefix}-${s.index}`}
                  type="button"
                  onClick={() => onSelect(intToIp(s.networkInt), effectivePrefix)}
                  layout
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, delay: Math.min(s.index * 0.012, 0.4) }}
                  whileHover={{ y: -3 }}
                  className="group relative flex shrink-0 flex-col items-center gap-0"
                  style={{ minWidth: "9.5rem" }}
                >
                  <span className="absolute -top-4 left-1/2 h-4 w-px -translate-x-1/2 bg-ink/20 transition-colors group-hover:bg-fuchsia-400/70" />
                  <div className="flex w-full flex-col gap-0.5 rounded-xl border border-ink/20 dark:border-ink/10 bg-ink/[0.045] dark:bg-ink/[0.02] px-3 py-2.5 text-left transition-colors group-hover:border-fuchsia-400/50 group-hover:bg-ink/[0.09] dark:group-hover:bg-ink/[0.05]">
                    <span className="text-[10px] uppercase tracking-wider text-ink/55 dark:text-ink/35">
                      subnet {s.index + 1}
                    </span>
                    <span className="mono text-xs font-semibold text-ink sm:text-sm">
                      {intToIp(s.networkInt)}/{effectivePrefix}
                    </span>
                    <span className="text-[10px] text-ink/55 dark:text-ink/35">
                      {formatNumber(s.usableHosts)} usable
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
}
