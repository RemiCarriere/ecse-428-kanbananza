import Ajv from "ajv";
import addFormats from "ajv-formats";
import HttpError from "../http_error";

const userSchema = require("../controllers/schemas/user.json");

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: "all",
  verbose: true,
});

addFormats(ajv, ["email", "date"]); // see https://ajv.js.org/docs/validation.html#Formats

// register schemas
ajv.addSchema(userSchema.create, "createUser");

/**
 * @example ajv.addSchema('new-user.schema.json', 'new-user'); ...; app.post('/users', validate('new-user'), (req, res) => {});
 * @see https://medium.com/@cachecontrol/validating-api-parameters-in-node-js-e8afb7920327
 * @see https://github.com/ajv-validator/ajv/blob/master/docs/api.md#validation-errors
 */
export const validateSchema = (schemaName) => {
  return (req, res, next) => {
    if (!ajv.validate(schemaName, req.body)) {
      console.log("ajv");
      console.log(ajv.errors);
      return next(
        new HttpError({
          code: 400,
          message: `Validation error${ajv.errors.length > 1 ? "s" : ""}.`,
          body: ajv.errors.map((e) => {
            return {
              path: e.dataPath || e.params.missingProperty,
              reason: e.message,
              data: e.data,
            };
          }),
        })
      );
    }
    next();
  };
};
