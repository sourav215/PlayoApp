require("dotenv").config();

const config = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
  PORT: process.env.PORT,
};

module.exports = config;
