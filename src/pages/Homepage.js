import { useState } from "react";
import ListsContainer from "../components/ListsContainer";
import ListsManager from "../components/ListsManager";

export default function Homepage() {
  const [nodes, setNodes] = useState([]);

  return (
    <main className="h-full p-5">
      Visual Linked Lists
      <div className="grid grid-cols-9 gap-4 py-5 h-full [&>div]:rounded-2xl">
        <ListsContainer nodes={nodes} setNodes={setNodes}></ListsContainer>
        <ListsManager nodes={nodes} setNodes={setNodes}></ListsManager>
      </div>
    </main>
  );
}
