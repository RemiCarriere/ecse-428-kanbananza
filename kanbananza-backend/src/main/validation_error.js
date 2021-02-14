import { v4 as uuidv4 } from "uuid";

class ValidationError extends Error {
  /**
   * @see https://tools.ietf.org/html/rfc7231#section-6.5.1
   */
  constructor({ reason, data = "" }) {
    super();
    this.id = uuidv4();
    this.data = data; // the invalid data
    this.reason = reason; // the reason for invalidity
  }

  serialize() {
    // should automatically strip undefined attributes
    return this;
  }
}

export default HttpError;
