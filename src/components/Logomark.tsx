export default function Logomark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Subnet Visualizer logo"
    >
      <rect width="64" height="64" rx="14" fill="#05070d" stroke="rgba(255,255,255,0.08)" />
      <rect x="9" y="9" width="21" height="21" rx="6" fill="#38bdf8" />
      <rect x="34" y="9" width="21" height="21" rx="6" fill="#38bdf8" />
      <rect x="9" y="34" width="21" height="21" rx="6" fill="#e879f9" />
      <rect x="34" y="34" width="21" height="21" rx="6" fill="#e879f9" />
    </svg>
  );
}
