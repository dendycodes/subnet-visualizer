"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function AnimatedNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const spring = useSpring(value, { stiffness: 120, damping: 20, mass: 0.6 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("en-US"));
  const [text, setText] = useState(value.toLocaleString("en-US"));
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      setText(value.toLocaleString("en-US"));
    }
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return unsub;
  }, [display]);

  return (
    <motion.span className={className} aria-live="polite">
      {text}
    </motion.span>
  );
}
