import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

export function BackgroundGradientDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
      <div className="absolute inset-0 -z-10 bg-white dark:bg-black rounded-xl" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl group-hover/card:opacity-100 group-hover/card:blur-xl transition duration-500" />
      {children}
    </div>
  );
}
