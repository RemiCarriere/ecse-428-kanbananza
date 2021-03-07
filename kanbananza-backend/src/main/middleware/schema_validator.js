import Ajv from "ajv";
import addFormats from "ajv-formats";
import HttpError from "../http_error";
import ValidationError from "../validation_error";
import forms from "../controllers/schemas";
import { capitalize } from "../utils/string";

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

// register partial and complete versions of each schema form
Object.keys(forms).forEach((key) => {
  ajv.addSchema(forms[key].partial, "partial" + capitalize(key));
  ajv.addSchema(forms[key].complete, "complete" + capitalize(key));
});

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

      const result = schemaName.match(/(?:partial|complete)([A-Z]\w*)/);
      let resourceName;
      if (result.length === 2) {
        resourceName = result[1].toLowerCase();
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
