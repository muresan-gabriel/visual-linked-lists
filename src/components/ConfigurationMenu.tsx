import React, { useState, useEffect } from "react";

import AddressTypeSelector from "./AddressTypeSelector.tsx";
import ListTypeSelector from "./ListTypeSelector.tsx";
import ListNode from "../interfaces/ListNode.ts";
import Connector from "../interfaces/Connector.ts";

interface ConfigurationMenuProps {
  display: boolean;
  nodes: ListNode[];
  setNodes: React.Dispatch<React.SetStateAction<ListNode[]>>;
  connectors: Connector[];
  setConnectors: React.Dispatch<React.SetStateAction<Connector[]>>;
}

export default function ConfigurationMenu(props: ConfigurationMenuProps) {
  const [isVisible, setIsVisible] = useState(props.display);

  useEffect(() => {
    if (props.display) {
      setIsVisible(true);
    } else {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [props.display]);

  if (isVisible) {
    return (
      <div
        className={`absolute right-5 bg-slate-900 p-5 rounded-2xl top-[5rem] drop-shadow-md border-[0.2px] border-slate-800 z-[9999] ${
          props.display ? "fade-in" : "fade-out"
        }`}
        id="configMenu"
      >
        <AddressTypeSelector
          nodes={props.nodes}
          setNodes={props.setNodes}
          connectors={props.connectors}
          setConnectors={props.setConnectors}
        ></AddressTypeSelector>
        <ListTypeSelector></ListTypeSelector>
      </div>
    );
  } else {
    return null;
  }
}
