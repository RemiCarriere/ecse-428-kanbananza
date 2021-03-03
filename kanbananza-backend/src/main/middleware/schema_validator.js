import Ajv from "ajv";
import addFormats from "ajv-formats";
import HttpError from "../http_error";
import ValidationError from "../validation_error";

const userSchemas = require("../controllers/schemas/user.json");
const boardSchemas = require("../controllers/schemas/board.json");
const columnSchemas = require("../controllers/schemas/column.json");
const cardSchemas = require("../controllers/schemas/card.json");

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
ajv.addSchema(userSchemas.create, "createUser");
ajv.addSchema(boardSchemas.create, "createBoard");
ajv.addSchema(columnSchemas.create, "createColumn");
ajv.addSchema(cardSchemas.create, "createCard");

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

      return next(
        new HttpError({
          code: 400,
          message: `Invalid field${ajv.errors.length > 1 ? "s" : ""}.`,
          errors: validationErrors,
        })
      );
    }
    next();
  };
};
