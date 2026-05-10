"use client";

import { motion } from "motion/react";

const dotVariants = {
  pulse: (delay = 0) => ({
    scale: [1, 1.5, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  }),
};

function Loading() {
  return (
    <div className="container">
      <motion.div className="dot" variants={dotVariants} animate="pulse" custom={0} />
      <motion.div className="dot" variants={dotVariants} animate="pulse" custom={0.2} />
      <motion.div className="dot" variants={dotVariants} animate="pulse" custom={0.4} />
      <StyleSheet />
    </div>
  );
}

function StyleSheet() {
  return (
    <style>
      {`
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 40vh;
        gap: 20px;
      }

      .dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(135deg, #16a34a, #f59e0b);
        will-change: transform;
      }
      `}
    </style>
  );
}

export default Loading;
