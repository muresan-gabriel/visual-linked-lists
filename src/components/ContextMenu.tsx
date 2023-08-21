import React, { useState, useEffect, useRef } from "react";

import { TrashIcon } from "@heroicons/react/24/solid";

import ListNode from "../interfaces/ListNode.ts";
import Connector from "../interfaces/Connector.ts";
import State from "../State.ts";

interface ContextMenuProps {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  nodes: ListNode[];
  setNodes: React.Dispatch<React.SetStateAction<ListNode[]>>;
  connectors: Connector[];
  setConnectors: React.Dispatch<React.SetStateAction<Connector[]>>;
}

export default function ContextMenu(props: ContextMenuProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const contextMenuRef = useRef<HTMLDivElement>(null);

  function deleteNode() {
    const selectedNodeId = localStorage.getItem("selected_node_id");
    if (selectedNodeId) {
      const updatedNodes = props.nodes.filter(
        (node) => node.own_address !== selectedNodeId
      );
      const updatedConnectors = props.connectors.filter(
        (connector) =>
          connector.from !== selectedNodeId && connector.to !== selectedNodeId
      );
      const updatedPreviousNode = updatedNodes.find(
        (node) => node.pointer === selectedNodeId
      );
      if (updatedPreviousNode) {
        updatedPreviousNode.setPointer(null);
      }
      props.setNodes(updatedNodes);
      props.setConnectors(updatedConnectors);
      localStorage.removeItem("selected_node_id");
      props.setDisplay(false);

      State.freeMemory(selectedNodeId);
    }
  }

  useEffect(() => {
    if (props.display) {
      props.setDisplay(true);
    } else {
      const timeoutId = setTimeout(() => {
        props.setDisplay(false);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [props.display]);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();

      let targetElement = event.target as HTMLElement;

      while (targetElement !== null) {
        if (targetElement.classList.contains("node__container")) {
          setCursorPosition({ x: event.clientX, y: event.clientY });
          props.setDisplay(true);
          localStorage.setItem("selected_node_id", targetElement.id);
          return;
        }
        targetElement = targetElement.parentElement;
      }

      props.setDisplay(false);
      localStorage.removeItem("selected_node_id");
    };
    document.addEventListener("contextmenu", handleContextMenu);

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        props.setDisplay(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  if (props.display) {
    return (
      <div
        ref={contextMenuRef}
        className={`absolute text-xs bg-slate-900 py-2 rounded-lg drop-shadow-md border-[0.2px] border-slate-800 z-[9999] ${
          props.display ? "fade-in" : "fade-out"
        }`}
        id="configMenu"
        style={{
          top: cursorPosition.y,
          left: cursorPosition.x,
        }}
      >
        <button
          className="text-center flex px-3 py-2 transition duration-1 hover:bg-slate-800 hover:text-red-500"
          onClick={() => {
            deleteNode();
          }}
        >
          <TrashIcon className="w-4 h-4 inline-block mr-2" />
          Delete Node
        </button>
      </div>
    );
  } else {
    return null;
  }
}
