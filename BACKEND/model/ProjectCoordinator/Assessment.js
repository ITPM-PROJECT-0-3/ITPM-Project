const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    rubric: [{
        criterion: String,
        maxScore: Number
    }]
}, {
    timestamps: true // Automatically generate createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Assessment', assessmentSchema);
