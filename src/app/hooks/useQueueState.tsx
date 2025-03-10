//define the custom hook for adding, removing and clearing a queue state
"use client";

import { useState } from "react";

export default function useQueueState() {
  const [queue, setQueue] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const savedQueue = JSON.parse(localStorage.getItem("queue") || "[]");
      return savedQueue;
    }
    return [];
  });

  const add = (num: number) => {
    setQueue((prev) => [...prev, num]);
  };

  const remove = () => {
    const removed = queue[0];
    setQueue((prev) => prev.slice(1));
    return removed;
  };

  const clear = () => {
    setQueue([]);
  };

  return { queue, add, remove, clear };
}
