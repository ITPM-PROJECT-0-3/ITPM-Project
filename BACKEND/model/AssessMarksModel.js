const { group } = require('console');
const mongoose = require('mongoose');

const assessMarksSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true
  },
  supervisorId: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
  },
}, { timestamps: true });


const AssessMarks = mongoose.model('AssessMarks', assessMarksSchema);

module.exports = AssessMarks;
