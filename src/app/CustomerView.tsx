import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface CustomerViewProps {
  nowServing: number | null;
  lastNumber: number | null;
  onTakeNumber: () => void;
  c: { status: string; servingNum: number | null }[];
}

const CustomerView: React.FC<CustomerViewProps> = ({ nowServing, lastNumber, onTakeNumber, c }) => {
  return (
    <div>
      <br />
      <Card className="text-2xl flex flex-col items-center mx-auto w-96">
        <CardHeader>
          <CardTitle className="my-2 flex flex-row items-center justify-center">
            Now Serving:
            <span
              className="relative mx-2 flex items-center justify-center w-14 h-14 rounded-full text-xl font-bold
                 bg-primary text-primary-foreground"
            >
              {nowServing}
            </span>
          </CardTitle>
          <CardTitle className="my-2 flex flex-row items-center justify-center">
            Last Number:
            <span
              className="relative mx-2 flex items-center justify-center w-14 h-14 rounded-full text-xl font-bold
                 bg-primary text-primary-foreground"
            >
              {lastNumber}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button size={"lg"} className="border-2" onClick={onTakeNumber}>
            🏷 Take a Number
          </Button>
        </CardContent>
      </Card>
      <br />
      <br />
      <div className="grid grid-cols-4 gap-4">
        {c.map((counter, index) => (
          <Card key={index + 1} className="relative grid grid-rows-2 gap-4 text-center items-center justify-items-center">
            <div className={`absolute top-2 right-2 w-4 h-4 rounded-full ${counter.status === "online" ? "bg-green-500" : counter.status === "busy" ? "bg-red-500" : "bg-gray-300"}`} />
            <CardHeader>
              <CardTitle className={`text-2xl ${counter.status === "offline" ? "text-gray-300" : ""}`}>Counter {index + 1}</CardTitle>
            </CardHeader>
            <CardContent
              className={`relative flex items-center justify-center w-14 h-14 rounded-full ${counter.servingNum ? "text-xl" : "text-md"} font-bold
               ${counter.status === "offline" ? "bg-gray-300 text-white" : "bg-primary text-primary-foreground"} `}
            >
              {counter.status === "offline" ? "Offline" : counter.servingNum || "Ready"}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerView;
