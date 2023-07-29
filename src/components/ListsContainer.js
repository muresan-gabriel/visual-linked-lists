import { useLayoutEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import XArrow from "react-xarrows";

import Node from "./Node";

export default function ListsContainer({ nodes, setNodes }) {
  const parentRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(parentRef.current.offsetWidth);
    setHeight(parentRef.current.offsetHeight);
  }, []);

  const offset = 10;

  return (
    <div className="bg-slate-900 col-span-7" id="parent" ref={parentRef}>
      {nodes.map((node, index) => {
        return (
          <Node
            offset={offset}
            node={node}
            width={width}
            height={height}
          ></Node>
        );
      })}
    </div>
  );
}
