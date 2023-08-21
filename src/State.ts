import ListNode from "./interfaces/ListNode.ts";
import Connector from "./interfaces/Connector.ts";

class State {
  public static nodes: ListNode[] = [];
  public static connectors: Connector[] = [];

  public static memorySize: number = 128;
  public static memory = Array.from({ length: State.memorySize }, () => ({
    occupiedBy: null,
    address: null,
    type: null,
  }));

  public static occupyMemory(
    length: number,
    data: number | string,
    address: string
  ) {
    let occupied = 0;
    let lastIndex = -1;

    for (let i = 0; i < State.memorySize; i++) {
      if (State.memory[i].occupiedBy === null) {
        occupied++;
      } else {
        occupied = 0;
      }

      if (occupied === length) {
        for (let j = i - length + 1; j <= i; j++) {
          State.memory[j].occupiedBy = data;
          State.memory[j].address = address;
          State.memory[j].type = typeof data;
          lastIndex = j;
        }

        for (let k = lastIndex + 1; k <= lastIndex + 8; k++) {
          State.memory[k].occupiedBy = "Pointer";
          State.memory[k].address = address;
          State.memory[k].type = "pointer";
        }

        return i - length + 1;
      }
    }

    return -1;
  }

  public static freeMemory(address: string) {
    for (let i = 0; i < State.memorySize; i++) {
      if (State.memory[i].address === address) {
        State.memory[i].occupiedBy = null;
        State.memory[i].address = null;
        State.memory[i].type = null;
      }
    }
  }

  public static addressType: string =
    localStorage.getItem("address_type") || "real";
  public static addressTypeList: string[] = [
    "real",
    "integers",
    "simplified",
    "letters",
  ];

  public static listType: string =
    localStorage.getItem("list_type") || "singly";
  public static listTypeList: string[] = ["singly", "doubly"];

  get addressType(): string {
    return State.addressType;
  }

  get listType(): string {
    return State.listType;
  }

  public static getListOfAddressesTypes() {
    return State.addressTypeList;
  }

  public static setAddressType(addressType: string): void {
    State.addressType = addressType;
    localStorage.setItem("address_type", addressType);
  }

  public static getListOfListTypes() {
    return State.listTypeList;
  }

  public static setListType(listType: string): void {
    State.listType = listType;
    localStorage.setItem("list_type", listType);
  }
}

export default State;
