import React, { useState, useRef, useEffect } from "react";
import { Node } from "../utils/utils.functions.ts";

interface Props {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export default function ListsManager({ nodes, setNodes }: Props) {
  const [displayDataInput, setDisplayDataInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input element

  function addNode() {
    const newNode = new Node(
      localStorage.getItem("new_node_data") || " ",
      nodes
    );
    localStorage.removeItem("new_node_data");
    setNodes([...nodes, newNode]);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addNode();
      setDisplayDataInput(false);
    }
  }

  useEffect(() => {
    if (displayDataInput && inputRef.current) {
      inputRef.current.focus(); // Focus the input element when it's displayed
    }

    // Add event listener for keydown on the document
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault(); // Prevent the default browser behavior (e.g., redo)
        setDisplayDataInput(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [displayDataInput]);

  return (
    <div className="bg-slate-800 col-span-2 border-t border-slate-700">
      <div className="text-center mt-2">List Manager</div>
      <div className="flex flex-col items-center p-3">
        {displayDataInput ? (
          <div className="flex flex-col items-center w-full">
            <input
              type="text"
              ref={inputRef} // Use the ref for the input element
              className="bg-slate-700 p-2 rounded-lg mb-2 w-full text-sm border-t border-slate-600"
              placeholder="Data"
              onChange={(e) => {
                localStorage.setItem("new_node_data", e.target.value);
              }}
              onKeyDown={handleInputKeyDown} // Call handleInputKeyDown on key press
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
    </div>
  );
}
