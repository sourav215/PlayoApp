const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sport: { type: String, required: true },
    start_time: { type: Date, required: true },
    max_players: { type: Number, required: true },
  });

  const Event = mongoose.model('Event', eventSchema);

  module.exports = {Event};