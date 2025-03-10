import { ArrowRight } from "lucide-react";

interface NumberQueueProps {
  numbers: number[];
  className?: string;
  setDraggedTicket: (ticket: number) => void;
}

export default function NumberQueue({ numbers, className = "", setDraggedTicket }: NumberQueueProps) {
  const handleDragStart = (e: React.DragEvent, ticket: number) => {
    setDraggedTicket(ticket);
    e.dataTransfer.setData("text/plain", ticket.toString());
  };

  if (numbers.length === 0) {
    return <div className={`text-center ${className}`}>Empty queue</div>;
  }

  // If there are 6 or fewer numbers, show all of them
  if (numbers.length <= 6) {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="flex items-center gap-2">
          {numbers.map((num, index) => {
            const isFront = index === 0;
            const isBack = index === numbers.length - 1;

            return (
              <div
                key={index}
                className={`relative flex items-center justify-center w-14 h-14 rounded-full text-xl font-bold
                  ${isFront ? "bg-green-600 text-white" : isBack ? "bg-amber-500 text-white" : "bg-primary text-primary-foreground"}`}
                draggable={isFront ? true : false}
                onDragStart={isFront ? (e) => handleDragStart(e, num) : undefined}
              >
                {num}
                {isFront && <div className="absolute -top-8 text-sm font-medium text-green-600">Front</div>}
                {isBack && <div className="absolute -bottom-8 text-sm font-medium text-amber-500">Back</div>}
              </div>
            );
          })}
        </div>
        <ArrowRight className="text-gray-400 mt-6" size={24} />
      </div>
    );
  }

  // Otherwise, show first 3, ellipsis, and last 3
  const firstThree = numbers.slice(0, 3);
  const lastThree = numbers.slice(-3);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        {firstThree.map((num, index) => {
          const isFront = index === 0;

          return (
            <div
              key={index}
              className={`relative flex items-center justify-center w-14 h-14 rounded-full text-xl font-bold
                ${isFront ? "bg-green-600 text-white" : "bg-primary text-primary-foreground"}`}
              draggable={isFront ? true : false}
              onDragStart={isFront ? (e) => handleDragStart(e, num) : undefined}
            >
              {num}
              {isFront && <div className="absolute -top-8 text-sm font-medium text-green-600">Front</div>}
            </div>
          );
        })}

        <div className="flex items-center justify-center px-2">
          <span className="text-2xl font-medium">...</span>
        </div>

        {lastThree.map((num, index) => {
          const isBack = index === lastThree.length - 1;

          return (
            <div
              key={index}
              className={`relative flex items-center justify-center w-14 h-14 rounded-full text-xl font-bold
                ${isBack ? "bg-amber-500 text-white" : "bg-primary text-primary-foreground"}`}
            >
              {num}
              {isBack && <div className="absolute -bottom-8 text-sm font-medium text-amber-500">Back</div>}
            </div>
          );
        })}
      </div>
      <ArrowRight className="text-gray-400 mt-6" size={24} />
    </div>
  );
}
