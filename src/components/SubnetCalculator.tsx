"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  SubnetError,
  formatNumber,
  getSubnetInfo,
  intToIp,
} from "@/lib/subnet";
import IpInput from "./IpInput";
import ClassBadges from "./ClassBadges";
import Card from "./Card";
import BitGrid from "./BitGrid";
import BinaryRow from "./BinaryRow";
import AddressRangeBar from "./AddressRangeBar";
import AddressSpacePosition from "./AddressSpacePosition";
import ResultCard from "./ResultCard";
import AnimatedNumber from "./AnimatedNumber";
import SubnetSplitter from "./SubnetSplitter";
import HostGrid from "./HostGrid";
import ConfigHelper from "./ConfigHelper";
import Logomark from "./Logomark";

const DEFAULT_IP = "192.168.1.10";
const DEFAULT_PREFIX = 24;

export default function SubnetCalculator() {
  const [ipText, setIpText] = useState(DEFAULT_IP);
  const [prefix, setPrefix] = useState(DEFAULT_PREFIX);

  const handleIpChange = useCallback((value: string) => {
    if (value.includes("/")) {
      const [ipPart, prefixPart] = value.split("/");
      setIpText(ipPart.trim());
      const p = Number(prefixPart.trim());
      if (!Number.isNaN(p) && p >= 0 && p <= 32) setPrefix(p);
      return;
    }
    setIpText(value);
  }, []);

  const handleSelectSplit = useCallback((ip: string, p: number) => {
    setIpText(ip);
    setPrefix(p);
  }, []);

  const { info, error } = useMemo(() => {
    try {
      return {
        info: getSubnetInfo(ipText.trim(), prefix),
        error: null as string | null,
      };
    } catch (e) {
      return {
        info: null,
        error: e instanceof SubnetError ? e.message : "Enter a valid IPv4 address",
      };
    }
  }, [ipText, prefix]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-10 sm:gap-7 sm:py-16">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="drop-shadow-[0_0_24px_rgba(56,189,248,0.25)]"
        >
          <Logomark className="h-12 w-12 sm:h-14 sm:w-14" />
        </motion.div>
        <span className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-ink/40">
          IPv4 subnet visualizer
        </span>
        <h1 className="text-gradient text-4xl font-bold tracking-tight sm:text-5xl">
          See your subnet, bit by bit
        </h1>
        <p className="max-w-xl text-sm text-ink/45 sm:text-base">
          Type an address, drag the prefix, and watch the network and host portions,
          address ranges, and subnet splits animate in real time.
        </p>
      </motion.header>

      <IpInput
        ipText={ipText}
        prefix={prefix}
        error={error}
        onIpChange={handleIpChange}
        onPrefixChange={setPrefix}
      />

      {info && (
        <>
          <ClassBadges info={info} />

          <Card title="Address structure" subtitle="Blue bits identify the network, pink bits identify the host.">
            <BitGrid ipInt={info.ipInt} prefix={info.prefix} />
          </Card>

          <Card title="Address range" subtitle="How this block breaks down end to end.">
            <AddressRangeBar info={info} />
          </Card>

          <Card
            title="Hosts in this network"
            subtitle="Every address in the block, colored by role — hover a dot to see the IP."
          >
            <HostGrid info={info} />
          </Card>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <ResultCard
              label="Network address"
              value={intToIp(info.networkInt)}
              accent="net"
              delay={0}
            />
            <ResultCard
              label="Broadcast address"
              value={intToIp(info.broadcastInt)}
              accent="host"
              delay={0.03}
            />
            <ResultCard
              label="Subnet mask"
              value={intToIp(info.maskInt)}
              accent="net"
              delay={0.06}
            />
            <ResultCard
              label="Wildcard mask"
              value={intToIp(info.wildcardInt)}
              accent="host"
              delay={0.09}
            />
            <ResultCard
              label="First usable host"
              value={intToIp(info.firstHostInt)}
              accent="accent"
              delay={0.12}
            />
            <ResultCard
              label="Last usable host"
              value={intToIp(info.lastHostInt)}
              accent="accent"
              delay={0.15}
            />
            <ResultCard
              label="Usable hosts"
              value={String(info.usableHosts)}
              display={<AnimatedNumber value={info.usableHosts} />}
              accent="neutral"
              delay={0.18}
            />
            <ResultCard
              label="Total addresses"
              value={String(info.totalAddresses)}
              display={<AnimatedNumber value={info.totalAddresses} />}
              hint={`/${info.prefix} block`}
              accent="neutral"
              delay={0.21}
            />
          </div>

          <Card title="Binary breakdown" subtitle="32 bits, four octets, one split point.">
            <div className="flex flex-col gap-3">
              <BinaryRow label="IP address" value={info.ipInt} prefix={info.prefix} />
              <BinaryRow label="Subnet mask" value={info.maskInt} prefix={info.prefix} splitColor={false} />
              <BinaryRow label="Network" value={info.networkInt} prefix={info.prefix} />
              <BinaryRow label="Broadcast" value={info.broadcastInt} prefix={info.prefix} />
            </div>
          </Card>

          <Card title="Position in IPv4 space" subtitle="Scale of this block against the entire address space.">
            <AddressSpacePosition info={info} />
          </Card>

          <Card
            title="Configure your network"
            subtitle="Practical values to plug into a router or DHCP server."
          >
            <ConfigHelper info={info} />
          </Card>

          <SubnetSplitter info={info} onSelect={handleSelectSplit} />

          <p className="pb-4 text-center text-xs text-ink/25">
            {formatNumber(info.totalAddresses)} total addresses &middot;{" "}
            {formatNumber(info.usableHosts)} usable for hosts
          </p>
        </>
      )}
    </div>
  );
}
