import { addressList } from "./utils.data.js";

class Node {
  constructor(data) {
    this.data = data;
    this.pointer = null;
    this.own_address =
      addressList[Math.floor(Math.random() * addressList.length)];
  }

  setPointer(pointer) {
    this.pointer = pointer;
  }

  getPointer() {
    return this.pointer;
  }

  setOwnAddress() {
    this.own_address =
      addressList[Math.floor(Math.random() * addressList.length)];
  }
}

export { Node };
