"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = ""
}: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 22, stiffness: 90 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => setDisplay(Math.round(latest)));
  }, [springValue]);

  return (
    <motion.span>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
