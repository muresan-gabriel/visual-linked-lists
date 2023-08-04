import React, { useState } from "react";
import ListsContainer from "../components/ListsContainer.tsx";
import ListsManager from "../components/ListsManager.tsx";
import ConfigurationMenu from "../components/ConfigurationMenu.tsx";

import ListNode from "../interfaces/ListNode.ts";
import Connector from "../interfaces/Connector.ts";

import { Cog6ToothIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Homepage() {
  const [nodes, setNodes] = useState<ListNode[]>([]);
  const [connectors, setConnectors] = useState<Connector[]>([]);

  const [displayConfigMenu, setDisplayConfigMenu] = useState<boolean>(false);

  return (
    <main className="h-full p-5">
      <div className="flex place-content-between flex items-center">
        <div className="font-bold text-lg ml-5">Visual Linked Lists</div>
        <button
          onClick={() => setDisplayConfigMenu(!displayConfigMenu)}
          className="bg-slate-900 px-10 py-2 rounded-xl flex  items-center border-t border-slate-800 transition duration-1 hover:bg-slate-800 hover:border-slate-700"
        >
          <div className="mr-3 font-medium flex items-center">
            <Cog6ToothIcon className="w-4 h-4 text-slate-200 mr-1" />
            Configuration
          </div>
          <ChevronDownIcon className="w-4 h-4 text-slate-200" />
        </button>
        <ConfigurationMenu
          display={displayConfigMenu}
          nodes={nodes}
          setNodes={setNodes}
          connectors={connectors}
          setConnectors={setConnectors}
        />
      </div>
      <div className="grid grid-cols-9 gap-4 py-5 h-full [&>div]:rounded-2xl">
        <ListsContainer
          nodes={nodes}
          setNodes={setNodes}
          connectors={connectors}
          setConnectors={setConnectors}
        />
        <ListsManager nodes={nodes} setNodes={setNodes} />
      </div>
    </main>
  );
}
