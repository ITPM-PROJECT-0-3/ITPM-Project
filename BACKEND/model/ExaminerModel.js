const mongoose = require("mongoose");

const ExaminerSchema = new mongoose.Schema(
  {
    TagName: {
      type: String,
    },
    FirstName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    Univercity: {
      type: String,
    },
    Facalty: {
      type: String,
    },
    OtherUniversity: {
      type: String,
    },
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
    StudentGropDetails: [
      {
        GrpmongoId: {
          type: String,
        },
        groupId: {
          type: String,
        },
        topic: {
          type: String,
        },
        supervisor: {
          type: String,
        },
        coSupervisor: {
          type: String,
        },
      },
    ],
    UserType: {
      type: String,
    },
  },
  { timestamps: true }
);

const ExaminerUser = mongoose.model("ExaminerUser", ExaminerSchema);

module.exports = ExaminerUser;
