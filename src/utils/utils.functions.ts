import {
  addressListReal,
  addressListNumbers,
  addressListSimplified,
} from "./utils.data.js";
import ListNode from "../interfaces/ListNode.ts";
import State from "../State.ts";

class Node implements ListNode {
  data: any;
  pointer: string;
  prevPointer: string | null;
  own_address: string;

  constructor(data: any, nodes) {
    this.data = data;
    this.pointer = null;
    this.setOwnAddress(nodes);
  }

  setPointer(pointer: string) {
    this.pointer = pointer;
  }

  getPointer(): string {
    return this.pointer;
  }

  setOwnAddress(nodes: ListNode[]) {
    let generatedAddress: string;
    do {
      generatedAddress = this.getRandomAddress();
    } while (nodes.some((node) => node.own_address === generatedAddress));

    this.own_address = generatedAddress;
  }

  setData(data) {
    this.data = data;
  }

  getRandomAddress(): string {
    const addressType = State.addressType;

    if (addressType === "simplified") {
      return addressListSimplified[
        Math.floor(Math.random() * addressListSimplified.length)
      ];
    } else if (addressType === "real") {
      return addressListReal[
        Math.floor(Math.random() * addressListReal.length)
      ];
    } else if (addressType === "integers") {
      return addressListNumbers[
        Math.floor(Math.random() * addressListNumbers.length)
      ];
    } else {
      throw new Error("Invalid addressType");
    }
  }
}

export { Node };
