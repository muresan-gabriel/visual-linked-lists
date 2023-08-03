interface ListNode {
  data: any;
  pointer: string;
  own_address: string;
  setPointer(pointer): void;

  getPointer(): string;

  setOwnAddress(nodes: ListNode): void;
  getRandomAddress(): string;
}

export default ListNode;
