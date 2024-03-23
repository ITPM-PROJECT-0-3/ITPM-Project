const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    dueDate: { type: Date, required: true },
    totalMarks: { type: Number, required: true },
    rubric: [{
        criterion: String,
        maxScore: Number
    }],
    pdfUrl: { type: String, trim: true }, // URL or path to the PDF file
    assignmentUploadLink: { type: String, trim: true }, // External link for assignment uploads
}, {
    timestamps: true
});

module.exports = mongoose.model('Assessment', assessmentSchema);
