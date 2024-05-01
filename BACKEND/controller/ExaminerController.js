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
    console.log("hi");
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

const AsignExaminerforGroup = async (req, res, next) => {
  try {
    const Individualgroup = req.params.id;
    const { ExaminerDetails } = req.body;

    const Student = await Group.findById(Individualgroup);

    if (!Student) {
      return res.status(404).json({
        status: "Group not found",
        message: "No Examiner found with the specified ID.",
      });
    }

    ExaminerDetails.forEach((newGroup) => {
      Student.ExaminerDetails.push(newGroup);
    });

    const updatedStudent = await Student.save();

    res.status(200).json({
      status: "Success",
      message: "Students added successfully.",
      updatedStudent,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const CheckAssignExaminerInGroup = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const examinerEmail = req.body.examinerEmail; // Assuming examinerId is provided in the request body
    console.log(examinerEmail);
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    for (let i = 0; i < group.ExaminerDetails.length; i++) {
      const checkEmail = group.ExaminerDetails[i].Email;

      if (checkEmail === examinerEmail) {
        return res.status(400).json({ message: "Matched" });
      }
    }

    return res.status(200).json({ message: "Not matched" });
  } catch (error) {
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

const AsignProgrees1MarksMarks = async (req, res, next) => {
  try {
    const GroupId = req.params.id;
    const ExaminerEmail = req.body.Email;
    const { progreel1Marks } = req.body;

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

    examiner.Marks.push({ progreel1Marks });
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

const AsignProgress2MarksMarks = async (req, res, next) => {
  try {
    const GroupId = req.params.id;
    const ExaminerEmail = req.body.Email;
    const { progress2Marks } = req.body;

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

    examiner.Marks.push({ progress2Marks });
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

const AsignFinalPresantationMarks = async (req, res, next) => {
  try {
    const GroupId = req.params.id;
    const ExaminerEmail = req.body.Email;
    const { FinalPresantationMarks } = req.body;

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

    examiner.Marks.push({ FinalPresantationMarks });
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

const fetchStudentGroupLessExaminers = async (req, res, next) => {
  try {
    // Fetch all groups where UserType is "Student"
    const StudentGroups = await Group.find({ UserType: "Student" });

    if (!StudentGroups || StudentGroups.length === 0) {
      return res.status(404).json({
        status: "Group Not Found",
        message: "No groups found with UserType as Student",
      });
    }

    // Filter groups where length of ExaminerDetails array is less than 3
    const GroupsWithLessExaminers = StudentGroups.filter(
      (group) => group.ExaminerDetails.length < 3
    );

    if (GroupsWithLessExaminers.length === 0) {
      return res.status(404).json({
        status: "Group Not Found",
        message:
          "No groups found with less than 3 Examiners and UserType as Student",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Groups fetched successfully.",
      data: GroupsWithLessExaminers,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const fetchGrouplistUnderExaminerEmail = async (req, res, next) => {
  try {
    const examinerEmail = req.params.id;

    const MatchingGroup = await Group.find({
      "ExaminerDetails.Email": examinerEmail,
    });

    if (!MatchingGroup) {
      return res.status(404).json({
        status: "Group not found",
        message: "No Group found with the specified Examiner Email.",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Groups fetched successfully.",
      data: MatchingGroup,
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
  fetchStudentGroupLessExaminers,
  AsignExaminerforGroup,
  CheckAssignExaminerInGroup,
  fetchGrouplistUnderExaminerEmail,
  AsignProgrees1MarksMarks,
  AsignProgress2MarksMarks,
  AsignFinalPresantationMarks,
};
