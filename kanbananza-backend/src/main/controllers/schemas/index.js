const schemas = {};

// register base JSON schemas here
schemas.user = require("./user.json");
schemas.board = require("./board.json");
schemas.column = require("./column.json");
schemas.card = require("./card.json");

// do not edit past this point

const makePartial = (schema) => {
  const { required, ...partial } = schema;
  return partial;
};

const makeComplete = (schema) => {
  if ("required" in schema) {
    return schema; // prefer inherent 'required' field written on JSON schema if any
  }

  const required = [];
  Object.keys(schema.properties).forEach((key) => {
    required.push(key);
  });

  return { ...schema, required };
};

const forms = {};
Object.entries(schemas).forEach(([key, value]) => {
  forms[key] = {};
  forms[key].partial = makePartial(value);
  forms[key].complete = makeComplete(value);
});

export default forms;
