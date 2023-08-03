import React from "react";
import { Node } from "../utils/utils.functions.ts";

interface Props {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export default function ListsManager({ nodes, setNodes }: Props) {
  function addNode() {
    const newNode = new Node("Test Data", nodes);
    setNodes([...nodes, newNode]);
  }

  return (
    <div className="bg-slate-800 col-span-2 border-t border-slate-700">
      <div className="text-center mt-2">List Manager</div>
      <div className="flex flex-col items-center p-3">
        <button
          className="bg-slate-700 py-2 text-sm font-medium w-full rounded-lg mb-2 transition duration-1 hover:bg-slate-600 border-t border-slate-600 hover:border-slate-500"
          onClick={addNode}
        >
          Add Node
        </button>
      </div>
    </div>
  );
}
