import { intToBinary } from "@/lib/subnet";

export default function BinaryRow({
  label,
  value,
  prefix,
  splitColor = true,
}: {
  label: string;
  value: number;
  prefix: number;
  splitColor?: boolean;
}) {
  const bits = intToBinary(value);
  const groups = [0, 1, 2, 3].map((o) => bits.slice(o * 8, o * 8 + 8));

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
      <span className="text-xs font-medium uppercase tracking-wider text-ink/60 dark:text-ink/40 sm:w-32">
        {label}
      </span>
      <div className="mono flex flex-wrap gap-x-2.5 gap-y-1 text-sm">
        {groups.map((g, gi) => (
          <span key={gi} className="flex">
            {g.split("").map((bit, bi) => {
              const globalIndex = gi * 8 + bi;
              const isNetwork = globalIndex < prefix;
              return (
                <span
                  key={bi}
                  className={
                    splitColor
                      ? isNetwork
                        ? "text-sky-600 dark:text-sky-400"
                        : "text-fuchsia-600 dark:text-fuchsia-400"
                      : "text-ink/85 dark:text-ink/70"
                  }
                >
                  {bit}
                </span>
              );
            })}
          </span>
        ))}
      </div>
    </div>
  );
}
