class ErrorHandler {
  static error: boolean = false;
  static errorMessage = "";
  static displayError(message: string) {
    return message;
  }

  static setErrorMessage(message: string) {
    this.errorMessage = message;
  }
  static setError(value: boolean) {
    this.error = value;
    return this;
  }
}

export default ErrorHandler;
