const json = require("body-parser/lib/types/json");
const ExaminerUser = require("../model/ExaminerModel");
const errorHandler = require("../utils/error");
const Group = require("../model/StudentModel");

const RegistraterExaminer = async (req, res, next) => {
  try {
    const {
      TagName,
      FirstName,
      LastName,
      Univercity,
      Facalty,
      OtherUniversity,
      Email,
      Password,
      UserType,
    } = req.body;

    const existingExaminer = await ExaminerUser.findOne({ Email });
    console.log("hi")
    if (existingExaminer) {
      return res.status(400).json({
        status: "Examiner Already Exist",
        error: "Email Is Already Use",
      });
    }

    const newExaminer = new ExaminerUser({
      TagName,
      FirstName,
      LastName,
      Univercity,
      Facalty,
      OtherUniversity,
      Email,
      Password,
      UserType,
    });
    
    await newExaminer.save();

    res.status(201).json({
      message: "Examiner created successfully",
      newExaminer,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const fetchSingleExaminer = async (req, res, next) => {
  try {
    const examinerId = req.params.id;

    const ExaminerProfile = await ExaminerUser.findOne({ _id: examinerId });

    if (!ExaminerProfile) {
      return res.status(404).json({
        status: "Error",
        message: "Examiner Profile not found for the given NIC.",
      });
    }
    res.status(200).json({
      status: "Examiner Details Fetched",
      ExaminerProfile,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const fetchAllExaminers = async (req, res, next) => {
  try {
    const ExaminerUserAll = await ExaminerUser.find();
    res, json(ExaminerUserAll);
    res.status(200).json({
      status: "fetch All Details",
      ExaminerUserAll,
    });
  } catch (err) {
    console.log(err);
    next(errorHandler(err));
    res
      .status(500)
      .send({ status: "Error fetching Aplications", error: err.message });
  }
};

const AsignStudentGroup = async (req, res, next) => {
  try {
    const IndividualExaminer = req.params.id;
    const { StudentGropDetails } = req.body;

    const Examiner = await ExaminerUser.findById(IndividualExaminer);

    if (!Examiner) {
      return res.status(404).json({
        status: "Examiner not found",
        message: "No Examiner found with the specified ID.",
      });
    }

    StudentGropDetails.forEach((newGroup) => {
      Examiner.StudentGropDetails.push(newGroup);
    });

    const updatedExaminer = await Examiner.save();

    res.status(200).json({
      status: "Success",
      message: "Examiners added successfully.",
      updatedExaminer,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const deleteExaminer = async (req, res, next) => {
  try {
    const ExaminerID = req.params.id;

    const ExaminerFind = await ExaminerUser.findById(ExaminerID);
    if (!ExaminerFind) {
      return res.status(404).send({ status: "Examiner not found" });
    }

    await ExaminerUser.findByIdAndDelete(ExaminerID);

    res.status(200).send({ status: "Examiner Deleted" });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const AsignproposalMarks = async (req, res, next) => {
  try {
    const GroupId = req.params.id;
    const ExaminerEmail = req.body.Email;
    const { proposalMarks } = req.body;

    const group = await Group.findById(GroupId);

    if (!group) {
      return res.status(404).json({
        status: "Group not found",
        message: "No group found with the specified ID.",
      });
    }

    const examiner = group.ExaminerDetails.find(
      (examiner) => examiner.Email === ExaminerEmail
    );

    if (!examiner) {
      return res.status(404).json({
        status: "Examiner not found",
        message: "No examiner found with the specified email in the group.",
      });
    }

    examiner.Marks.push({ proposalMarks });
    const updatedGroup = await group.save();

    res.status(200).json({
      status: "Success",
      message: "Examiners added successfully.",
      updatedGroup,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

module.exports = {
  RegistraterExaminer,
  fetchSingleExaminer,
  fetchAllExaminers,
  AsignStudentGroup,
  AsignproposalMarks,
  deleteExaminer,
};
