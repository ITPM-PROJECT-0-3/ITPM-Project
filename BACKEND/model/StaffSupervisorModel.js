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
  engagedGroups: [
    {
      groupMongoId: {
        type: String
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

const Supervisor = mongoose.model('Supervisor', supervisorSchema);

module.exports = Supervisor;
