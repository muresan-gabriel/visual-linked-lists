import React, { useLayoutEffect, useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper, refType } from "react-xarrows";

import Node from "./Node";
import CursorTracker from "./CursorTracker";
import Connector from "../interfaces/Connector";
import ListNode from "../interfaces/ListNode";

interface ListsContainerProps {
  nodes: ListNode[];
  setNodes: React.Dispatch<React.SetStateAction<ListNode[]>>;
  connectors: Connector[];
  setConnectors: React.Dispatch<React.SetStateAction<Connector[]>>;
}

const ListsContainer: React.FC<ListsContainerProps> = ({
  nodes,
  setNodes,
  connectors,
  setConnectors,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useLayoutEffect(() => {
    setWidth(parentRef.current?.offsetWidth || 0);
    setHeight(parentRef.current?.offsetHeight || 0);
  }, []);

  const offset = 10;

  const updateXarrow = useXarrow();

  return (
    <div
      className="bg-slate-900 col-span-7 border-t border-slate-800"
      id="parent"
      ref={parentRef}
    >
      {nodes.map((node, index) => {
        return (
          <Node
            offset={offset}
            node={node}
            setNodes={setNodes}
            nodes={nodes}
            width={width}
            height={height}
            connectors={connectors}
            setConnectors={setConnectors}
            cursorRef={cursorRef}
            key={index}
            onDrag={updateXarrow}
            onStop={updateXarrow}
          ></Node>
        );
      })}
      {connectors.map((connector, index) => {
        return (
          <Xwrapper key={index}>
            <Xarrow
              start={connector.from}
              end={connector.to as refType}
              strokeWidth={1}
              color="white"
              path="straight"
              showHead={true}
              curveness={0.2}
              headSize={8}
              // startAnchor="right" // TODO : Fix arrow overlapping element on path = smooth / grid
              // endAnchor="left"
            ></Xarrow>
          </Xwrapper>
        );
      })}
      <CursorTracker
        cursorRef={cursorRef}
        onDrag={updateXarrow}
        onStop={updateXarrow}
      ></CursorTracker>
    </div>
  );
};

export default ListsContainer;
