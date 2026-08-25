# Subnet Visualizer

An animated IPv4 subnet calculator that shows you the *why*, not just the numbers.
Type an address, drag the prefix, and watch the network/host bit split, address
ranges, host maps, and subnet splits animate in real time — built to help you
actually understand subnetting, not just get an answer.

Built by [@dendycodes](https://github.com/dendycodes).

## Features

- **Live IP/CIDR input** — type an address or paste `192.168.1.0/24` directly;
  a draggable prefix slider (with quick presets) updates everything instantly.
- **Bit-level visualization** — all 32 bits of the address rendered as animated
  squares, colored by network (blue) vs. host (pink) portion, flipping live as
  you change the prefix.
- **Address range bar** — network, usable host range, and broadcast address
  shown as proportionally animated segments.
- **Host map** — every individual address in blocks up to `/24` drawn as a
  physical, color-coded dot (network / gateway / usable host / broadcast),
  with hover tooltips showing the exact IP.
- **Result cards** — network address, broadcast, subnet mask, wildcard mask,
  first/last usable host, and animated count-up totals for usable hosts and
  total addresses. Click any card to copy its value.
- **Binary breakdown** — IP, mask, network, and broadcast addresses rendered
  as color-coded binary rows.
- **Position in IPv4 space** — a bar showing how large the current block is
  relative to the entire IPv4 address space.
- **Network configuration helper** — a suggested gateway IP, a suggested DHCP
  pool, and a copyable router-config snippet you can drop straight into a
  router or DHCP server.
- **Subnet splitter as a topology diagram** — divide the current network into
  equal subnets and see them rendered as an actual router-and-subnets diagram;
  click any subnet to load it back into the calculator.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) for animation

## Getting started

Requires Node.js 20.9+ and a package manager (examples below use pnpm; npm/yarn/bun work too).

```bash
git clone https://github.com/dendycodes/subnet-visualizer.git
cd subnet-visualizer
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
pnpm build   # production build
pnpm start   # run the production build
pnpm lint    # eslint
```

## Project structure

```
src/
  app/
    layout.tsx        Root layout, fonts, metadata
    page.tsx           Home page: background + calculator + footer
    globals.css         Theme tokens, glass/gradient utilities, keyframes
  components/
    SubnetCalculator.tsx  Top-level state (IP + prefix) and page composition
    IpInput.tsx            IP/CIDR text field + prefix slider + presets
    BitGrid.tsx             32-bit animated network/host bit visualization
    BinaryRow.tsx            Compact binary representation of a value
    AddressRangeBar.tsx      Network / host-range / broadcast segmented bar
    HostGrid.tsx              Per-address host map (dots colored by role)
    AddressSpacePosition.tsx  Block size/position within the full IPv4 space
    ResultCard.tsx             Copyable stat card
    AnimatedNumber.tsx          Spring-animated count-up number
    ClassBadges.tsx              IP class / private-public / CIDR badges
    ConfigHelper.tsx              Gateway/DHCP suggestions + config snippet
    SubnetSplitter.tsx             Subnet splitting as a topology diagram
    Card.tsx                        Shared glass panel wrapper
    GlowBackground.tsx               Animated gradient background
    Footer.tsx                        Author card
  lib/
    subnet.ts          All subnet math: parsing, masks, ranges, splitting
```

All subnetting math lives in `src/lib/subnet.ts` and is framework-agnostic —
pure functions operating on IPv4 addresses as 32-bit unsigned integers
(`ipToInt`, `intToIp`, `getSubnetInfo`, `splitSubnet`, etc.), so it's easy to
unit test or reuse outside the UI.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for local
setup and guidelines.

## License

[MIT](./LICENSE) © dendycodes
