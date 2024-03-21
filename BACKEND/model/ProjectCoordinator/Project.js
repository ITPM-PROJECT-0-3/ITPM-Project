const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // Removes whitespace from both ends of a string
    },
    description: {
        type: String,
        required: true
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a User model exists for team members
        required: true
    }],
    status: {
        type: String,
        enum: ['Active', 'Completed', 'On Hold', 'Cancelled'],
        default: 'Active'
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    documents: [{
        title: String,
        link: String
    }],
    presentations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Presentation' // Linking to Presentation model
    }]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Project', projectSchema);
