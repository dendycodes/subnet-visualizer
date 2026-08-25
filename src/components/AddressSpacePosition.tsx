"use client";

import { motion } from "framer-motion";
import { intToIp, type SubnetInfo } from "@/lib/subnet";

const FULL_SPACE = 2 ** 32;

function formatPercent(pct: number): string {
  if (pct >= 100) return "100";
  if (pct >= 1) return pct.toFixed(1);
  if (pct >= 0.001) return pct.toFixed(4);
  return pct.toExponential(1);
}

export default function AddressSpacePosition({ info }: { info: SubnetInfo }) {
  const left = (info.networkInt / FULL_SPACE) * 100;
  const width = Math.max((info.totalAddresses / FULL_SPACE) * 100, 0.35);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-white/40">
        <span>0.0.0.0</span>
        <span>where your subnet sits in the full IPv4 space</span>
        <span>255.255.255.255</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/[0.04]">
        <motion.div
          layout
          initial={false}
          animate={{ left: `${left}%`, width: `${width}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          className="absolute top-0 h-full rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400 shadow-[0_0_16px_rgba(129,140,248,0.6)]"
        />
      </div>
      <div className="text-center text-[11px] text-white/35">
        {intToIp(info.networkInt)}/{info.prefix} covers{" "}
        {formatPercent((info.totalAddresses / FULL_SPACE) * 100)}% of all IPv4 addresses
      </div>
    </div>
  );
}
