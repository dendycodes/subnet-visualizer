"use client";

import { motion } from "framer-motion";
import { intToIp, type SubnetInfo } from "@/lib/subnet";

export default function ClassBadges({ info }: { info: SubnetInfo }) {
  const badges = [
    { text: `Class ${info.ipClass}`, tone: "sky" as const },
    {
      text: info.isPrivate ? "Private range (RFC 1918)" : "Public / routable",
      tone: info.isPrivate ? ("amber" as const) : ("emerald" as const),
    },
    { text: `CIDR ${intToIp(info.networkInt)}/${info.prefix}`, tone: "fuchsia" as const },
  ];

  const tones: Record<string, string> = {
    sky: "border-sky-400/30 bg-sky-400/10 text-sky-200",
    amber: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    fuchsia: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200",
  };

  return (
    <motion.div
      layout
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {badges.map((b, i) => (
        <motion.span
          key={b.text}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className={`mono rounded-full border px-3 py-1 text-xs font-medium ${tones[b.tone]}`}
        >
          {b.text}
        </motion.span>
      ))}
    </motion.div>
  );
}
