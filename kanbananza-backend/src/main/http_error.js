import { v4 as uuidv4 } from "uuid";
import http from "http";

const DEFAULT_CODE = 500;
// const DEFAULT_MESSAGE = "Internal Server Error";

class HttpError extends Error {
  /**
   * @see https://tools.ietf.org/html/rfc7231#section-6.5.1
   */
  constructor({ code = DEFAULT_CODE, message, body, errors = [] }) {
    super();
    this.id = uuidv4();
    this.code = code.toString() in http.STATUS_CODES ? code : DEFAULT_CODE;
    this.reasonPhrase = http.STATUS_CODES[this.code];

    this.message = message;
    this.body = body;

    this.errors = errors;
  }

  serialize() {
    // should automatically strip undefined attributes
    return this;
  }
}

export default HttpError;
