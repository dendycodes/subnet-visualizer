"use client";

import { motion } from "framer-motion";
import { intToIp, type SubnetInfo } from "@/lib/subnet";

const MAX_VISIBLE = 256;

type Role = "network" | "broadcast" | "gateway" | "host";

const ROLE_STYLE: Record<Role, string> = {
  network: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.55)]",
  broadcast: "bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.55)]",
  gateway: "bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.6)]",
  host: "bg-emerald-400/70",
};

export default function HostGrid({ info }: { info: SubnetInfo }) {
  const total = info.totalAddresses;

  if (total > MAX_VISIBLE) {
    return (
      <div className="rounded-xl bg-white/[0.03] px-4 py-8 text-center text-sm text-white/40">
        This block holds {total.toLocaleString("en-US")} addresses — too many to draw one
        by one. Split it into /24 blocks or smaller in the panel below to see every host.
      </div>
    );
  }

  const addrs = Array.from({ length: total }, (_, i) => (info.networkInt + i) >>> 0);
  const hasRange = info.prefix <= 30;

  function roleOf(addr: number): Role {
    if (!hasRange) return "host";
    if (addr === info.networkInt) return "network";
    if (addr === info.broadcastInt) return "broadcast";
    if (addr === info.firstHostInt) return "gateway";
    return "host";
  }

  const columns = Math.min(16, total);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {addrs.map((addr, i) => {
          const role = roleOf(addr);
          return (
            <motion.div
              key={addr}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.004, 0.6), duration: 0.2 }}
              whileHover={{ scale: 1.35, zIndex: 10 }}
              className={`group relative aspect-square rounded-[3px] ${ROLE_STYLE[role]}`}
            >
              <span className="pointer-events-none absolute -top-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0a0d16] px-1.5 py-0.5 text-[10px] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {intToIp(addr)}
                {role !== "host" ? ` · ${role}` : ""}
              </span>
            </motion.div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-white/45">
        <Legend color="bg-sky-400" label="network address" />
        <Legend color="bg-amber-300" label="suggested gateway" />
        <Legend color="bg-emerald-400/70" label="usable host" />
        <Legend color="bg-rose-400" label="broadcast address" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}
