const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  ip: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
