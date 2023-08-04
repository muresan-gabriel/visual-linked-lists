import ListNode from "./interfaces/ListNode.ts";
import Connector from "./interfaces/Connector.ts";

class State {
  public static nodes: ListNode[] = [];
  public static connectors: Connector[] = [];

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
