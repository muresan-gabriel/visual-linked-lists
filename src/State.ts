class State {
  static addressType: string = localStorage.getItem("address_type") || "real";
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
    localStorage.setItem("address_type", addressType);
  }
}

export default State;
