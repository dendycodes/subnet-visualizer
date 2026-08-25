"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatNumber, intToIp, type SubnetInfo } from "@/lib/subnet";

export default function ConfigHelper({ info }: { info: SubnetInfo }) {
  const [copied, setCopied] = useState(false);
  const hasRange = info.prefix <= 30;

  const gateway = hasRange ? intToIp(info.firstHostInt) : intToIp(info.networkInt);
  const dhcpStartInt = hasRange ? (info.firstHostInt + 1) >>> 0 : null;
  const dhcpStart = dhcpStartInt !== null && dhcpStartInt <= info.lastHostInt ? intToIp(dhcpStartInt) : null;
  const dhcpEnd = hasRange ? intToIp(info.lastHostInt) : null;
  const dhcpCount = hasRange ? Math.max(info.usableHosts - 1, 0) : 0;

  const snippet = [
    `IP Address:      ${gateway}`,
    `Subnet Mask:     ${intToIp(info.maskInt)}`,
    `Default Gateway: ${gateway}`,
    dhcpStart && dhcpEnd ? `DHCP Range:      ${dhcpStart} - ${dhcpEnd}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <InfoTile
          label="Suggested router / gateway"
          value={gateway}
          note={
            hasRange
              ? "First usable address in the block — the conventional gateway slot."
              : info.prefix === 31
                ? "Point-to-point link: either address can address the peer."
                : "This /32 is the host itself; no separate gateway exists."
          }
          tone="amber"
        />
        <InfoTile
          label="Suggested DHCP pool"
          value={dhcpStart && dhcpEnd ? `${dhcpStart} – ${dhcpEnd}` : "Not enough addresses"}
          note={
            dhcpStart
              ? `${formatNumber(dhcpCount)} addresses available for dynamic assignment, after the gateway.`
              : "Reserve a bigger block if you need DHCP-assigned hosts."
          }
          tone="emerald"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-ink/65 dark:text-ink/45">
            Router config summary
          </span>
          <button
            type="button"
            onClick={copyAll}
            className="rounded-full border border-ink/20 dark:border-ink/10 bg-ink/[0.055] dark:bg-ink/[0.03] px-3 py-1 text-[11px] font-medium text-ink/75 dark:text-ink/60 transition-colors hover:border-ink/38 dark:hover:border-ink/25 hover:text-ink"
          >
            {copied ? "copied ✓" : "copy all"}
          </button>
        </div>
        <motion.pre
          layout
          className="mono overflow-x-auto rounded-xl border border-ink/20 dark:border-ink/10 bg-(--well-strong) px-4 py-3 text-xs leading-6 text-ink/90 dark:text-ink/80 sm:text-sm"
        >
          {snippet}
        </motion.pre>
        <p className="text-[11px] text-ink/50 dark:text-ink/30">
          Drop these values into your router or DHCP server&apos;s LAN / interface settings.
        </p>
      </div>
    </div>
  );
}

function InfoTile({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: "amber" | "emerald";
}) {
  const ring = tone === "amber" ? "border-amber-400/25 bg-amber-400/[0.06]" : "border-emerald-400/25 bg-emerald-400/[0.06]";
  const text = tone === "amber" ? "text-amber-700 dark:text-amber-200" : "text-emerald-700 dark:text-emerald-200";
  return (
    <div className={`flex flex-col gap-1 rounded-xl border ${ring} px-4 py-3`}>
      <span className="text-[11px] uppercase tracking-wider text-ink/60 dark:text-ink/40">{label}</span>
      <span className={`mono text-lg font-semibold ${text}`}>{value}</span>
      <span className="text-[11px] text-ink/55 dark:text-ink/35">{note}</span>
    </div>
  );
}
