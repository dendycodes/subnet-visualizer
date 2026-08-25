<div align="center">
<img src="public/logo.svg" width="72" height="72" alt="Subnet Visualizer logo" />

# Subnet Visualizer

**An animated IPv4 subnet calculator that shows you the *why*, not just the numbers.**

Type an address, drag the prefix, and watch the network/host bit split, address
ranges, host maps, and subnet splits animate in real time.

[![License: MIT](https://img.shields.io/badge/license-MIT-38bdf8?style=flat-square)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-E879F9?style=flat-square&logo=framer&logoColor=white)](https://motion.dev/)

<sub>Built by <a href="https://github.com/dendycodes">@dendycodes</a></sub>

</div>

---

## Table of contents

- [Why this exists](#why-this-exists)
- [Features](#-features)
- [Tech stack](#-tech-stack)
- [Getting started](#-getting-started)
- [Project structure](#-project-structure)
- [How the math works](#-how-the-math-works)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## Why this exists

Most subnet calculators hand you eight fields of output and leave you to
mentally reconstruct what a `/27` actually *means*. Subnet Visualizer instead
treats subnetting as something you can **see**: which bits belong to the
network, where the usable host range sits, how big a block really is next to
the full IPv4 space, and what a split into smaller subnets looks like as an
actual network topology — all animated, all live as you type.

## ✨ Features

| | |
|---|---|
| 🔢 **Live IP/CIDR input** | Type an address or paste `192.168.1.0/24` directly; a draggable prefix slider (with quick presets) updates everything instantly. |
| 🎛️ **Bit-level visualization** | All 32 bits rendered as animated squares, colored by network (blue) vs. host (pink) portion, flipping live as the prefix changes. |
| 📏 **Address range bar** | Network, usable host range, and broadcast address shown as proportionally animated segments. |
| 🖥️ **Host map** | Every address in blocks up to `/24` drawn as a physical, color-coded dot (network / gateway / usable host / broadcast), with hover tooltips. |
| 📇 **Result cards** | Network, broadcast, mask, wildcard mask, first/last usable host, plus animated count-up totals. Click any card to copy its value. |
| 🧮 **Binary breakdown** | IP, mask, network, and broadcast addresses as color-coded binary rows. |
| 🌍 **Position in IPv4 space** | A bar showing how large the current block is relative to the entire IPv4 address space. |
| ⚙️ **Config helper** | A suggested gateway IP, a suggested DHCP pool, and a copyable router-config snippet. |
| 🕸️ **Subnet splitter as a topology diagram** | Divide the network into equal subnets and see them rendered as a router-and-subnets diagram; click one to load it back into the calculator. |
| 🌗 **Light & dark themes** | A persisted toggle switches the whole UI — panels, gradients, accent colors — between a dark and a light theme. |

## 🧰 Tech stack

- [Next.js 16](https://nextjs.org/) — App Router, Turbopack
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) for every transition and animation
- [next-themes](https://github.com/pacocoursey/next-themes) for the light/dark toggle

## 🚀 Getting started

Requires **Node.js 20.9+** and a package manager (examples below use pnpm;
npm/yarn/bun work too).

```bash
git clone https://github.com/dendycodes/subnet-visualizer.git
cd subnet-visualizer
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

<details>
<summary><strong>Other scripts</strong></summary>

```bash
pnpm build   # production build
pnpm start   # run the production build
pnpm lint    # eslint
```

</details>

## 🗂 Project structure

<details>
<summary>Expand file tree</summary>

```
src/
  app/
    layout.tsx               Root layout, fonts, metadata
    page.tsx                 Home page: background + calculator + footer
    globals.css               Theme tokens, glass/gradient utilities, keyframes
  components/
    SubnetCalculator.tsx        Top-level state (IP + prefix) and page composition
    IpInput.tsx                   IP/CIDR text field + prefix slider + presets
    BitGrid.tsx                     32-bit animated network/host bit visualization
    BinaryRow.tsx                     Compact binary representation of a value
    AddressRangeBar.tsx                 Network / host-range / broadcast segmented bar
    HostGrid.tsx                          Per-address host map (dots colored by role)
    AddressSpacePosition.tsx                Block size/position within the full IPv4 space
    ResultCard.tsx                            Copyable stat card
    AnimatedNumber.tsx                          Spring-animated count-up number
    ClassBadges.tsx                               IP class / private-public / CIDR badges
    ConfigHelper.tsx                                Gateway/DHCP suggestions + config snippet
    SubnetSplitter.tsx                                Subnet splitting as a topology diagram
    Card.tsx                                            Shared glass panel wrapper
    GlowBackground.tsx                                    Animated gradient background
    Footer.tsx                                              Author card
    ThemeProvider.tsx                                         next-themes wrapper
    ThemeToggle.tsx                                             Light/dark toggle button
  lib/
    subnet.ts                 All subnet math: parsing, masks, ranges, splitting
```

</details>

## 🧠 How the math works

All subnetting logic lives in [`src/lib/subnet.ts`](./src/lib/subnet.ts) and
is completely framework-agnostic — pure functions operating on IPv4 addresses
as 32-bit unsigned integers:

```ts
ipToInt(ip)                    // "192.168.1.10" → 3232235786
intToIp(int)                   // 3232235786 → "192.168.1.10"
getSubnetInfo(ip, prefix)      // full breakdown: network, broadcast, mask, host range, class...
splitSubnet(info, newPrefix)   // divide a block into equal, smaller subnets
```

No dependencies, no framework coupling — easy to unit test or lift into
another project entirely.

## 🌐 Deployment

Deploys cleanly to any Next.js host (e.g. [Vercel](https://vercel.com/new)). Set
`NEXT_PUBLIC_SITE_URL` to your production URL so the generated Open Graph/social
preview image resolves to an absolute URL:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for local
setup, the pre-PR checklist, and style guidelines.

## 📄 License

Released under the [MIT License](./LICENSE) © [dendycodes](https://github.com/dendycodes).

<div align="center">
<sub>If this helped you understand subnetting, a ⭐ on the repo is always appreciated.</sub>
</div>
