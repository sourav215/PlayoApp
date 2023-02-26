const mongoose = require("mongoose");
const config = require("./config");

mongoose.set("strictQuery", true);

const connectDatabase = async () => {
  await mongoose.connect(config.DB_CONNECTION_URL);
  console.log("Database connected..");
};

module.exports = connectDatabase;