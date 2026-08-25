"use client";

import { AnimatePresence, motion } from "framer-motion";
import { intToIp, type SubnetInfo } from "@/lib/subnet";

export default function AddressRangeBar({ info }: { info: SubnetInfo }) {
  const hasRange = info.prefix <= 30;
  const isSlash31 = info.prefix === 31;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-16 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-20">
        <AnimatePresence mode="popLayout" initial={false}>
          {hasRange ? (
            <motion.div
              key="net"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, flexGrow: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              className="flex min-w-[4.5rem] flex-col items-center justify-center gap-0.5 bg-sky-500/20 px-2"
              style={{ flexBasis: 0 }}
            >
              <span className="text-[10px] uppercase tracking-wider text-sky-300/80">
                network
              </span>
              <span className="mono text-xs font-semibold text-sky-200 sm:text-sm">
                {intToIp(info.networkInt)}
              </span>
            </motion.div>
          ) : null}

          {hasRange ? (
            <motion.div
              key="hosts"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, flexGrow: 6 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              className="flex min-w-[7rem] flex-col items-center justify-center gap-0.5 bg-gradient-to-r from-emerald-500/15 via-emerald-400/20 to-emerald-500/15 px-2"
              style={{ flexBasis: 0 }}
            >
              <span className="text-[10px] uppercase tracking-wider text-emerald-300/80">
                usable host range
              </span>
              <span className="mono text-xs font-semibold text-emerald-200 sm:text-sm">
                {intToIp(info.firstHostInt)} &ndash; {intToIp(info.lastHostInt)}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="degenerate"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, flexGrow: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-amber-500/15 px-2"
            >
              <span className="text-[10px] uppercase tracking-wider text-amber-300/80">
                {isSlash31 ? "point-to-point link (RFC 3021)" : "single host"}
              </span>
              <span className="mono text-xs font-semibold text-amber-200 sm:text-sm">
                {intToIp(info.firstHostInt)}
                {isSlash31 ? ` – ${intToIp(info.lastHostInt)}` : ""}
              </span>
            </motion.div>
          )}

          {hasRange ? (
            <motion.div
              key="bcast"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, flexGrow: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              className="flex min-w-[4.5rem] flex-col items-center justify-center gap-0.5 bg-rose-500/20 px-2"
              style={{ flexBasis: 0 }}
            >
              <span className="text-[10px] uppercase tracking-wider text-rose-300/80">
                broadcast
              </span>
              <span className="mono text-xs font-semibold text-rose-200 sm:text-sm">
                {intToIp(info.broadcastInt)}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
