import { Node } from "../utils/utils.functions.js";

export default function ListsManager({ nodes, setNodes }) {
  function addNode() {
    const newNode = new Node("Test Data");
    setNodes([...nodes, newNode]);
  }

  return (
    <div className="bg-slate-800 col-span-2">
      <div className="text-center mt-2">List Manager</div>
      <div className="flex flex-col items-center p-3">
        <button
          className="bg-slate-700 py-2 text-sm font-medium w-full rounded-lg mb-2 transition duration-1 hover:bg-slate-600"
          onClick={addNode}
        >
          Add Node
        </button>
        <button className="bg-slate-700 py-2 text-sm font-medium w-full rounded-lg mb-2 transition duration-1 hover:bg-slate-600">
          Remove Node
        </button>
      </div>
    </div>
  );
}
