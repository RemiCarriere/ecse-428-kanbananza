import { v4 as uuidv4 } from "uuid";

class ValidationError extends Error {
  constructor({ path, reason, data }) {
    super();
    this.name = "ValidationError";
    this.id = uuidv4();
    this.path = path;
    this.reason = reason;
    this.data = data;
  }

  serialize() {
    // should automatically strip undefined attributes
    return this;
  }
}

export default ValidationError;
