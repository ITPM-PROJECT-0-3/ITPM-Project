// models/Supervisor.js

const mongoose = require('mongoose');

const supervisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  
});

const Supervisor = mongoose.model('Supervisor', supervisorSchema);

module.exports = Supervisor;
