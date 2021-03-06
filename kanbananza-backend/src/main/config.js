import "dotenv/config";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  /**
   * Your favorite port
   */
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,

  /**
   * mongoDB Connection String URI
   */
  databaseURL: {
    development: process.env.DATABASE_URL,
    production: process.env.DATABASE_URL,
  },

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,

  api: {
    basePath: "",
  },
};
