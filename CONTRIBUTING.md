# Contributing

Thanks for considering a contribution to Subnet Visualizer!

## Local setup

```bash
git clone https://github.com/dendycodes/subnet-visualizer.git
cd subnet-visualizer
pnpm install
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000) with hot reload.

## Before opening a PR

```bash
pnpm lint            # ESLint
pnpm exec tsc --noEmit  # type-check
pnpm build            # make sure it builds
```

All three should pass cleanly.

## Guidelines

- Keep subnet math in `src/lib/subnet.ts` — it's pure and framework-agnostic
  by design, don't couple it to React.
- Match the existing visual language: dark glass panels, the sky/fuchsia
  network/host color pairing, and Framer Motion for state transitions rather
  than instant snaps.
- Prefer small, focused components (see `src/components/`) over adding more
  responsibility to `SubnetCalculator.tsx`.
- No unnecessary comments — code should read clearly on its own; only comment
  non-obvious *why*, not *what*.
- Test the golden path (a normal address like `192.168.1.10/24`) and the edge
  cases (`/0`, `/31`, `/32`) in the browser before submitting.

## Reporting bugs / requesting features

Open an issue with:
- What you expected vs. what happened
- The IP/prefix combination that triggers it, if relevant
- Browser/OS if it's a rendering issue

## License

By contributing, you agree your contributions will be licensed under the
project's [MIT License](./LICENSE).
