import React from "react";
import State from "../State";

export default function MemoryComponent() {
  return (
    <div className="grid grid-rows-4 grid-cols-16 2xl:gap-[5px] gap-[2px] mb-5">
      {State.memory.map((cell, index) =>
        cell.occupiedBy ? (
          <div
            title={`Data: ${cell.occupiedBy}, Address: ${cell.address}, Type: ${cell.type}`}
            className={`${
              cell.occupiedBy
                ? cell.type === "number"
                  ? "bg-indigo-500 border-indigo-400"
                  : cell.type === "pointer"
                  ? "bg-amber-500 border-amber-400"
                  : "bg-green-500 border-green-400"
                : "bg-slate-500"
            } border-t col-span-1 2xl:p-2 p-[0.45rem] rounded-md max-w-[10px] row-span-1`}
            key={index}
          ></div>
        ) : (
          <div
            className="bg-slate-500 border-t border-slate-400 col-span-1 2xl:p-2 p-[0.45rem] rounded-md max-w-[10px] row-span-1"
            key={index}
          ></div>
        )
      )}
    </div>
  );
}
