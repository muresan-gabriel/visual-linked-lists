import React, { useState } from "react";
import ListsContainer from "../components/ListsContainer.tsx";
import ListsManager from "../components/ListsManager.tsx";
import ConfigurationMenu from "../components/ConfigurationMenu.tsx";

import ListNode from "../interfaces/ListNode.ts";
import Connector from "../interfaces/Connector.ts";

import { Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function Homepage() {
  const [nodes, setNodes] = useState<ListNode[]>([]);
  const [connectors, setConnectors] = useState<Connector[]>([]);

  const [displayConfigMenu, setDisplayConfigMenu] = useState<boolean>(false);

  return (
    <main className="h-full p-5">
      <div className="flex place-content-between flex items-center">
        <div className="font-bold text-lg">Visual Linked Lists</div>
        <button
          onClick={() => setDisplayConfigMenu(!displayConfigMenu)}
          className="bg-slate-900 px-10 py-2 rounded-xl flex  items-center border-t border-slate-800 transition duration-1 hover:bg-slate-800 hover:border-slate-700"
        >
          <div className="mr-3 font-medium flex items-center">
            <Cog6ToothIcon className="w-4 h-4 text-slate-200 mr-1" />
            Configuration
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <ConfigurationMenu display={displayConfigMenu} />
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
