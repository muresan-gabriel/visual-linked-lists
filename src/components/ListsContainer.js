import { useLayoutEffect, useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";

import Node from "./Node";
import CursorTracker from "./CursorTracker";

export default function ListsContainer({
  nodes,
  setNodes,
  connectors,
  setConnectors,
}) {
  const parentRef = useRef(null);
  const cursorRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(parentRef.current.offsetWidth);
    setHeight(parentRef.current.offsetHeight);
  }, []);

  const offset = 10;

  const updateXarrow = useXarrow();

  return (
    <div className="bg-slate-900 col-span-7" id="parent" ref={parentRef}>
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
          <Xwrapper>
            <Xarrow
              start={connector.from}
              end={connector.to}
              key={index}
              strokeWidth={1}
              color="white"
              path="straight"
              showHead={true}
              curveness={0.2}
              headSize={8}
              // startAnchor="right" // TODO : Fix arrow overlaping element on path = smooth / grid
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
}
