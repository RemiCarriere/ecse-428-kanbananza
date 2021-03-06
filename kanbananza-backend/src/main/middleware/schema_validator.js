import Ajv from "ajv";
import addFormats from "ajv-formats";
import HttpError from "../http_error";
import ValidationError from "../validation_error";

const userSchema = require("../controllers/schemas/user.json");
const boardSchema = require("../controllers/schemas/board.json");
const columnSchema = require("../controllers/schemas/column.json");
const cardSchema = require("../controllers/schemas/card.json");

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: "all",
  verbose: true,
});

addFormats(ajv, ["email", "date"]); // see https://ajv.js.org/docs/validation.html#Formats

ajv.addKeyword({
  keyword: "isNotEmpty",
  type: "string",
  validate(schema, data) {
    return typeof data === "string" && data.trim() !== "";
  },
  errors: false,
});

// register schemas
ajv.addSchema(userSchema, "userSchema");
ajv.addSchema(boardSchema, "boardSchema");
ajv.addSchema(columnSchema, "columnSchema");
ajv.addSchema(cardSchema, "cardSchema");

/**
 * @example ajv.addSchema('new-user.schema.json', 'new-user'); ...; app.post('/users', validate('new-user'), (req, res) => {});
 * @see https://medium.com/@cachecontrol/validating-api-parameters-in-node-js-e8afb7920327
 * @see https://github.com/ajv-validator/ajv/blob/master/docs/api.md#validation-errors
 */
export const validateSchema = (schemaName) => {
  return (req, res, next) => {
    if (!ajv.validate(schemaName, req.body)) {
      const validationErrors = ajv.errors.map(
        (e) =>
          new ValidationError({
            path: e.dataPath
              ? e.dataPath.replace("/", "")
              : e.params.missingProperty,
            reason: e.message,
            data: e.data,
          })
      );

      const result = schemaName.match(/(.*)Schema/);
      let resourceName;
      if (result.length === 2) {
        resourceName = schemaName.match(/([a-z]+)Schema/)[1];
      }

      return next(
        new HttpError({
          code: 400,
          message: `Invalid ${
            resourceName !== undefined ? resourceName + " " : ""
          }information.`,
          errors: validationErrors,
        })
      );
    }
    
    return next();
  };
};
