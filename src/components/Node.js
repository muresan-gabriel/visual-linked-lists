import Draggable from "react-draggable";

export default function Node({ node, offset, width, height }) {
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
    >
      <div className="bg-slate-800 w-[18rem] flex text-md rounded-lg cursor-move absolute">
        <span className="data bg-indigo-500 p-2 w-[9rem] rounded-lg text-center">
          {node.data}
        </span>
        <span className="pointer p-2 w-[9rem] rounded-lg text-center ">
          {node.pointer}
        </span>
        <span className="absolute -translate-y-[1rem] translate-x-[9.5rem] text-xs bg-amber-600 px-5 rounded-tl-md rounded-tr-md">
          {node.own_address}
        </span>
      </div>
    </Draggable>
  );
}
