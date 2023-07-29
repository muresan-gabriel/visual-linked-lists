import Draggable from "react-draggable";

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
}) {
  function addConnector() {
    setConnectors([...connectors, { from: node.own_address, to: cursorRef }]);
    localStorage.setItem("from_node", node.own_address);
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
    }
  }

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
        className="bg-slate-800 w-[18rem] flex text-md rounded-lg cursor-move absolute"
        id={node.own_address}
      >
        <span className="data bg-indigo-500 p-2 w-[9rem] rounded-lg text-center">
          {node.data}
        </span>
        <span className="pointer p-2 w-[9rem] rounded-lg text-center ">
          {node.pointer}
        </span>
        <span className="absolute -translate-y-[1rem] translate-x-[9.5rem] text-xs bg-amber-600 px-5 rounded-tl-md rounded-tr-md">
          {node.own_address}
        </span>
        <div
          className="absolute bg-transparent hover:bg-slate-200 p-1 rounded-full cursor-pointer right-0 translate-x-[0.2rem] top-[40%] transition duration-1"
          onClick={addConnector}
        ></div>
        <div
          className="absolute bg-transparent hover:bg-green-400 p-1 rounded-full cursor-pointer translate-x-[-0.2rem] top-[40%] transition duration-1"
          onClick={acceptConnection}
        ></div>
      </div>
    </Draggable>
  );
}
