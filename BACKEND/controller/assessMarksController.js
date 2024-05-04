const json = require("body-parser/lib/types/json");
const errorHandler = require("../utils/error");

const AssessMarks = require("../model/AssessMarksModel");

const assessmentMarks = async (req, res, next) => {
  try {
    const { groupId, supervisorId, marks, comment } = req.body;

    // Check if a record with the same groupId already exists
    const existingRecord = await AssessMarks.findOne({ groupId });
    if (existingRecord) {
      return res.status(409).json({ error: "A record for this group ID already exists." });
    }

    const newAssessMarks = new AssessMarks({ groupId, supervisorId, marks, comment });
    await newAssessMarks.save();
    res.status(201).json({
      message: "Marks added successfully",
      newAssessMarks,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) { // MongoDB duplicate key error
      res.status(409).json({ error: "Duplicate group ID, cannot add multiple records." });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
    next(error);
  }
}

const updateAssessmentMarks = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const { marks, comment } = req.body;

    const assessmentMarks = await AssessMarks.findOne({ groupId });

    if (!assessmentMarks) {
      return res.status(404).json({
        status: "Error",
        message: "No assessment marks found for the given group ID.",
      });
    }

    assessmentMarks.marks = marks;
    assessmentMarks.comment = comment;

    await assessmentMarks.save();
    res.status(200).json({
      status: "Assessment Marks Updated",
      assessmentMarks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
}

const deleteAssessmentMarks = async (req, res, next) => {
  try {
    const groupId = req.params.id;

    const assessmentMarks = await AssessMarks.findOneAndDelete
      ({ groupId });

    if (!assessmentMarks) {
      return res.status(404).json({
        status: "Error",
        message: "No assessment marks found for the given group ID.",
      });
    }
    res.status(200).json({
      status: "Assessment Marks Deleted",
      assessmentMarks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
}

const fetchAssessmentMarksbySupervisor = async (req, res, next) => {
  try {
    const supervisorId = req.params.id;

    const assessmentMarks = await AssessMarks.find({ supervisorId });

    if (!assessmentMarks) {
      return res.status(404).json({
        status: "Error",
        message: "No assessment marks found for the given supervisor ID.",
      });
    }
    res.status(200).json({
      status: "Assessment Marks Fetched",
      assessmentMarks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
}

const fetchAssessmentMarksbyGroup = async (req, res, next) => {
  try {
    const groupId = req.params.id;

    const assessmentMarks = await AssessMarks.find({ groupId });

    if (!assessmentMarks) {
      return res.status(404).json({
        status: "Error",
        message: "No assessment marks found for the given group ID.",
      });
    }
    res.status(200).json({
      status: "Assessment Marks Fetched",
      assessmentMarks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
}

module.exports = {
  assessmentMarks,
  fetchAssessmentMarksbySupervisor,
  fetchAssessmentMarksbyGroup,
  updateAssessmentMarks,
  deleteAssessmentMarks
};