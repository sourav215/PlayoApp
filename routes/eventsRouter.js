const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createEvent,
  getEvents,
  requestForAnEvent,
  joinEvent,
} = require("../controllers/eventsController");

const eventsRouter = express.Router();
eventsRouter.get("/", authMiddleware, getEvents);
eventsRouter.post("/create", authMiddleware, createEvent);
eventsRouter.get("/:eventId", authMiddleware, requestForAnEvent);
eventsRouter.post("/:eventId/join", authMiddleware, joinEvent);

module.exports = eventsRouter;
