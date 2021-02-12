import Ajv from "ajv";
let ajv = new Ajv({ allErrors: true, removeAdditional: "all", verbose: true });
import HttpError from "../http_error";

/**
 * @example ajv.addSchema('new-user.schema.json', 'new-user'); ...; app.post('/users', validate('new-user'), (req, res) => {});
 * @see https://medium.com/@cachecontrol/validating-api-parameters-in-node-js-e8afb7920327
 * @see https://github.com/ajv-validator/ajv/blob/master/docs/api.md#validation-errors
 */
export default (schemaName) => {
  return (req, res, next) => {
    if (ajv.validate(schemaName, req.body)) {
      return next(
        new HttpError({
          code: 400,
          message: "Validation error(s)",
          body: ajv.errors.map((e) => {
            return { path: e.path, reason: e.message, data: e.data };
          }),
        })
      );
    }
  };
};
