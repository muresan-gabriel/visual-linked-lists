interface ListNode {
  data: any;
  prevPointer: string | null;
  pointer: string;
  own_address: string;
  setPointer(pointer): void;
  setData(data: any): void;

  getPointer(): string;

  setOwnAddress(nodes: ListNode[]): void;
  getRandomAddress(): string;
}

export default ListNode;
