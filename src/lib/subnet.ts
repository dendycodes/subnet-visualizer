export interface SubnetInfo {
  ip: string;
  prefix: number;
  ipInt: number;
  maskInt: number;
  wildcardInt: number;
  networkInt: number;
  broadcastInt: number;
  firstHostInt: number;
  lastHostInt: number;
  totalAddresses: number;
  usableHosts: number;
  ipClass: string;
  isPrivate: boolean;
}

export class SubnetError extends Error {}

export function ipToInt(ip: string): number {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) throw new SubnetError("IPv4 address needs 4 octets");
  let result = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) throw new SubnetError(`Invalid octet "${part}"`);
    const n = Number(part);
    if (n < 0 || n > 255) throw new SubnetError(`Octet "${part}" out of range (0-255)`);
    result = (result << 8) | n;
  }
  return result >>> 0;
}

export function intToIp(int: number): string {
  return [24, 16, 8, 0].map((shift) => (int >>> shift) & 255).join(".");
}

export function intToBinary(int: number): string {
  return (int >>> 0).toString(2).padStart(32, "0");
}

export function prefixToMaskInt(prefix: number): number {
  if (prefix === 0) return 0;
  return (0xffffffff << (32 - prefix)) >>> 0;
}

export function maskIntToPrefix(maskInt: number): number {
  let bits = 0;
  let n = maskInt >>> 0;
  while (n) {
    bits += n & 1;
    n >>>= 1;
  }
  return bits;
}

function classifyIp(ipInt: number): string {
  const firstOctet = (ipInt >>> 24) & 255;
  if (firstOctet < 128) return "A";
  if (firstOctet < 192) return "B";
  if (firstOctet < 224) return "C";
  if (firstOctet < 240) return "D (Multicast)";
  return "E (Reserved)";
}

function isPrivateIp(ipInt: number): boolean {
  const a = (ipInt >>> 24) & 255;
  const b = (ipInt >>> 16) & 255;
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 127) return true;
  if (a === 169 && b === 254) return true;
  return false;
}

export function getSubnetInfo(ip: string, prefix: number): SubnetInfo {
  if (prefix < 0 || prefix > 32) throw new SubnetError("Prefix must be between 0 and 32");
  const ipInt = ipToInt(ip);
  const maskInt = prefixToMaskInt(prefix);
  const wildcardInt = ~maskInt >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;
  const totalAddresses = 2 ** (32 - prefix);

  let firstHostInt = networkInt;
  let lastHostInt = broadcastInt;
  let usableHosts = 0;

  if (prefix <= 30) {
    firstHostInt = (networkInt + 1) >>> 0;
    lastHostInt = (broadcastInt - 1) >>> 0;
    usableHosts = totalAddresses - 2;
  } else if (prefix === 31) {
    firstHostInt = networkInt;
    lastHostInt = broadcastInt;
    usableHosts = 2;
  } else {
    firstHostInt = networkInt;
    lastHostInt = broadcastInt;
    usableHosts = 1;
  }

  return {
    ip,
    prefix,
    ipInt,
    maskInt,
    wildcardInt,
    networkInt,
    broadcastInt,
    firstHostInt,
    lastHostInt,
    totalAddresses,
    usableHosts,
    ipClass: classifyIp(ipInt),
    isPrivate: isPrivateIp(ipInt),
  };
}

export interface SubnetSplit {
  index: number;
  networkInt: number;
  broadcastInt: number;
  firstHostInt: number;
  lastHostInt: number;
  totalAddresses: number;
  usableHosts: number;
}

export function splitSubnet(info: SubnetInfo, newPrefix: number): SubnetSplit[] {
  if (newPrefix < info.prefix) throw new SubnetError("New prefix must be >= current prefix");
  if (newPrefix > 32) throw new SubnetError("Prefix cannot exceed 32");
  const count = 2 ** (newPrefix - info.prefix);
  const blockSize = 2 ** (32 - newPrefix);
  const splits: SubnetSplit[] = [];
  for (let i = 0; i < count; i++) {
    const networkInt = (info.networkInt + i * blockSize) >>> 0;
    const broadcastInt = (networkInt + blockSize - 1) >>> 0;
    let firstHostInt = networkInt;
    let lastHostInt = broadcastInt;
    let usableHosts = 0;
    if (newPrefix <= 30) {
      firstHostInt = (networkInt + 1) >>> 0;
      lastHostInt = (broadcastInt - 1) >>> 0;
      usableHosts = blockSize - 2;
    } else if (newPrefix === 31) {
      usableHosts = 2;
    } else {
      usableHosts = 1;
    }
    splits.push({
      index: i,
      networkInt,
      broadcastInt,
      firstHostInt,
      lastHostInt,
      totalAddresses: blockSize,
      usableHosts,
    });
  }
  return splits;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}
