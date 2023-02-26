const {Event} = require("../models/eventModel");
const {EventRequest} = require("../models/eventRequestModel")

const createEvent = async (req, res) => {
    try {
      const events = await Event.find({ start_time: { $gt: new Date() } })
        .sort({ start_time: 1 })
        .populate('organizer_id', 'username')
        .lean();
      const eventRequests = await EventRequest.find({ user_id: req.user.id }).lean();
      const requestedEvents = eventRequests.map((request) => request.event_id.toString());
      res.json(
        events.map((event) => ({
          ...event,
          players_count: eventRequests.filter(
            (request) => request.event_id.toString() === event._id.toString()
          ).length,
          is_requested: requestedEvents.includes(event._id.toString()),
        }))
      );
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }


const getEvents = async (req, res) => {
    try {
      const events = await Event.find({ start_time: { $gt: new Date() } })
        .sort({ start_time: 1 })
        .populate('organizer_id', 'username')
        .lean();
      const eventRequests = await EventRequest.find({ user_id: req.user.id }).lean();
      const requestedEvents = eventRequests.map((request) => request.event_id.toString());
      res.json(
        events.map((event) => ({
          ...event,
          players_count: eventRequests.filter(
            (request) => request.event_id.toString() === event._id.toString()
          ).length,
          is_requested: requestedEvents.includes(event._id.toString()),
        }))
      );
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }


  const requestForAnEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.eventId)
        .populate('organizer_id', 'username')
        .lean();
      if (!event) {
        return res.sendStatus(404);
      }
      const eventRequests = await EventRequest.find({ event_id: event._id })
        .populate('user_id', 'username')
        .lean();
      const userRequest = eventRequests.find(
        (request) => request.user_id._id.toString() === req.user.id
      );
      res.json({
        ...event,
        players: eventRequests.map((request) => ({
          username: request.user_id.username,
          status: request.status,
        })),
        user_status: userRequest ? userRequest.status : null,
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

 const joinEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.eventId).lean();
      if (!event) {
        return res.sendStatus(404);
      }
      const eventRequests = await EventRequest.find({ event_id: event._id }).lean();
      const userRequest = eventRequests.find(
        (request) => request.user_id.toString() === req.user.id
      );
      if (userRequest) {
        return res.sendStatus(400);
      }
      if (eventRequests.length >= event.max_players) {
        return res.sendStatus(409);
      }
      const eventRequest = new EventRequest({
        user_id: req.user.id,
        event_id: event._id,
        status: 'pending',
      });
      await eventRequest.save();
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  module.exports = {createEvent, getEvents, requestForAnEvent, joinEvent}
  
  
  