import Draggable, {
  DraggableEvent,
  DraggableEventHandler,
} from "react-draggable";
import { useState, useRef, useEffect } from "react";
import React from "react";

import ListNode from "../interfaces/ListNode";
import Connector from "../interfaces/Connector";
import { Node as NodeClass } from "../utils/utils.functions";

import State from "../State";

interface NodeProps {
  node: ListNode;
  nodes: ListNode[];
  setNodes: React.Dispatch<React.SetStateAction<ListNode[]>>;
  offset: number;
  width: number;
  height: number;
  connectors: Connector[];
  setConnectors: React.Dispatch<React.SetStateAction<Connector[]>>;
  cursorRef: React.RefObject<any>;
  onDrag: DraggableEventHandler;
  onStop: DraggableEventHandler;
  addingConnection: boolean;
  setAddingConnection: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Node({
  node,
  nodes,
  setNodes,
  offset,
  width,
  height,
  connectors,
  setConnectors,
  cursorRef,
  onDrag,
  onStop,
  addingConnection,
  setAddingConnection,
}: NodeProps) {
  const [editNode, setEditNode] = useState<boolean>(false);

  function addConnector() {
    setConnectors([...connectors, { from: node.own_address, to: cursorRef }]);
    localStorage.setItem("from_node", node.own_address);
    setAddingConnection(true);
  }

  function acceptConnection() {
    const fromNode = localStorage.getItem("from_node");
    const toNode = node.own_address;

    if (fromNode) {
      const updatedConnectors = connectors.filter(
        (connector) => connector.from !== fromNode
      );

      const updatedNodes = nodes.map((node) => {
        if (node.own_address === fromNode) {
          node.setPointer(toNode);
        }
        return node;
      });

      setNodes(updatedNodes);

      updatedConnectors.push({ from: fromNode, to: node.own_address });

      setConnectors(updatedConnectors);
      localStorage.removeItem("from_node");
      setAddingConnection(false);
    }
  }
  const acceptConnectionRef = useRef(null);

  const handleNodeDataDoubleClick = () => {
    setEditNode(true);
  };

  const handleNodeDataBlur = () => {
    setEditNode(false);
  };

  return (
    <Draggable
      defaultPosition={{ x: 50, y: 50 }}
      position={null}
      scale={1}
      bounds={{
        left: 0 + offset,
        top: 12 + offset,
        right: width - 288 - offset,
        bottom: height - 56 + offset,
      }}
      onDrag={onDrag}
      onStop={onStop}
    >
      <div
        className="bg-slate-800 w-[18rem] h-[2.6rem] flex text-md rounded-lg cursor-move absolute node__container border-t border-slate-700"
        id={node.own_address}
      >
        {editNode ? ( // Use conditional rendering to show either input or span
          <input
            className="data bg-violet-500 p-2 w-[9rem] rounded-lg text-center border-t border-indigo-400 transition duration-1"
            maxLength={15}
            value={node.data}
            onBlur={handleNodeDataBlur}
            onChange={(e) => {
              const updatedNodes = nodes.map((editingNode) => {
                if (editingNode.own_address === node.own_address)
                  editingNode.setData(e.target.value);
                return editingNode;
              });
              setNodes(updatedNodes);
            }}
          />
        ) : (
          <span
            className="data bg-indigo-500 p-2 w-[9rem] rounded-lg text-center border-t border-indigo-400"
            onDoubleClick={handleNodeDataDoubleClick}
          >
            {node.data}
          </span>
        )}

        <span className="pointer p-2 w-[9rem] rounded-lg text-center">
          {node.pointer}
        </span>

        <span className="absolute -translate-y-[1.08rem] translate-x-[9.5rem] text-xs bg-amber-600 w-[7.6rem] rounded-tl-md rounded-tr-md text-center border-t border-amber-500">
          {node.own_address}
        </span>
        {!addingConnection && (
          <>
            <div
              className="absolute bg-transparent hover:bg-slate-200 p-1 rounded-full cursor-pointer right-0 translate-x-[0.2rem] top-[40%] transition duration-1"
              onClick={addConnector}
            ></div>
            <div
              className="absolute bg-transparent hover:bg-slate-200 p-1 rounded-full cursor-pointer translate-x-[-0.2rem] top-[40%] transition duration-1"
              onClick={addConnector}
            ></div>
            <div
              className="absolute bg-transparent hover:bg-slate-200 p-1 rounded-full cursor-pointer right-[48.6%] translate-y-[-0.2rem] top-0 transition duration-1"
              onClick={addConnector}
            ></div>
            <div
              className="absolute bg-transparent hover:bg-slate-200 p-1 rounded-full cursor-pointer right-[48.6%] translate-y-[0.2rem] bottom-0 transition duration-1"
              onClick={addConnector}
            ></div>
          </>
        )}
        {addingConnection && (
          <>
            <div
              ref={acceptConnectionRef}
              className="absolute bg-transparent hover:bg-green-400 p-1 rounded-full cursor-pointer right-0 translate-x-[0.2rem] top-[40%] transition duration-1"
              onClick={acceptConnection}
            ></div>
            <div
              ref={acceptConnectionRef}
              className="absolute bg-transparent hover:bg-green-400 p-1 rounded-full cursor-pointer translate-x-[-0.2rem] top-[40%] transition duration-1"
              onClick={acceptConnection}
            ></div>
            <div
              ref={acceptConnectionRef}
              className="absolute bg-transparent hover:bg-green-400 p-1 rounded-full cursor-pointer right-[48.6%] translate-y-[-0.2rem] top-0 transition duration-1"
              onClick={acceptConnection}
            ></div>
            <div
              ref={acceptConnectionRef}
              className="absolute bg-transparent hover:bg-green-400 p-1 rounded-full cursor-pointer right-[48.6%] translate-y-[0.2rem] bottom-0 transition duration-1"
              onClick={acceptConnection}
            ></div>
          </>
        )}
      </div>
    </Draggable>
  );
}
