"use client";

import { useEffect, useState } from "react";
import CounterManagerView from "./CounterManagerView";
import CustomerView from "./CustomerView";
import useQueueState from "./hooks/useQueueState";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [page, setPage] = useState("customer");
  const { queue, add, remove, clear } = useQueueState();
  const [nowServing, setNowServing] = useState<number | null>(null);
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [counters, setCounters] = useState<{ status: string; servingNum: number | null }[]>(() => {
    const savedCounters = [];
    for (let i = 0; i < 4; i++) {
      savedCounters.push({ status: "online", servingNum: null });
    }
    return savedCounters;
  });

  const [num, setNum] = useState(1);

  useEffect(() => {
    // Load initial state from localStorage on client side
    const savedNowServing = JSON.parse(localStorage.getItem("nowServing") || "-1");
    setNowServing(savedNowServing);

    const savedCounters = JSON.parse(localStorage.getItem("counters") || "[]");
    if (savedCounters.length === 0) {
      for (let i = 0; i < 4; i++) {
        savedCounters.push({ status: "online", servingNum: null });
      }
    }
    setCounters(savedCounters);

    const lastNum = JSON.parse(localStorage.getItem("lastNumber") || "0");
    setLastNumber(lastNum);
    setNum(lastNum + 1);

    //reset num every 24 hours with a reset time saved at localStorage to avoid reseting num on every page refresh
    const nextResetTime = JSON.parse(localStorage.getItem("nextResetTime") || "0");
    const now = Date.now();
    if (now > nextResetTime) {
      const newResetTime = now + 24 * 60 * 60 * 1000; // 24 hours from now
      localStorage.setItem("nextResetTime", JSON.stringify(newResetTime));
      setNum(1);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("queue", JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    localStorage.setItem("nowServing", JSON.stringify(nowServing));
  }, [nowServing]);

  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  useEffect(() => {
    localStorage.setItem("lastNumber", JSON.stringify(lastNumber));
  }, [lastNumber]);

  const handleTakeNumber = () => {
    add(num);
    setLastNumber(num);
    alert(`Your number is ${num}`);
    setNum(num + 1);
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-4xl">Ticket Issuer built with Next.js and Typescript</h1>
      <br />
      {page === "customer" && <CustomerView nowServing={nowServing} lastNumber={lastNumber} onTakeNumber={handleTakeNumber} c={counters} />}
      {page === "counter" && <CounterManagerView q={queue} c={counters} setC={setCounters} nS={nowServing} setNS={setNowServing} remove={remove} clr={clear} />}
      <br />
      <br />
      <Button className="fixed bottom-4 right-8" onClick={() => setPage(page === "customer" ? "counter" : "customer")}>
        Switch to {page === "customer" ? "Manager" : "Customer"} View
      </Button>
      <br />
    </div>
  );
}
