"use client";

import { motion } from "framer-motion";
import { intToBinary } from "@/lib/subnet";

export default function BitGrid({ ipInt, prefix }: { ipInt: number; prefix: number }) {
  const bits = intToBinary(ipInt).split("");
  const octets = [0, 1, 2, 3].map((o) => bits.slice(o * 8, o * 8 + 8));

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5">
        {octets.map((octetBits, oi) => (
          <div
            key={oi}
            className="flex gap-[3px] rounded-xl bg-ink/[0.03] p-1.5 sm:gap-1"
          >
            {octetBits.map((bit, bi) => {
              const globalIndex = oi * 8 + bi;
              const isNetwork = globalIndex < prefix;
              return (
                <motion.div
                  key={bi}
                  layout
                  animate={{
                    backgroundColor: isNetwork
                      ? "rgba(56,189,248,0.92)"
                      : "rgba(232,121,249,0.85)",
                    boxShadow: isNetwork
                      ? "0 0 14px rgba(56,189,248,0.35)"
                      : "0 0 14px rgba(232,121,249,0.28)",
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="mono flex h-7 w-6 items-center justify-center rounded-[5px] text-[11px] font-bold text-[#05070d] sm:h-9 sm:w-8 sm:text-sm"
                >
                  {bit}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-ink/50">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
          network &middot; {prefix} bit{prefix === 1 ? "" : "s"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.7)]" />
          host &middot; {32 - prefix} bit{32 - prefix === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}
