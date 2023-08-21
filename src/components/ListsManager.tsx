import React, { useState, useRef, useEffect } from "react";
import { Node } from "../utils/utils.functions.ts";
import MemoryComponent from "./MemoryComponent.tsx";
import State from "../State";
import ErrorHandler from "../classes/ErrorHandler.ts";

interface Props {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export default function ListsManager({ nodes, setNodes }: Props) {
  const [displayDataInput, setDisplayDataInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addNode() {
    const data: number | string =
      parseInt(localStorage.getItem("new_node_data")) ||
      localStorage.getItem("new_node_data") ||
      " ";
    const newNode = new Node(data, nodes);

    if (nodes.some((node) => node.data === data)) {
      ErrorHandler.setError(true).displayError("Duplicate data.");
      return;
    }

    // Continue adding the new node if it's not a duplicate
    setNodes([...nodes, newNode]);
    localStorage.removeItem("new_node_data");

    const dataLength = typeof data === "number" ? 4 : data.length + 1;
    State.occupyMemory(dataLength, data, newNode.own_address);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addNode();
      setDisplayDataInput(false);
    }
  }

  useEffect(() => {
    if (displayDataInput && inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        setDisplayDataInput(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [displayDataInput]);

  return (
    <div className="bg-slate-800 col-span-2 border-t border-slate-700 h-full xl:block hidden">
      <div className="text-center mt-2">List Manager</div>
      <div className="flex flex-col place-content-between h-[95%]">
        <div className="flex flex-col items-center p-3">
          {displayDataInput ? (
            <div className="flex flex-col items-center w-full">
              <input
                type="text"
                ref={inputRef}
                className="bg-slate-700 p-2 rounded-lg mb-2 w-full text-sm border-t border-slate-600"
                placeholder="Data"
                onChange={(e) => {
                  localStorage.setItem("new_node_data", e.target.value);
                }}
                onKeyDown={handleInputKeyDown}
              />
              <button
                className="bg-slate-700 py-2 text-sm font-medium w-full rounded-lg mb-2 transition duration-1 hover:bg-slate-600 border-t border-slate-600 hover:border-slate-500"
                onClick={() => {
                  addNode();
                  setDisplayDataInput(false);
                }}
              >
                Add
              </button>
            </div>
          ) : (
            <button
              className="bg-slate-700 py-2 text-sm font-medium w-full rounded-lg mb-2 transition duration-1 hover:bg-slate-600 border-t border-slate-600 hover:border-slate-500 [&>span]:hover:bg-slate-700 [&>span]:hover:border-slate-600 [&>span]:transition [&>span]:duration-1"
              onClick={() => setDisplayDataInput(true)}
            >
              Add Node
              <span className="ml-3 bg-slate-600 py-1 px-3 rounded-md border-slate-500 border-t text-slate-400 text-xs">
                CTRL
              </span>
              <span className="ml-1 bg-slate-600 py-1 px-3 rounded-md border-slate-500 border-t text-slate-400 text-xs">
                Y
              </span>
            </button>
          )}
        </div>
        <div className="flex items-center flex-col">
          <div className="text-left w-full ml-[4rem] mb-1">
            Memory
            <span className="ml-2 text- text-slate-500 font-medium">
              {State.memorySize} BYTES
            </span>
          </div>
          <MemoryComponent></MemoryComponent>
        </div>
      </div>
    </div>
  );
}
