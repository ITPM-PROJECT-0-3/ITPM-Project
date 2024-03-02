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
      Email,
      Password,
      UserType,
    });

    await newExaminer.save();

    res.status(201).json({
      message: "Examiner created successfully",
      newAdminUser,
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
      AdminAplication,
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
};
