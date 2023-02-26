require("dotenv").config();
const express = require("express");
const cors = require("cors");

const config = require("./config/config");
const connectDatabase = require("./config/db");
const authRouter = require("./routes/authRouter");
const eventsRouter = require("./routes/eventsRouter");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome To Playo");
});

app.use("/api/events", eventsRouter);
app.use("/api/auth", authRouter);

app.listen(config.PORT, () => {
  try {
    connectDatabase();
    console.log(
      `Server listening to http requests on http://localhost:${config.PORT}`
    );
  } catch (err) {
    console.log(err);
  }
});
