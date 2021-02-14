import { v4 as uuidv4 } from "uuid";

class ValidationError extends Error {
  /**
   * @see https://tools.ietf.org/html/rfc7231#section-6.5.1
   */
  constructor({ path, reason, data }) {
    super();
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
