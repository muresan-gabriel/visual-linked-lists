import { useState } from "react";
import ListsContainer from "../components/ListsContainer";
import ListsManager from "../components/ListsManager";

export default function Homepage() {
  const [nodes, setNodes] = useState([]);
  const [connectors, setConnectors] = useState([]);

  return (
    <main className="h-full p-5">
      <div className="flex place-content-between">
        <div>Visual Linked Lists</div>
        <div>Config</div>
      </div>
      <div className="grid grid-cols-9 gap-4 py-5 h-full [&>div]:rounded-2xl">
        <ListsContainer
          nodes={nodes}
          setNodes={setNodes}
          connectors={connectors}
          setConnectors={setConnectors}
        ></ListsContainer>
        <ListsManager nodes={nodes} setNodes={setNodes}></ListsManager>
      </div>
    </main>
  );
}
