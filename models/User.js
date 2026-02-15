const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  trackingId: String,
  lat: Number,
  lng: Number
});

module.exports = mongoose.model('User', userSchema);
