import { RefObject } from "react";

interface Connector {
  from: string;
  to: string | HTMLElement | RefObject<HTMLElement> | null;
}

export default Connector;
