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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['supervisor', 'co-supervisor'],
    required: true
  },
  engagedGroups: [
    {
      groupMongoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Groups'
      },
      groupId: {
        type: String
      },
      engagementDate: {
        type: Date
      }
    }
  ]
}, { timestamps: true });

const Supervisor = mongoose.model('Supervisors', supervisorSchema);

module.exports = Supervisor;