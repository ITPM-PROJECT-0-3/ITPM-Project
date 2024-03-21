const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        trim: true
    },
    members: [{
        memberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming a User model exists
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['Leader', 'Member', 'Advisor', 'Other'] // Define roles as necessary
        }
    }],
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Assuming a Project model exists
        required: false // This can be optional if teams are formed before projects are assigned
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Team', teamSchema);
