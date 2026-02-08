export class Exception extends Error {
  deleteDest;

  constructor(message, deleteDest = false) {
    super(message);
    this.name = "Exception";
    this.deleteDest = deleteDest;
  }
}
