import React, { useState, useEffect } from "react";

import AddressTypeSelector from "./AddressTypeSelector.tsx";

interface ConfigurationMenuProps {
  display: boolean;
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
        <AddressTypeSelector></AddressTypeSelector>
      </div>
    );
  } else {
    return null;
  }
}
