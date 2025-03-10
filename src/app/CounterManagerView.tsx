import { useState } from "react";
import NumberQueue from "../components/NumberQueue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CounterManagerViewProps {
  q: number[];
  c: { status: string; servingNum: number | null }[];
  setC: React.Dispatch<React.SetStateAction<{ status: string; servingNum: number | null }[]>>;
  nS: number | null;
  setNS: React.Dispatch<React.SetStateAction<number | null>>;
  remove: (num: number) => void;
  clr: () => void;
}

const CounterManagerView: React.FC<CounterManagerViewProps> = ({ q, c, setC, nS, setNS, remove, clr }) => {
  const [draggedTicket, setDraggedTicket] = useState<number | null>(null);

  const handleDragEnter = (e: React.DragEvent, counterIndex: number) => {
    if (c[counterIndex].status !== "online") {
      e.currentTarget.classList.add("cursor-not-allowed");
    }
  };

  const handleDragOver = (e: React.DragEvent, counterIndex: number) => {
    e.preventDefault(); // Allow dropping

    if (c[counterIndex].status != "online") {
      return;
    }

    // Highlight the drop target
    e.currentTarget.classList.add("bg-primary", "text-primary-foreground");
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault(); // Allow dropping

    if (e.currentTarget.classList.contains("cursor-not-allowed")) {
      e.currentTarget.classList.remove("cursor-not-allowed");
    }

    // Remove the highlight
    e.currentTarget.classList.remove("bg-primary", "text-primary-foreground");
  };

  const handleDrop = (e: React.DragEvent, counterIndex: number) => {
    e.preventDefault();
    if (draggedTicket === null) return;

    if (c[counterIndex].status != "online") {
      alert("Counter is busy");
      return;
    }

    // Assign the ticket to the counter
    setC((prevCounters) => prevCounters.map((counter, index) => (index === counterIndex ? { ...counter, servingNum: draggedTicket, status: "busy" } : counter)));

    // Remove the ticket from the queue
    remove(draggedTicket);
    setDraggedTicket(null);

    // Set the now serving number
    setNS(draggedTicket);

    //Start a timer to simulate serving time (for demonstration)
    setTimeout(() => {
      if (nS == c[counterIndex].servingNum) setNS(null);
      setC((prevCounters) => prevCounters.map((counter, index) => (index === counterIndex ? { ...counter, servingNum: null, status: "online" } : counter)));
    }, 5000);

    // Remove the highlight
    e.currentTarget.classList.remove("bg-primary", "text-primary-foreground");
  };

  const handleClear = () => {
    clr();
    setC((prevCounters) => prevCounters.map((counter) => ({ ...counter, servingNum: null, status: "online" })));
  };

  return (
    <div>
      <p className="text-center font-semibold">Drag and drop the front number to any ready counter.</p>
      <br />
      <br />
      {<NumberQueue numbers={q} setDraggedTicket={setDraggedTicket} />}
      <br />
      <br />
      <div className="grid grid-cols-2 gap-4">
        {c.map((counter, index) => (
          <Card
            key={index + 1}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={onDragLeave}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            className="relative grid grid-rows-2 gap-4 text-center items-center justify-items-center"
          >
            <div className={`absolute top-2 right-2 w-4 h-4 rounded-full ${counter.status === "online" ? "bg-green-500" : counter.status === "busy" ? "bg-red-500" : "bg-gray-300"}`} />
            {counter.status === "busy" ? (
              ""
            ) : (
              <Button
                className="absolute top-0 left-2 btn mt-2"
                onClick={() => {
                  setC((prevCounters) => prevCounters.map((counter, i) => (i === index ? { ...counter, status: counter.status === "online" ? "offline" : "online" } : counter)));
                }}
              >
                {counter.status === "online" ? "Go Offline" : "Go Online"}
              </Button>
            )}
            <CardHeader>
              <CardTitle className={`text-2xl ${counter.status === "offline" ? "text-gray-300" : ""}`}>Counter {index + 1}</CardTitle>
            </CardHeader>
            <CardContent
              className={`relative flex items-center justify-center w-14 h-14 rounded-full font-bold
                      ${counter.status === "offline" ? "bg-gray-300 text-white" : counter.servingNum ? "text-xl bg-primary text-primary-foreground" : "text-md bg-secondary text-black"}  `}
            >
              {counter.status === "offline" ? "Offline" : counter.servingNum || "Ready"}
            </CardContent>
          </Card>
        ))}
      </div>
      <br />
      <br />
      <button className="btn hover:cursor-pointer underline text-red-500" onClick={handleClear}>
        Clear Queue
      </button>
    </div>
  );
};

export default CounterManagerView;
