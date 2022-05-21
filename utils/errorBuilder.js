class Error {
  constructor(message, status) {
    this.message = message;
    this.name = "Error"; // (different names for different built-in error classes)
    this.errorCode = status;
  }
}

export default Error;
