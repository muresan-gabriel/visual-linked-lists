class State {
  static addressType: string = "simplified";
  static addressTypeList: string[] = [
    "real",
    "integers",
    "simplified",
    "letters",
  ];

  get addressType() {
    return State.addressType;
  }

  static getListOfAddressesTypes() {
    return State.addressTypeList;
  }

  static setAddressType(addressType: string) {
    State.addressType = addressType;
  }
}

export default State;
