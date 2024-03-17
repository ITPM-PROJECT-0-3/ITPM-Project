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
        GrpmongoId : {
          type : String,
        } ,
        groupId: {
          type: String,
        },
        HeldingDate: {
          type: String,
        },
        Time: {
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
