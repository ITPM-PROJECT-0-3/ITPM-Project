const json = require("body-parser/lib/types/json");
const ExaminerUser = require("../model/ExaminerModel");
const errorHandler = require("../utils/error");

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

module.exports = {
  RegistraterExaminer,
  fetchSingleExaminer,
  fetchAllExaminers,
};
